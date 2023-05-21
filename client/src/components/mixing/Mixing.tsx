import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { soundbarOpenState, videouploadState } from 'src/recoil/Atoms';
import VideoUploader from './VideoUpdate';
import LikedList from './LikedList';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaVideoSlash } from 'react-icons/fa';

function Mixing() {
    const setSoundbarOpen = useSetRecoilState<boolean>(soundbarOpenState);
    const setVideoUploader = useSetRecoilState<boolean>(videouploadState);
    let audioVolume = 0.5;
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleVideoPlay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (audioRef.current && videoRef.current) {
            audioRef.current.play();
            videoRef.current.play();
        }
    };

    const handleVideoPause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (audioRef.current && videoRef.current) {
            audioRef.current.pause();
            videoRef.current.pause();
        }
    };

    const handleAudioVolumeUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (audioRef.current && audioVolume < 0.9) {
            audioVolume += 0.1;
            audioRef.current.volume = audioVolume;
        } else if (audioVolume === 0.9) {
            return alert('볼륨을 더이상 키울 수 없습니다.');
        }
    };

    const handleAudioVolumeDawn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (audioRef.current && audioVolume > 0.1) {
            audioVolume -= 0.1;
            audioRef.current.volume = audioVolume;
        } else if (audioVolume === 0.1) {
            return alert('볼륨을 더이상 줄일 수 없습니다.');
        }
    };

    const changeVideo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setVideoUploader(false);
    };

    /** 2023.05.16 사운드바 상태 변경 -김주비 */
    useEffect(() => {
        setSoundbarOpen(false);
    }, []);

    return (
        <MixingSection>
            <MixingBackground></MixingBackground>
            <MixingHeader>
                <Musiclist>
                    <LikedList audioRef={audioRef} />
                </Musiclist>
                <div className="flex-center">
                    <MixingPage>
                        <span className="mixing-title">FITTING &nbsp; ROOM</span>
                    </MixingPage>
                    <Mixingtext>
                        <p className="mixing-text">Directly compare whether the sound source suits your video.</p>
                    </Mixingtext>
                    <VideoUploader videoRef={videoRef} />
                    <VideoBtnbar>
                        <VideoBtn onClick={handleVideoPlay}>
                            <FaPlay />
                        </VideoBtn>
                        <VideoBtn onClick={handleVideoPause}>
                            <FaPause />
                        </VideoBtn>
                        <VideoBtn onClick={handleAudioVolumeUp}>
                            <FaVolumeUp />
                        </VideoBtn>
                        <VideoBtn onClick={handleAudioVolumeDawn}>
                            <FaVolumeDown />
                        </VideoBtn>
                        <VideoBtn onClick={changeVideo}>
                            <FaVideoSlash />
                        </VideoBtn>
                    </VideoBtnbar>
                </div>
            </MixingHeader>
        </MixingSection>
    );
}

export default Mixing;

/**2023-05-05 플레이리스트 전체섹션 : 김주비*/
const MixingSection = styled.section`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    overflow: hidden;
`;
/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 : 김주비 */
const MixingBackground = styled.article`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/background-mixing.jpg');
    filter: blur(10px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 20s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.2);
        }
    }
`;
/**2023-05-06 플레이리스트 상단 섹션 : 김주비 */
const MixingHeader = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60%;
    z-index: 2;
    > div {
        margin: 10px;
    }
    .flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .flex-center > * {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    @keyframes movingtext {
        100% {
            transform: translateY(0px);
        }
    }
`;

/**2023-05-18 슬라이드 업 되는 타이틀 애니메이션 - 박수범*/
const MixingPage = styled.div`
    position: relative;
    height: 70px;
    overflow: hidden;
    .mixing-title {
        font-family: 'Monoton', cursive;
        font-size: 4rem;
        transform: translateY(70px);
        animation: movingtext 1s forwards 0.5s;
    }
    @media (max-width: 700px) {
        height: 50px;
        .pl-title {
            font-size: 2.5rem;
        }
    }
`;

/**2023-05-06 슬라이드 업 되는 서브텍스트 애니메이션 - 박수범*/
const Mixingtext = styled.div`
    position: relative;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
    .mixing-text {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        transform: translateY(20px);
        animation: movingtext 1s forwards 1s;
        opacity: 0.6;
    }
`;

/**2023-05-06 슬라이드 업 되는 서브텍스트 애니메이션 - 박수범*/
const Musiclist = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 100px;
    text-align: center;
    top: 0;
    min-height: 100vh;
    background: rgba(63, 59, 59, 0.25);
    box-shadow: 0 8px 32px 0 rgba(113, 119, 207, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
`;
const VideoBtnbar = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    width: 700px;
    height: 80px;
    box-shadow: 0 8px 32px 0 rgba(113, 119, 207, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
`;
const VideoBtn = styled.button`
    outline: none;
    border: none;
    background: none;
    margin: 5px 10px;
    font-size: 35px;
    color: #eaf2f9;
    cursor: pointer;
    &:hover {
        color: #acd2f3;
    }
`;
