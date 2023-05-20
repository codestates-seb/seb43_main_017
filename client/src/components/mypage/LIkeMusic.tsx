import styled from 'styled-components';
import { HiHeart } from 'react-icons/hi';
// import { MusicDataResponse } from 'src/types/Musiclist';
// import { musicDataListState } from 'src/recoil/Atoms';
// import { useRecoilState } from 'recoil';
// import { useEffect } from 'react';
// import axios from 'axios';

/* 2023.05.10 Like Music 타입 선언 - 홍혜란 */
type MusicData = {
    id: number;
    musicName: string;
    artistName: string;
    albumName: string;
    albumCoverImg: string;
};

/* 2023.05.10 Like Music 더미데이터(임시) - 홍혜란 */
const VoteLike: MusicData[] = [
    {
        id: 1,
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        albumCoverImg: './assets/ditto.png',
    },
    {
        id: 2,
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        albumCoverImg: './assets/ditto.png',
    },
    {
        id: 3,
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        albumCoverImg: './assets/ditto.png',
    },
    {
        id: 4,
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        albumCoverImg: './assets/ditto.png',
    },
    {
        id: 5,
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        albumCoverImg: './assets/ditto.png',
    },
];

// const [musicDataList, setMusicDataList] = useRecoilState(musicDataListState);
// const memberId: string | undefined = window.localStorage.getItem('memberId') || undefined;

// useEffect(() => {
//     axios
//         .get<MusicDataResponse>(
//             `http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/music-like/members/${memberId}`,
//         )
//         .then((response) => {
//             setMusicDataList(response.data.data);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }, [setMusicDataList]);

const LikeMusic = () => {
    const musicData = VoteLike;

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <HiHeart />
                    <p>LIKE MUSIC</p>
                </div>
            </LikeTitle>
            {musicData.map((likedata) => (
                <LikeList>
                    <img src={likedata.albumCoverImg} alt={likedata.musicName} />
                    <li>{likedata.musicName}</li>
                    <li>{likedata.artistName}</li>
                    <li>{likedata.albumName}</li>
                    <div className="music-icon"></div>
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
