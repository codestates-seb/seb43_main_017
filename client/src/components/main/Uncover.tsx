import styled from 'styled-components';
import { BsMouse } from 'react-icons/bs';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

function Uncover() {
    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <UncoverInfo>
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
                <SideImage>
                    <Imagemoving></Imagemoving>
                </SideImage>
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
/**2023-05-06 슬라이딩되는 사이드 이미지 애니메이션 - 김주비 */
const SideImage = styled.aside`
    position: absolute;
    right: 0px;
    width: 50%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    z-index: 1;
    @media (max-width: 1300px) {
        display: none;
    }
`;
/**2023-05-06 슬라이딩되는 사이드 이미지 애니메이션 (bg) - 김주비  */
const Imagemoving = styled.div`
    width: 100%;
    height: 0%;
    background: url('./assets/Side-background.jpg');
    background-size: cover;
    opacity: 0.8;
    box-shadow: 5px 10px 20px rgb(0, 0, 0, 0.3);
    transition: 0.3s ease-in-out;
    animation: sildeSideimg 2s forwards 1s;

    @keyframes sildeSideimg {
        100% {
            height: 100%;
            border-radius: 100px 0px 100px 0px;
        }
    }
    :hover {
        transform: rotateY(-20deg);
    }
`;
/**2023-05-06 컨텐츠 그룹 - 김주비*/
const UncoverInfo = styled.div`
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
    top: 0;
    left: 0;
    width: 60%;
    min-height: 100vh;
`;
/**2023-05-06 슬라이드 업 되는 텍스트 애니메이션 - 김주비*/
const MovingText = styled.article`
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 700px;
    z-index: 3;
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
        font-family: 'Rajdhani', sans-serif;
        position: relative;
        height: 100px;
        margin-top: 30px;
        line-height: 150%;
        font-size: 14px;
        opacity: 0.6;
    }
    .content-subtext > span {
        width: 550px;
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
    @media (max-width: 700px) {
        .flex-center {
            justify-content: center;
            text-align: center;
        }
        .content-title {
            margin-top: 15px;
            height: 55px;
            font-size: 2.5rem;
        }
        .content-title > span {
            position: absolute;
            transform: translateY(55px);
        }
        .content-subtext {
            margin-top: 10px;
            height: 200px;
            font-size: 14px;
        }
        .content-subtext > span {
            width: 100%;
            transform: translateY(220px);
        }
    }
`;
/**2023-05-06 스크롤링 아이콘 애니메이션 - 김주비*/
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
