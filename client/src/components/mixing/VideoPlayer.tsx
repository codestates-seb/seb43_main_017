import ReactPlayer from 'react-player';
import styled from 'styled-components';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    return (
        <div>
            <ReactPlayer url={videoUrl} width="1200px" height="600px" controls={true} />
        </div>
    );
};
export default VideoPlayer;
