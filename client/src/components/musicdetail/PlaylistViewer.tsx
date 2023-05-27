import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { playlistViewerState } from 'src/recoil/Atoms';
import { MdTransitEnterexit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PlaylistViewer = () => {
    const [, setOpenviewer] = useRecoilState<boolean>(playlistViewerState);
    const [plData, setPldata] = useState<pldata[]>([]);
    const plDataId = sessionStorage.getItem('musicId');

    interface pldata {
        musicName: string;
        artistName: string;
        musicTime: number;
        albumCoverImg: string;
        musicUri: string;
        musicId: number;
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/musics/playlists/${plDataId}`)
            .then((res) => {
                setPldata(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const formatSecondsToTime = (formattedTime: number) => {
        const minutes = Math.floor(formattedTime / 60);
        const remainingSeconds = formattedTime % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <ViewerGroup>
            <div className="pl-dataGroup">
                <div className="title-font">PLAYLIST</div>
                {plData.map((data, index) => (
                    <PlaylistData key={`pl-${index}`}>
                        <li className="pl-index">0{index + 1}</li>
                        <li className="pl-image">
                            <Link to={`/musiclist/${data.musicId}`}>
                                <img src={data.albumCoverImg} alt="music cover image" />
                            </Link>
                        </li>
                        <li className="pl-title">
                            <span>{data.musicName}</span>
                            <span>{data.artistName}</span>
                        </li>
                        <li className="pl-musicTime">{formatSecondsToTime(data.musicTime)}</li>
                        <li className="pl-download">
                            <a href={`/assets/music/${data.musicUri}`}>download</a>
                        </li>
                    </PlaylistData>
                ))}
            </div>
            <div
                className="X-box"
                onClick={() => {
                    setOpenviewer(false);
                }}
            >
                <MdTransitEnterexit />
            </div>
        </ViewerGroup>
    );
};
export default PlaylistViewer;

const ViewerGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 0vh;
    top: 0px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    z-index: 3;
    overflow: hidden;
    animation: Openviewer forwards 1s;

    @keyframes Openviewer {
        100% {
            height: 100vh;
        }
    }

    .pl-dataGroup {
        width: 60%;
    }

    .title-font {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ccc;
        width: 100%;
        margin-bottom: 30px;
        font-size: 2.5rem;
        font-weight: 700;
    }
    .X-box {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0px;
        left: 2px;
        width: 60px;
        height: 60px;
        font-size: 2rem;
        border: 2px solid #ccc;
        transition: 0.2s ease-in-out;
        > * {
            transition: 0.2s ease-in-out;
        }
    }
    .X-box:hover {
        color: #ff6060;
        border-color: #ff6060;
        > * {
            transform: rotate(180deg);
        }
    }
    @media (max-width: 700px) {
        .pl-dataGroup {
            width: 100%;
        }
    }
`;
const PlaylistData = styled.ul`
    display: flex;
    width: 100%;
    font-size: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    li {
        width: 100%;
        flex: 0 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 80px;
        height: 80px;
        font-family: 'Noto Sans KR', sans-serif;
    }

    .pl-index {
        font-size: 2rem;
        font-weight: 600;
        width: 80px;
    }
    .pl-image {
        width: 80px;
        img {
            width: 80px;
            height: 80px;
            transform: scale(0.7);
            border-radius: 10px;
        }
    }
    .pl-title {
        display: flex;
        flex-direction: column;

        > * {
            margin: 5px;
        }
        span {
            padding-left: 40px;
            width: 100%;
        }
        span:nth-child(2) {
            color: rgba(255, 255, 255, 0.3);
        }
    }

    .pl-musicTime {
        color: rgba(255, 255, 255, 0.3);
    }
    .pl-download {
        width: 500px;
        background-color: #e6400e;
        transform: scale(0.6);
        font-size: 1.2rem;
        text-transform: uppercase;
        border-radius: 5px;
        transition: 0.1s ease-in-out;
        :hover {
            background-color: #ff754b;
        }
        :active {
            transform: scale(0.5);
        }
        a {
            color: #ccc;
            text-decoration: none;
        }
    }
    @media (max-width: 700px) {
        .pl-musicTime {
            display: none;
        }
        .pl-index {
            width: 60px;
        }
    }
`;
