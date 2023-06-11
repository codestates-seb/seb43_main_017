import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { TfiMenu } from 'react-icons/tfi';
import { RiFolderMusicFill, RiPencilFill, RiDeleteBin5Line } from 'react-icons/ri';
import {
    modalState,
    myplaylistState,
    modifyDataState,
    modifyClickState,
    playListModalState,
    UpdataModify,
} from 'src/recoil/Atoms';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Myplaylist = () => {
    /* 2023.05.16 마이플레이리스트 메뉴 버튼 클릭시 수정, 삭제 버튼 모달 */
    const [showModal, setShowModal] = useRecoilState<boolean>(modalState);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
    const [update, setUpdate] = useState<boolean>(false);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [myplaylistData, setMyplaylistData] = useRecoilState(myplaylistState);
    const [, setModifyDataState] = useRecoilState(modifyClickState);
    const setPlayListState = useSetRecoilState(playListModalState);
    const [updateModify] = useRecoilState(UpdataModify);

    /** 2023.05.22 마이플레이리스트 조회 */
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
    }, [update, updateModify, currentPage]);

    /* 2023.05.22 마이플레이리스트 삭제 */
    const handleDeletePlaylist = (playlistId: number) => {
        const result = confirm('플레이리스트를 삭제하시겠습니까?');
        if (result) {
            axios
                .delete(`${process.env.REACT_APP_API_URL}/playlists/${playlistId}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(() => {
                    setUpdate(!update);
                    alert('삭제가 완료되었습니다.');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert('삭제가 취소되었습니다.');
        }
        setModifyState(false);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const setModifyState = useSetRecoilState(modifyDataState);

    const handleModfiyState = (id: number) => {
        setModifyState(true);
        setModifyDataState(id);
        setUpdate(!update);
    };

    return (
        <PlayListContainer>
            <MyplaylistTitle>
                <div className="play-icon">
                    <RiFolderMusicFill className="color-blue" />
                    <p>MY PLAYLIST</p>
                    <span>
                        <button
                            onClick={() => {
                                setPlayListState(true);
                            }}
                        >
                            생성하기
                        </button>
                    </span>
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
                <PlaylistList key={data.playListId}>
                    <Link to={`/playlsit/${data.playListId}`}>
                        <img src={data.coverImg} alt="musicimg" />
                        <span className="playlist-title">{data.title}</span>
                    </Link>
                    <div className="playlist-vote-icon box-size">
                        <AiFillHeart />
                        {data.likeCount}
                    </div>
                    <div
                        className="playlist-menu box-size"
                        onClick={() => {
                            setSelectedPlaylistId(data.playListId);
                            setShowModal(!showModal);
                        }}
                    >
                        <TfiMenu className="color-gray" />
                        {selectedPlaylistId === data.playListId && showModal && (
                            <ModalContainer>
                                <Button onClick={() => handleModfiyState(data.playListId)}>
                                    <RiPencilFill />
                                </Button>
                                <Button onClick={() => handleDeletePlaylist(data.playListId)}>
                                    <RiDeleteBin5Line />
                                </Button>
                            </ModalContainer>
                        )}
                    </div>
                </PlaylistList>
            ))}
        </PlayListContainer>
    );
};

export default Myplaylist;

const PlayListContainer = styled.div`
    width: 400px;
    height: 280px;
    align-items: center;
    margin-top: 20px;
`;
/* 2023.05.10 Like Music 타이틀 컴포넌트 - 홍혜란 */
const MyplaylistTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    color: #ccc;
    margin-bottom: 20px;

    .play-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #fff;
        > * {
            margin-right: 8px;
        }
        .color-blue {
            color: #4869ff;
        }
        button {
            width: 60px;
            height: 20px;
            background: #4869ff;
            border: none;
            color: #ffffff;
            border-radius: 3px;
            font-size: 0.7rem;
            transition: 0.1s ease-in-out;
            :hover {
                background: #6985ff;
            }
        }
    }
`;
const PlaylistList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(43, 43, 43, 0.8);
    margin-top: 10px;
    width: 400px;
    height: 50px;

    > * {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #ccc;
        font-family: 'Noto Sans KR';
        font-size: 0.8rem;
    }
    a {
        text-decoration: none;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 0px 10px 10px 0px;
    }

    .color-gray {
        color: rgba(255, 255, 255, 0.3);
        :hover {
            color: rgba(255, 255, 255, 0.7);
        }
    }
    .box-size {
        width: 50px;
    }
    .playlist-title {
        padding-left: 20px;
    }
    .playlist-vote-icon {
        font-size: 12px;
        color: rgb(245, 109, 109);
        display: flex;
        align-items: center;
        justify-content: center;
        > * {
            margin: 7px;
        }
    }
    .playlist-button {
        font-size: 16px;
        color: #6e9cff;
        display: flex;
        align-items: center;
        justify-content: center;
        .color-blue {
            color: #6e9cff;
            font-size: 1.2rem;
            transition: 0.2s ease-in-out;
        }
    }
    .playlist-menu {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
/* 2023.05.16 마이플레이리스트 메뉴 모달 컴포넌트 - 홍혜란 */
const ModalContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 40px;
    width: 50px;
    height: 30px;
    background: #414141;
    border-radius: 0.4em;

    :after {
        content: '';
        position: absolute;
        left: 2px;
        top: 50%;
        width: 0;
        height: 0;
        border: 0.469em solid transparent;
        border-right-color: #414141;
        border-left: 0;
        margin-top: -0.469em;
        margin-left: -0.469em;
    }
`;
/* 2023.05.16 마이플레이리스트 메뉴 모달 버튼 컴포넌트 - 홍혜란 */
const Button = styled.button`
    background: none;
    color: #ccc;
    border: none;
    font-size: 10px;
    :hover {
        color: #4869ff;
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
