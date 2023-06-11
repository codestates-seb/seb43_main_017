import styled from 'styled-components';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playingMusic, playlistViewerState } from 'src/recoil/Atoms';

import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from 'react-icons/tb';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { RiPlayListFill } from 'react-icons/ri';

interface Song {
    musicUri: string;
    musicTime: number;
}

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.15);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [onPlay, setOnPlay] = useState<boolean>(false);
    const [showSoundControll, setShowSoundControll] = useState<boolean>(false);
    const [, setPlayingDots] = useRecoilState<boolean>(playingMusic);

    const [songs, setSongs] = useState([{ src: '', duration: 0 }]);
    const [, setOpenViewer] = useRecoilState<boolean>(playlistViewerState);

    const onPlaylist = sessionStorage.getItem('onPlaylist');
    const msId = sessionStorage.getItem('musicId');
    const plOn: string = onPlaylist === 'true' ? '/playlists' : '';

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/musics${plOn}/${msId}`)
            .then((response) => {
                let data;
                if (onPlaylist === 'true') {
                    data = response.data.map((song: Song) => ({
                        src: song.musicUri,
                        duration: song.musicTime,
                    }));
                } else {
                    data = [response.data.data].map((song) => ({
                        src: song.musicUri,
                        duration: song.musicTime,
                    }));
                }

                setSongs(data);
            })
            .catch((error) => {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });

        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.currentTime = currentTime;
        }
    }, []);

    /** 203.05.22 볼륨 상태변경 - 김주비 */
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    /** 203.05.22 음원 재생시간 변경 - 김주비 */
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const currentSong = songs[currentSongIndex]; // 현재 재생되는 음원 데이터

    /** 203.05.22 음원재생 - 김주비 */
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        setOnPlay(false);
        setPlayingDots(true);
    };
    /** 203.05.22 일시정지 - 김주비 */
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setOnPlay(true);
        setPlayingDots(false);
    };
    /** 203.05.22 음원 재생시간 - 김주비 */
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    /** 203.05.22 이전곡 재생 인덱스 상태변경 - 김주비 */
    const playPreviousSong = () => {
        if (currentSongIndex === 0) {
            setCurrentSongIndex(songs.length - 1);
        } else {
            setCurrentSongIndex(currentSongIndex - 1);
            setPlayingDots(true);
        }
        setOnPlay(false);
        setCurrentTime(0); // 이전 곡으로 이동할 때 재생 시간 초기화
    };
    /** 203.05.22 다음곡 재생 인덱스 상태변경 - 김주비 */
    const playNextSong = () => {
        if (currentSongIndex === songs.length - 1) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex(currentSongIndex + 1);
            setPlayingDots(true);
        }
        setOnPlay(false);
        setCurrentTime(0); // 다음 곡으로 이동할 때 재생 시간 초기화
    };
    /** 203.05.22 음원 재생시간 00:00 형태로 변경 - 김주비 */
    const formatSecondsToTime = (formattedTime: number) => {
        const minutes = Math.floor(formattedTime / 60);
        const remainingSeconds = formattedTime % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };
    /** 203.05.22 음원 재생종료 - 김주비 */
    const handleSongEnd = () => {
        if (currentSongIndex === songs.length - 1) {
            setOnPlay(!onPlay);
            setPlayingDots(false);
        } else {
            playNextSong();
        }
    };

    const handlePlBox = () => {
        if (onPlaylist === 'true') {
            setOpenViewer(true);
        } else {
            alert('단일 음원 데이터에서는 플레이리스트 기능을 제공하지 않습니다.');
        }
    };

    return (
        <AudioPlayerGroup>
            <audio
                ref={audioRef}
                src={`https://uncoversound.com/assets/music/${currentSong.src}`}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleSongEnd}
                autoPlay
            />

            <SoundMovingBar>
                <div> {formatSecondsToTime(Number(currentTime.toFixed(0)))}</div>
                <input
                    className="soundbar-moving"
                    type="range"
                    min="0"
                    max={audioRef.current ? audioRef.current.duration.toString() : '0'}
                    step="0.01"
                    value={currentTime}
                    onChange={handleTimeChange}
                />
                <div>{formatSecondsToTime(currentSong.duration)}</div>
            </SoundMovingBar>
            <SoundOption>
                <SoundVolume>
                    {volume !== 0 ? (
                        <FaVolumeUp
                            onClick={() => {
                                setShowSoundControll(!showSoundControll);
                            }}
                        />
                    ) : (
                        <FaVolumeMute
                            onClick={() => {
                                setShowSoundControll(!showSoundControll);
                            }}
                        />
                    )}
                    {showSoundControll ? (
                        <input
                            className="volume-controll"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    ) : null}
                </SoundVolume>
                <SoundPlay>
                    <button onClick={playPreviousSong} className="button-smalSize">
                        <TbPlayerTrackPrevFilled />
                    </button>
                    {onPlay ? (
                        <button onClick={play}>
                            <BsFillPlayFill />
                        </button>
                    ) : (
                        <button onClick={pause}>
                            <BsPauseFill />
                        </button>
                    )}
                    <button onClick={playNextSong} className="button-smalSize">
                        <TbPlayerTrackNextFilled />
                    </button>
                </SoundPlay>
                <PlaylistBox onClick={handlePlBox}>
                    <RiPlayListFill />
                </PlaylistBox>
            </SoundOption>
        </AudioPlayerGroup>
    );
};

export default AudioPlayer;

const AudioPlayerGroup = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 600px;
    margin-top: 50px;
    opacity: 0;
    animation: showsoundbar 2s forwards 2s;

    @keyframes showsoundbar {
        100% {
            opacity: 1;
        }
    }
    @media (max-width: 700px) {
        width: 90%;
    }
`;
interface SoundBarMovingProps {
    volume?: number;
    speaker?: boolean;
}
const SoundMovingBar = styled.div<SoundBarMovingProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 2;

    > * {
        margin: 10px;
    }
    .soundbar-moving {
        height: 5px;
        width: 100%;
    }
    input[type='range'] {
        cursor: pointer;
        overflow: hidden;
        height: 5px;
        width: 100%;
        -webkit-appearance: none;
        background-color: #e9e9e9;
        border-radius: 10px;
    }

    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 5px;
        height: 10px;
        background: #5e5e5e;
        box-shadow: -500px 0 0 500px #8b8b8b;
    }
`;
const SoundOption = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
`;
const SoundVolume = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    padding: 10px;
    color: rgb(255, 255, 255, 0.4);
    transition: 0.2s ease-in-out;
    cursor: pointer;

    :hover {
        color: rgb(255, 255, 255, 0.7);
    }
    .volume-controll {
        position: absolute;
        height: 5px;
        width: 80px;
        left: 60px;
    }
    @media (max-width: 700px) {
        .volume-controll {
            top: 80px;
            left: auto;
            transform: rotate(90deg);
        }
    }
`;
const SoundPlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        background: none;
        border: none;
        font-size: 6rem;
        transition: 0.3s ease-in-out;
        color: #ccc;
        cursor: pointer;
    }
    button:hover {
        color: #ff6060;
    }

    button:active {
        transform: scale(2);
    }
    .button-smalSize {
        font-size: 3rem;
    }
`;
const PlaylistBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    padding: 10px;
    color: rgb(255, 255, 255, 0.4);
    transition: 0.2s ease-in-out;
    cursor: pointer;

    :hover {
        color: rgb(255, 255, 255, 0.7);
    }
`;
