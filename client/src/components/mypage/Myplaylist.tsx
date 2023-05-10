import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { BsMusicPlayer, BsPlayCircle } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';

/* 2023.05.10 Like Music 타입 선언 - 홍혜란 */
type PlayData = {
    id: number;
    imgSrc: string;
    name: string;
    time: string;
    vote: number;
};

/* 2023.05.10 Like Music 더미데이터(임시) - 홍혜란 */
const MyPlay: PlayData[] = [
    {
        id: 0,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        time: '2023.05.04',
        vote: 13,
    },
    {
        id: 1,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        time: '2023.05.04',
        vote: 13,
    },
    {
        id: 2,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        time: '2023.05.04',
        vote: 13,
    },
];

const Myplaylist = () => {
    const playlistData = MyPlay;

    return (
        <PlayListContainer>
            <div className="playlist-title">
                <div className="play-icon">
                    <BsMusicPlayer />
                </div>
                <p>MY PLAYLIST</p>
            </div>

            {playlistData.map((data) => (
                <div className="playlist-list">
                    <img src={data.imgSrc} alt="musicimg" />
                    <li>{data.name}</li>
                    <li>{data.time}</li>
                    <div className="playlist-vote-icon">
                        <AiFillHeart />
                        {data.vote}
                    </div>
                    <div className="playlist-button">
                        <BsPlayCircle />
                    </div>
                    <div className="playlist-menu">
                        <CiMenuKebab />
                    </div>
                </div>
            ))}
        </PlayListContainer>
    );
};

export default Myplaylist;

const PlayListContainer = styled.div`
    align-items: center;
    margin: 10px;
    margin-top: 20px;

    .playlist-title {
        display: flex;
        align-items: center;

        .play-icon {
            font-size: 25px;
            color: hsl(216, 100%, 50%);
            display: flex;
            align-items: center;
        }

        p {
            font-size: 20px;
            color: #ffffff;
            margin-left: 5px;
        }
    }

    .playlist-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(43, 43, 43, 0.8);
        margin-top: 15px;

        img {
            width: 50px;
            height: 50px;
        }

        li {
            font-size: 20px;
            color: white;
        }

        li:nth-child(3) {
            font-size: 10px;
        }

        .playlist-vote-icon {
            font-size: 15px;
            color: red;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .playlist-button {
            font-size: 30px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .playlist-menu {
            font-size: 30px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
