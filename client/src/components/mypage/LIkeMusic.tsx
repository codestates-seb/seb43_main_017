import styled from 'styled-components';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
// import React, { useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import axios from 'axios';
// import { likedSongs } from 'src/recoil/Atoms';

/* 2023.05.10 Like Music 타입 선언 - 홍혜란 */
type MusicData = {
    id: number;
    name: string;
    artist: string;
    album: string;
    imgSrc: string;
};

/* 2023.05.10 Like Music 더미데이터(임시) - 홍혜란 */
const VoteLike: MusicData[] = [
    {
        id: 1,
        name: 'Ditto',
        artist: 'Newjeans',
        album: 'OMG',
        imgSrc: './assets/ditto.png',
    },
    {
        id: 2,
        name: 'Ditto',
        artist: 'Newjeans',
        album: 'OMG',
        imgSrc: './assets/ditto.png',
    },
    {
        id: 3,
        name: 'Ditto',
        artist: 'Newjeans',
        album: 'OMG',
        imgSrc: './assets/ditto.png',
    },
    {
        id: 4,
        name: 'Ditto',
        artist: 'Newjeans',
        album: 'OMG',
        imgSrc: './assets/ditto.png',
    },
    {
        id: 5,
        name: 'Ditto',
        artist: 'Newjeans',
        album: 'OMG',
        imgSrc: './assets/ditto.png',
    },
];

const LikeMusic = () => {
    const musicData = VoteLike;

    /* 
    // 좋아요를 누른 음악 목록을 저장하는 atom
    const likedSongs = atom<{ [memberId: number]: string[] }>({
        key: 'likedSongs',
        default: {},
    });

    // 음악 목록 컴포넌트
    const SongList = ({ memberId }: { memberId: number }) => {
        const [likedSongsList, setLikedSongsList] = useRecoilState(likedSongs);

        // 좋아요를 누른 음악 목록을 서버에서 가져오는 함수
        const fetchLikedSongs = async () => {
            try {
                const response = await axios.get(`/api/liked-songs/${memberId}`);
                const data = response.data;
                setLikedSongsList({ ...likedSongsList, [memberId]: data });
            } catch (error) {
                console.error('Failed to fetch liked songs:', error);
            }
        };

        // 좋아요를 해제하는 함수
        const handleUnlike = async (songId: string) => {
            try {
                await axios.delete(`/api/liked-songs/${memberId}/${songId}`);
                const updatedLikedSongs = likedSongsList[memberId].filter((id) => id !== songId);
                setLikedSongsList({ ...likedSongsList, [memberId]: updatedLikedSongs });
            } catch (error) {
                console.error('Failed to unlike song:', error);
            }
        };

        // 컴포넌트가 마운트될 때 좋아요를 누른 음악 목록을 가져옴
        useEffect(() => {
            fetchLikedSongs();
        }, [memberId]);

        const isSongLiked = (songId: string) => likedSongsList[memberId]?.includes(songId);

        return (
            <div>
                <h2>Liked Songs</h2>
                {likedSongsList[memberId]?.map((songId) => (
                    <div key={songId}>
                        <span>{songId}</span>
                        <button onClick={() => handleUnlike(songId)}>{isSongLiked(songId) ? '<HiOutlineHeart />' : '<HiHeart />'}</button>
                    </div>
                ))}
            </div>
        );
    }; 

     const memberId = parseInt(localStorage.getItem('member-id') || '');
     <SongList memberId={memberId} />
    */

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <HiHeart />
                    <p>LIKE MUSIC</p>
                </div>
            </LikeTitle>
            {musicData.map((data) => (
                <LikeList>
                    <img src={data.imgSrc} alt="musicimg" />
                    <li>{data.name}</li>
                    <li>{data.artist}</li>
                    <li>{data.album}</li>
                    <div className="music-icon">
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
