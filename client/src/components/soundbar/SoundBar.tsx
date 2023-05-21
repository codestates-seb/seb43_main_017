import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const songs = [
        {
            src: 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com/assets/music/Carefree - Kevin MacLeod.mp3',
            duration: '03:28',
        },
        {
            src: 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com/assets/music/Cheery Monday - Kevin MacLeod.mp3',
            duration: '03:28',
        },
        {
            src: 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com/assets/music/Death Of A Friend - Yeti Music.mp3',
            duration: '03:28',
        },
        // 다른 곡들도 추가할 수 있습니다
        // { src: "다른 곡의 URL", duration: "곡의 길이" },
    ];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
        }
    }, [audioRef]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    const formatSecondsToTime = (formattedTime: number) => {
        const minutes = Math.floor(formattedTime / 60);
        const remainingSeconds = formattedTime % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const playPreviousSong = () => {
        if (currentSongIndex === 0) {
            setCurrentSongIndex(songs.length - 1);
        } else {
            setCurrentSongIndex(currentSongIndex - 1);
        }
        setCurrentTime(0); // 이전 곡으로 이동할 때 재생 시간 초기화
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const playNextSong = () => {
        if (currentSongIndex === songs.length - 1) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex(currentSongIndex + 1);
        }
        setCurrentTime(0); // 다음 곡으로 이동할 때 재생 시간 초기화
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const currentSong = songs[currentSongIndex];

    return (
        <AudioPlayerGroup>
            <audio ref={audioRef} src={currentSong.src} onTimeUpdate={handleTimeUpdate} autoPlay />

            <div>
                {formatSecondsToTime(Number(currentTime.toFixed(0)))} / {currentSong.duration}
            </div>

            <button onClick={playPreviousSong}>이전 곡</button>
            <button onClick={play}>재생</button>
            <button onClick={pause}>일시정지</button>
            <button onClick={playNextSong}>다음 곡</button>

            <input
                type="range"
                min="0"
                max={audioRef.current ? audioRef.current.duration : 0}
                step="0.1"
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
            />

            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </AudioPlayerGroup>
    );
};

export default AudioPlayer;

const AudioPlayerGroup = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 100px;
    border: 1px solid #ccc;
    margin: 50px;
`;
