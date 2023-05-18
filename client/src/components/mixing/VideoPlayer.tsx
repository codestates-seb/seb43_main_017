import ReactPlayer from 'react-player';
import styled from 'styled-components';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    return (
        <VideoContainer>
            <ReactPlayer url={videoUrl} width="800px" height="400px" controls={true} />
        </VideoContainer>
    );
};

const VideoContainer = styled.div`
    margin-top: 30px;
    display: block;
`;

export default VideoPlayer;
