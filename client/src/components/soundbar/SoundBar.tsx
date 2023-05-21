import styled from 'styled-components';
import React from 'react';
import ReactPlayer from 'react-player';

function SoundBar() {
    return (
        <Soundbarsection>
            <ReactPlayer
                style={playerStyle}
                url="https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/600Horses-Cinco.mp3"
                controls
                playing
                volume={0.5}
                width="640  px"
                height="360px"
            />
        </Soundbarsection>
    );
}

export default SoundBar;

const playerStyle = {
    border: '2px solid #ccc',
    borderRadius: '8px',
};

const Soundbarsection = styled.div`
    position: fixed;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(20, 20, 20, 1);
    z-index: 3;
    width: 800px;
    height: 500px;
    border-radius: 30px 30px 0px 0px;
    animation: showbar 1s forwards;

    @keyframes showbar {
        100% {
            bottom: 0px;
        }
    }
`;
