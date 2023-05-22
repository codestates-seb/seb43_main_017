import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { playlistViewerState } from 'src/recoil/Atoms';
import { MdTransitEnterexit } from 'react-icons/md';

const PlaylistViewer = () => {
    const [, setOpenviewer] = useRecoilState<boolean>(playlistViewerState);
    return (
        <ViewerGroup>
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
    .X-box {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 60px;
        height: 60px;
        font-size: 2rem;
        border: 2px solid #ccc;
        transition: 0.2s ease-in-out;
    }
    .X-box:hover {
        color: #ff6060;
        border-color: #ff6060;
    }
`;
