import React, { LegacyRef } from 'react';
import styled from 'styled-components';
/** 2022/05/22 - Video 정보 타입 선언 - 박수범*/
interface VideoPlayerProps {
    videoUrl: string;
    videoRef: LegacyRef<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, videoRef }) => {
    return (
        <VideoContainer>
            <video src={videoUrl} controls={true} ref={videoRef} />
        </VideoContainer>
    );
};
/* 2023.05.10 Video 섹션 컨테이너 - 박수범 */
const VideoContainer = styled.div`
    margin-top: 30px;
    display: block;
    > video {
        width: 700px;
        height: 350px;
        position: relative;
        max-width: 100%;
        box-shadow: 0 8px 32px 0 rgba(113, 119, 207, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
`;

export default VideoPlayer;
