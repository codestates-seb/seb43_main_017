import styled from 'styled-components';
import { HiHeart } from 'react-icons/hi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

const LikeMusic = () => {
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지

    const [likedMusic, setLikedMusic] = useState<LikeMusicList[]>([]);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const fetchLikedMusic = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}/musics/liked-musics?&page=${currentPage}&size=5`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    setLikedMusic(response.data.data);
                    setTotalPages(response.data.pageInfo.totalPages);
                })
                .catch((error) => {
                    console.error('Error fetching liked music:', error);
                });
        };

        fetchLikedMusic();
    }, [setLikedMusic, currentPage, update]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleLike = (musicId: number) => {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/music-like/toggle`,
                {
                    musicId: musicId,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            )
            .then(() => {
                setUpdate(!update);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <HiHeart />
                    <p>LIKE MUSIC</p>
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
            </LikeTitle>
            {likedMusic.map((likedata) => (
                <LikeList key={likedata.musicId}>
                    <Link to={`/musiclist/${likedata.musicId}`}>
                        <img src={likedata.albumCoverImg} alt={likedata.musicName} />
                        <span>{likedata.musicName}</span>
                        <span>{likedata.artistName}</span>
                    </Link>
                    <div
                        className="music-icon"
                        onClick={() => {
                            handleLike(likedata.musicId);
                        }}
                    >
                        <HiHeart />
                    </div>
                </LikeList>
            ))}
        </LikeContainer>
    );
};

export default LikeMusic;

/* 2023.05.10 Like Music 전체 박스 컴포넌트 - 홍혜란 */
const LikeContainer = styled.div`
    width: 400px;
    height: 280px;
    align-items: center;
`;
/* 2023.05.10 Like Music 타이틀 컴포넌트 - 홍혜란 */
const LikeTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;

    .vote-icon {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: rgb(255, 80, 80);
        font-weight: 600;
        font-family: 'Noto Sans KR', sans-serif;
    }

    p {
        font-size: 16px;
        color: #ffffff;
        margin-left: 5px;
    }
`;

/* 2023.05.10 Like Music 리스트 출력 컴포넌트 - 홍혜란 */
const LikeList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        > * {
            margin-left: 20px;
        }
        > *:nth-child(1) {
            margin: 0px;
        }
    }
    :hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    img {
        width: 30px;
        height: 30px;
        border-radius: 10%;
    }

    span {
        font-size: 12px;
        color: #ccc;
    }

    span:nth-child(3) {
        color: rgba(255, 255, 255, 0.4);
    }

    .music-icon {
        font-size: 16px;
        color: rgb(255, 80, 80);
        display: flex;
        align-items: center;
        justify-content: center;
        > * {
            transition: 0.2s ease-in-out;
        }
        > *:hover {
            transform: scale(1.2);
            color: rgb(255, 125, 125);
        }
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
