import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectIndexState } from 'src/recoil/Atoms';
import styled from 'styled-components';

function Uncover() {
    const [, setSelectIndex] = useRecoilState<number>(selectIndexState);
    const navigate = useNavigate();

    const HandleNavigate = (url: string, index: number) => {
        navigate(url);
        setSelectIndex(index);
    };

    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <UncoverInfo>
                <InfoTitle>
                    <span>What's</span>
                    <span>Uncover</span>
                    <span>all about?</span>
                </InfoTitle>
                <Subcontents>
                    <li>
                        <div className="hover-line">
                            <span></span>
                        </div>
                        <h3 className="sub-title">01 No copyright Music</h3>
                        <p className="sub-text">
                            Uncover provides free music for commercial use. Music and sound effects are available for
                            YouTube, social media, live streams, websites, and content you share anywhere online! Search
                            for the music you want through various tags.
                        </p>
                        <button
                            className="sub-button"
                            onClick={() => {
                                HandleNavigate('/musiclist', 1);
                            }}
                        >
                            more
                        </button>
                    </li>
                    <li>
                        <div className="hover-line">
                            <span></span>
                        </div>
                        <h3 className="sub-title">02 Playlist </h3>
                        <p className="sub-text">
                            Anyone who uses Uncover can create their own playlist. Please save and share your own mood
                            on the playlist. The shared playlists make it easier for users to find related music
                            sources.
                        </p>
                        <button
                            className="sub-button"
                            onClick={() => {
                                HandleNavigate('/playlist', 2);
                            }}
                        >
                            more
                        </button>
                    </li>
                    <li>
                        <div className="hover-line">
                            <span></span>
                        </div>
                        <h3 className="sub-title">03 Fitting Room</h3>
                        <p className="sub-text">
                            You can mix the sample music you want directly into the video. Add completeness to your work
                            with a workstation for video, sound effects and design.
                        </p>
                        <button
                            className="sub-button"
                            onClick={() => {
                                HandleNavigate('/fittingroom', 3);
                            }}
                        >
                            more
                        </button>
                    </li>
                </Subcontents>
            </UncoverInfo>
        </UncoverInfoGroup>
    );
}

export default Uncover;

/**2023-05-06 전체섹션 - 김주비*/
const UncoverInfoGroup = styled.section`
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    overflow: hidden;
`;
/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 - 김주비 */
const BackgroundCover = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/background-img00.jpg');
    filter: blur(5px);
    background-size: cover;
    opacity: 0.3;
    animation: bgScale1 30s infinite;
    @keyframes bgScale1 {
        50% {
            transform: scale(1.3);
        }
    }
`;

/**2023-05-06 컨텐츠 그룹 - 김주비*/
const UncoverInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    width: 60%;
    min-height: 100vh;
    z-index: 2;
`;

const InfoTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 4rem;
    letter-spacing: -2px;
    font-family: 'Monoton', cursive;
    span {
        margin: 5px 0px;
    }
    @media (max-width: 1200px) {
        font-size: 2rem;
        letter-spacing: 0px;
        span {
            margin-right: 10px;
        }
    }
    @media (max-width: 500px) {
        font-size: 1.5rem;
    }
`;

const Subcontents = styled.ul`
    display: flex;
    margin-top: 40px;

    li {
        /* border: 1px solid red; */
        width: 100%;
        padding: 30px 30px 0px 0px;
    }
    .hover-line {
        position: relative;
        /* width: 320px; */
        height: 2px;
        background-color: #ccc;
        opacity: 0.6;
        overflow: hidden;
    }

    .hover-line > span {
        position: absolute;
        width: 0%;
        height: 3px;
        background-color: rgba(199, 68, 68, 1);
        transition: 0.3s ease-in-out;
    }

    li:hover .hover-line > span {
        width: 100%;
    }

    .sub-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        margin: 40px 0px 20px 0px;
        letter-spacing: 2px;
    }
    .sub-text {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        line-height: 150%;
        word-break: break-all;
        opacity: 0.6;
    }
    .sub-button {
        font-family: 'Rajdhani', sans-serif;
        margin: 30px 0px;
        padding: 5px 20px;
        background: rgba(199, 68, 68, 1);
        border: none;
        color: #ccc;
        border-radius: 20px;
        transition: 0.3s ease-in-out;
    }

    li > button:hover {
        background: #e96565;
    }

    @media (max-width: 1200px) {
        flex-direction: column;

        li {
            padding: 0px;
        }
        .sub-title {
            margin: 20px 0px 20px 0px;
        }
        .sub-button {
            margin: 20px 0px;
            padding: 3px 10px;
        }
    }

    @media (max-width: 500px) {
        .sub-title {
            font-size: 1rem;
        }
    }
`;
