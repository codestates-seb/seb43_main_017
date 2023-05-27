import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { BsMusicPlayer } from 'react-icons/bs';
import { myplaylistState, getMusicIdState } from 'src/recoil/Atoms';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AddListMusic = () => {
    const [newMusicId] = useRecoilState(getMusicIdState); // 새로운 뮤직 ID
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
    const buttonArray = [];
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [myplaylistData, setMyplaylistData] = useRecoilState(myplaylistState);

    /* 2023.05.22 마이플레이리스트 조회 */
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/playlists/member-playlist?&page=${currentPage}&size=3`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setMyplaylistData(response.data.data);
                setTotalPages(response.data.pageInfo.totalPages);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    /** 2023.05.17 전체 페이지 수 만큼 버튼 생성 - 김주비*/
    for (let i = 1; i <= totalPages; i++) {
        buttonArray.push(
            <button
                key={i}
                className={i === currentPage ? 'page-focused' : ''}
                onClick={() => {
                    setCurrentPage(i);
                }}
            >
                {i}
            </button>,
        );
    }
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    /** 2023/05/23 - 자신의 플레이리스트를 클릭하면 플레이리스트에 음악을 추가하는 함수 - 박수범*/
    const addPlayListMusic = (playListId: number, title: string) => {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/playlists/${playListId}/musics/${newMusicId}`,
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        withCredentials: true,
                        Authorization: token,
                    },
                },
            )
            .then(() => {
                alert(`선택하신 음악이 ${title}에 추가되었습니다.`);
            })
            .catch(() => {
                alert('플레이리스트에 정상적으로 추가가 되지 않았습니다.');
            });
    };

    return (
        <PlayListContainer>
            <MyplaylistTitle>
                <div className="play-icon">
                    <BsMusicPlayer />
                    <p>MY PLAYLIST</p>
                </div>
                <Pagination>
                    <button disabled={currentPage === 1} onClick={handlePrevPage}>
                        Prev
                    </button>
                    <button>{currentPage}</button>
                    <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                        Next
                    </button>
                </Pagination>
            </MyplaylistTitle>
            {myplaylistData.map((data) => (
                <PlaylistList
                    key={data.playListId}
                    onClick={() => {
                        addPlayListMusic(data.playListId, data.title);
                    }}
                >
                    <img src={data.coverImg} alt="musicimg" />
                    <li>{data.title}</li>
                    <div className="playlist-vote-icon">
                        <AiFillHeart />
                        {data.likeCount}
                    </div>
                </PlaylistList>
            ))}
        </PlayListContainer>
    );
};

export default AddListMusic;

const PlayListContainer = styled.div`
    z-index: 3;
    width: 400px;
    height: 280px;
    align-items: center;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
`;

/* 2023.05.10 Like Music 타이틀 컴포넌트 - 홍혜란 */
const MyplaylistTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;

    .play-icon {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: rgb(41, 55, 255);
        padding-top: 5px;
    }

    p {
        font-size: 16px;
        color: #ffffff;
        margin-left: 5px;
    }

    li {
        display: flex;
        align-items: center;
        color: white;
        margin-left: 8px;
    }
`;

const PlaylistList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(43, 43, 43, 0.8);
    margin-top: 20px;
    width: 400px;
    cursor: pointer;
    &:hover {
        background-color: rgba(181, 179, 179, 0.5);
    }
    div {
        margin-right: 10%;
    }
    img {
        width: 50px;
        height: 50px;
    }

    li {
        font-size: 12px;
        color: white;
    }

    li:nth-child(3) {
        font-size: 10px;
    }

    .playlist-vote-icon {
        font-size: 12px;
        color: rgb(245, 109, 109);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .playlist-button {
        font-size: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: inherit;
        text-decoration: none;
    }

    .playlist-menu {
        font-size: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 720px) {
        width: 300px;
        margin: 0;
        margin-top: 20px;
    }
`;

const Pagination = styled.div`
    button {
        color: #ccc;
        background: none;
        border: 1px solid #5a5a5a;
        border-radius: 3px;
        margin: 0px 3px;
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }
    button:hover {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }

    button:disabled {
        border: 1px solid #5a5a5a;
        color: #5a5a5a;
    }
    button:disabled:hover {
        background: none;
        cursor: default;
    }

    .page-focused {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }
`;
