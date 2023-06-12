import React, { useState, useEffect } from 'react';
import Loding from 'src/pages/Loding';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface MusicData {
    musicId: number;
    musicName: string;
    artistName: string;
    albumName: string;
    musicTime: number;
    albumCoverImg: string;
    musicUri: string;
    createdAt: string;
    modifiedAt: string;
}

const Trending = () => {
    const [tranding, setTranding] = useState<MusicData[]>([]);
    const [isLoding, setIsLoding] = useState(true);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;

    useEffect(() => {
        if (token) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/members/musics/recommend`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    setTranding(response.data.data);
                    console.log(response);
                    setIsLoding(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .get(`${process.env.REACT_APP_API_URL}/musics?&size=6`)
                .then((response) => {
                    setTranding(response.data.data);
                    setIsLoding(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <Container>
            <TrTitleContainer>
                <TrTitle>Trending</TrTitle>
            </TrTitleContainer>
            {isLoding ? (
                <Loding />
            ) : (
                <ItemsContainer>
                    {tranding.map((data) => (
                        <Item key={data.musicId}>
                            <Link to={`/musiclist/${data.musicId}`}>
                                <Image src={data.albumCoverImg} alt={data.musicName} />
                                <Title>{data.musicName}</Title>
                                <Artist>{data.artistName}</Artist>
                            </Link>
                        </Item>
                    ))}
                </ItemsContainer>
            )}
        </Container>
    );
};

export default Trending;

/* 2023.05.08 MusicList Tranding (트랜딩 컨테이너) 컴포넌트 구현 - 홍혜란 */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0;
    width: 100%;
    margin-top: 40px;
    @media (max-width: 700px) {
        margin-top: 0px;
    }
`;

/* 2023.05.08 MusicList Tranding (타이틀 컨테이너) 컴포넌트 구현 - 홍혜란 */
const TrTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

/* 2023.05.08 MusicList Tranding (타이틀) 컴포넌트 구현 - 홍혜란 */
const TrTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    margin: 10px 0px;
    a {
        text-decoration: none;
    }
`;

/* 2023.05.11 MusicList Tranding (리스트 나올 박스) 컴포넌트 구현 / slideIn 애니메이션 - 홍혜란 */
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    opacity: 0;
    transform: translateX(-20px);
    animation: slideIn 1s ease-in-out forwards;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @media screen and (max-width: 800px) {
        margin-left: 10px;
    }
`;

/* 2023.05.08 MusicList Tranding (트랜딩 리스트 컨테이너) 컴포넌트 구현 - 홍혜란 */
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Rajdhani', sans-serif;
    a {
        text-decoration: none;
    }
    @media screen and (max-width: 1200px) {
        & ${Item}:nth-child(6) {
            display: none;
        }
    }
    @media screen and (max-width: 1100px) {
        & ${Item}:nth-child(5) {
            display: none;
        }
    }
    @media screen and (max-width: 1000px) {
        & ${Item}:nth-child(4) {
            display: none;
        }
    }
`;

/* 2023.05.08 MusicList Tranding (노래 앨범 커버) 컴포넌트 구현 - 홍혜란 */
const Image = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 10%;
    object-fit: cover;
    @media screen and (max-width: 700px) {
        width: 100px;
        height: 100px;
    }
`;

/* 2023.05.08 MusicList Tranding (노래 제목) 컴포넌트 구현 - 홍혜란 */
const Title = styled.p`
    font-size: 1rem;
    color: hsl(0, 0%, 100%);
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-top: 10px;
`;

/* 2023.05.08 MusicList Tranding (노래 가수 이름) 컴포넌트 구현 - 홍혜란 */
const Artist = styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 8px;
`;
