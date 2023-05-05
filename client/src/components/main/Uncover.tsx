import styled from 'styled-components';
import { BsMouse } from 'react-icons/bs';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

function Uncover() {
    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <UncoverInfo>
                <SideImage>
                    <Imagemoving></Imagemoving>
                </SideImage>
                <MovingText>
                    <div className="content-logo flex-center">
                        <img src="/assets/logo_icon_001.png" alt="logo image" />
                    </div>
                    <div className="content-title flex-center">
                        <span>UNCOVER</span>
                    </div>
                    <div className="content-subtext flex-center">
                        <span>
                            Best free music sharing platform for you. Find healing while listening to music. There is
                            also a playlist page that you can enjoy with other users and a video mixing page that will
                            add vitality to your video. You just want to listen to the song? If so, please go directly
                            to the music search page.
                        </span>
                    </div>
                </MovingText>
                <MovingScroll>
                    <div className="scroll-icon">
                        <BsMouse className="mouse-icon" />
                        <MdKeyboardDoubleArrowDown className="arrow-icon" />
                    </div>
                </MovingScroll>
            </UncoverInfo>
        </UncoverInfoGroup>
    );
}

export default Uncover;

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
/**자동적으로 Scale 되는 백그라운드 구현 */
const BackgroundCover = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/background-img03.jpg');
    filter: blur(5px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 30s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.3);
        }
    }
`;
const SideImage = styled.aside`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30%;
    height: 100vh;
    @media (max-width: 1300px) {
        display: none;
    }
`;
const Imagemoving = styled.div`
    width: 100%;
    height: 0vh;
    animation: sildeSideimg 2s forwards 1s;
    background: url('./assets/Side-background.jpg');
    background-size: cover;
    opacity: 0.8;
    @keyframes sildeSideimg {
        100% {
            height: 100%;
        }
    }
`;
/**중앙 정렬 전체섹션 */
const UncoverInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 60%;
    min-height: 100vh;
`;
/**모션 텍스트 */
const MovingText = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    > div {
        width: 100%;
        overflow: hidden;
    }
    .flex-center {
        display: flex;
        justify-content: left;
        align-items: center;
    }

    // 로고 이미지
    .content-logo {
        position: relative;
        height: 120px;
    }
    .content-logo > img {
        width: 200px;
        position: absolute;
        transform: translateY(120px);
        animation: movetitle 1.5s forwards 0s;
        opacity: 0.7;
    }

    // 메인타이틀
    .content-title {
        position: relative;
        height: 70px;
        font-family: 'Monoton', cursive;
        margin-top: 30px;
        font-size: 4.5rem;
    }
    .content-title > span {
        position: absolute;
        transform: translateY(100px);
        animation: movetitle 1.5s forwards 0.5s;
    }

    // 서브 텍스트
    .content-subtext {
        font-family: 'Bruno Ace SC', cursive;
        position: relative;
        height: 120px;
        margin-top: 30px;
        line-height: 150%;
        font-size: 14px;
        opacity: 0.6;
    }
    .content-subtext > span {
        width: 600px;
        position: absolute;
        letter-spacing: 1px;
        transform: translateY(120px);
        animation: movetitle 1.5s forwards 1s;
    }
    @keyframes movetitle {
        100% {
            transform: translateY(0px);
        }
    }

    @media (max-width: 1000px) {
        // 로고 이미지
        .content-logo {
            height: 100px;
        }
        .content-logo > img {
            width: 150px;
            transform: translateY(100px);
        }

        // 메인타이틀
        .content-title {
            height: 55px;
            font-size: 3.5rem;
        }
        .content-title > span {
            transform: translateY(55px);
        }

        // 서브 텍스트
        .content-subtext {
            height: 140px;
            font-size: 14px;
        }
        .content-subtext > span {
            width: 100%;
            transform: translateY(140px);
        }
    }
    @media (max-width: 650px) {
        .content-subtext {
            height: 200px;
            font-size: 14px;
        }
        .content-subtext > span {
            width: 100%;
            transform: translateY(200px);
        }
        .content-title {
            height: 55px;
            font-size: 2.5rem;
        }
        .content-title > span {
            position: absolute;
            transform: translateY(55px);
        }
    }
`;
/**스크롤 아이콘 모션*/
const MovingScroll = styled.article`
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0px;
    width: 100%;
    height: 120px;
    font-size: 3rem;
    .scroll-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .mouse-icon {
        transform: translateY(-20px);
        opacity: 0;
        font-size: 2.5rem;
        animation: Movingscroll 2s infinite 2s;
    }
    .arrow-icon {
        margin-top: 5px;
        font-size: 1.5rem;
        color: #666;
        opacity: 0;
        animation: Fadeinicon 2s forwards 2s;
    }
    @keyframes Movingscroll {
        50% {
            transform: translateY(0px);
            opacity: 1;
        }
    }
    @keyframes Fadeinicon {
        100% {
            opacity: 1;
        }
    }
`;
