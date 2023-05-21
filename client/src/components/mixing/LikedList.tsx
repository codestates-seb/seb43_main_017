import styled from 'styled-components';
import { HiHeart } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useEffect, useState, RefObject } from 'react';

interface LikeMusicList {
    albumCoverImg: string;
    albumName: string;
    artistName: string;
    createdAt: string;
    memberId: number;
    modifiedAt: string;
    musicId: number;
    musicLikeCount: number;
    musicName: string;
    musicTagName: string;
    musicTime: number;
    musicUri: string;
}

interface LikedListProps {
    audioRef: RefObject<HTMLAudioElement>;
}
/*
1. axios.get으로 유저가 좋아요 누른 음악들만 불러온다.
2. res.data안에 들어있는 좋아요한 음악들의 리스트를 state로 관리한다.
3. 상태값을 map으로 순회하며 <li>타이틀</li>/<li>가수</li>/<button onClick={setSelectedSong(uri)}> 뿌려준다.
4. selectedSong는 audio src로 사용한다.
5.최종적으로  타이틀   가수    +버튼  이런식으로 뿌려지게 한다.

 */

const LikedList = ({ audioRef }: LikedListProps) => {
    const [MusicTitle, setMusicTitle] = useState<string>('');
    const [currentMusic, setCurrentMusic] = useState<boolean>(false);
    const [audioControl, setAudioControl] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지
    const buttonArray = [];
    const [likedMusic, setLikedMusic] = useState<LikeMusicList[]>([
        {
            albumCoverImg: 'https://i.ytimg.com/vi/juhyaZ8A4Ck/mqdefault.jpg',
            albumName: 'A Hero Is Born',
            artistName: 'Anuch',
            createdAt: '2023-05-15 18:03:14',
            memberId: 0,
            modifiedAt: '2023-05-21 11:14:54',
            musicId: 7,
            musicLikeCount: 2,
            musicName: 'A Hero Is Born',
            musicTagName: 'string',
            musicTime: 99,
            musicUri: 'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
        },
    ]);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [selectedSong, setSelectedSong] = useState<string>(
        'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
    );

    useEffect(() => {
        const fetchLikedMusic = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/musics/liked-musics?&page=${currentPage}&size=8`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                );
                const likedMusicData: LikeMusicList[] = response.data.data.filter(
                    (music: LikeMusicList) => music.musicLikeCount > 0,
                );
                setLikedMusic(likedMusicData);

                setTotalPages(response.data.pageInfo.totalPages);
            } catch (error) {
                console.error('Error fetching liked music:', error);
            }
        };

        fetchLikedMusic();
    }, [setLikedMusic, currentPage]);

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

    const handleSongClick = (songUrl: string, songName: string) => {
        setSelectedSong(songUrl);
        setAudioControl(true);
        alert(songName + '이 추가되었습니다.');
    };

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <HiHeart />
                    <p>LIKE MUSIC</p>
                </div>
            </LikeTitle>
            {likedMusic.map((likedata) => (
                <LikeList key={likedata.musicId}>
                    <img src={likedata.albumCoverImg} alt={likedata.musicName} />
                    <li>{likedata.musicName}</li>
                    <li>{likedata.artistName}</li>
                    <AddMusic
                        onClick={() => {
                            handleSongClick(likedata.musicUri, likedata.musicName);
                            setCurrentMusic(true);
                            setMusicTitle(likedata.musicName);
                        }}
                    >
                        <AiOutlinePlus />
                    </AddMusic>
                </LikeList>
            ))}
            {currentMusic && (
                <CurrentMusic>
                    현재 곡은 <span>"{MusicTitle}"</span>입니다.
                </CurrentMusic>
            )}
            {audioControl && (
                <audio
                    ref={audioRef}
                    src={`http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com/assets/music/${selectedSong}`}
                ></audio>
            )}
            <Pagination>
                <button disabled={currentPage === 1} onClick={handlePrevPage}>
                    Prev
                </button>
                {buttonArray}
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                    Next
                </button>
            </Pagination>
        </LikeContainer>
    );
};

export default LikedList;

/* 2023.05.10 Like Music 전체 박스 컴포넌트 - 홍혜란 */
const LikeContainer = styled.div`
    width: 15rem;
    align-items: center;
    margin: 30px;
    @media screen and (max-width: 1000px) {
        width: 400px;
        margin: 0;
        margin-top: 50px;
        margin-left: 30px;
    }
`;

/* 2023.05.10 Like Music 타이틀 컴포넌트 - 홍혜란 */
const LikeTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;

    .vote-icon {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: rgb(245, 109, 109);
        padding-top: 5px;
    }

    p {
        font-size: 16px;
        color: #ffffff;
        margin-left: 5px;
    }
`;

/* 2023.05.10 Like Music 리스트 출력 컴포넌트 - 홍혜란 */
const LikeList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid hsl(0, 0%, 65%);
    padding: 8px;
    margin-bottom: 20px;

    img {
        width: 30px;
        height: 30px;
        border-radius: 10%;
    }

    li {
        font-size: 12px;
        color: white;
    }

    .music-icon {
        font-size: 16px;
        color: rgb(245, 109, 109);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
/* 2023.05.10 Like Music 리스트 페이지네이션 - 홍혜란 */
const Pagination = styled.div`
    button {
        color: #ccc;
        background: none;
        border: 1px solid #5a5a5a;
        border-radius: 3px;
        margin: 40px 3px;
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
/* 2023.05.10 Like Music 리스트 음악 영상에 추가 - 홍혜란 */
const AddMusic = styled.button`
    background: none;
    border: 0;
    outline: 0;
    color: aquamarine;
    cursor: pointer;
    font-size: 20px;
    &:hover {
        color: red;
    }
`;

const CurrentMusic = styled.p`
    margin-top: 50px;
    font-size: 14px;
    color: #b8b3b3;
    > span {
        font-weight: bold;
        color: #feeaea;
    }
`;
