import styled from 'styled-components';
import { HiHeart } from 'react-icons/hi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    const buttonArray = [];
    const [likedMusic, setLikedMusic] = useState<LikeMusicList[]>([]);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;

    useEffect(() => {
        const fetchLikedMusic = async () => {
            try {
                const response = await axios.get(
                    `http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/musics/liked-musics?&page=${currentPage}&size=5`,
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
                console.log(response.data.data);
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
                    {buttonArray}
                    <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                        Next
                    </button>
                </Pagination>
            </LikeTitle>
            {likedMusic.map((likedata) => (
                <LikeList>
                    <img src={likedata.albumCoverImg} alt={likedata.musicName} />
                    <li>{likedata.musicName}</li>
                    <li>{likedata.artistName}</li>
                    <li>{likedata.albumName}</li>
                </LikeList>
            ))}
        </LikeContainer>
    );
};

export default LikeMusic;

/* 2023.05.10 Like Music 전체 박스 컴포넌트 - 홍혜란 */
const LikeContainer = styled.div`
    width: 400px;
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
const LikeList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid hsl(0, 0%, 65%);
    padding: 8px;

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
