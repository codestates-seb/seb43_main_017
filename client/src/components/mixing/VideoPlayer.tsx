import React, { useRef } from 'react';
import styled from 'styled-components';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
        <VideoContainer>
            <video src={videoUrl} ref={videoRef} controls={true} />
        </VideoContainer>
    );
};

const VideoContainer = styled.div`
    margin-top: 30px;
    display: block;
    > video {
        width: 800px;
        height: 400px;
    }
`;

export default VideoPlayer;
