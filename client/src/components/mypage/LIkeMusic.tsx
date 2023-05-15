import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

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

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <AiFillHeart />
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
                        <AiFillHeart />
                    </div>
                </LikeList>
            ))}
        </LikeContainer>
    );
};

export default LikeMusic;

/* 2023.05.10 Like Music 전체 박스 컴포넌트 - 홍혜란 */
const LikeContainer = styled.div`
    align-items: center;
    margin: 30px;
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
