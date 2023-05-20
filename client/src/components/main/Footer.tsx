import styled from 'styled-components';

function Footer() {
    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <SideBgimg></SideBgimg>
            <UncoverInfo>
                <div className="tilte-text">
                    <div className="up-text">
                        <span className="ani-1 ctg_title">Thank</span>
                    </div>
                    <div className="up-text">
                        <span className="ani-2 ctg_title">you!</span>
                    </div>
                </div>
                <span className="sub-text color-gray">©2023 Team Undefined. All Rights Reserved.</span>
                <span className="sub-text">
                    Do you like our service?
                    <span>
                        <a href="https://github.com/codestates-seb/seb43_main_017">GitHub</a>
                    </span>
                </span>
            </UncoverInfo>
        </UncoverInfoGroup>
    );
}

export default Footer;

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
    filter: blur(5px);
    background-size: cover;
    opacity: 0.3;
    background-color: rgb(10, 10, 10);
    /* background: url('./assets/background-img00.jpg'); */
    animation: bgScale 30s infinite;
    @keyframes bgScale {
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

    > * {
        margin: 10px;
    }

    .tilte-text {
        font-family: 'Monoton', cursive;
        font-size: 10rem;
    }
    .sub-text {
        opacity: 0;
        font-family: 'Rajdhani', sans-serif;
        animation: opacitytext 2s forwards 2.5s;
    }
    .color-gray {
        color: #505050;
    }
    a {
        color: #505050;
        margin-left: 10px;
    }

    .up-text {
        position: relative;
        width: 100%;
        height: 150px;
        overflow: hidden;
    }

    .up-text > span {
        position: absolute;
        transform: translateY(150px);
        height: 150px;
        /* color: #999; */
        width: 100%;
    }

    .ctg_title {
        color: #fff;
        background: linear-gradient(-45deg, #e9cf78 30%, #d85454, #8860bb); // 백그라운드 그라데이션 색상지정
        color: transparent; // 폰트 컬러를 투명화로 변경
        background-clip: text; // 백그라운드 범위를 텍스트에만 클립하는 속성.
        -webkit-background-clip: text;
    }

    .ani-1 {
        animation: movingtext 1s forwards 1.5s;
    }

    .ani-2 {
        animation: movingtext 1s forwards 2s;
    }

    @keyframes movingtext {
        100% {
            transform: translateY(0px);
        }
    }
    @keyframes opacitytext {
        100% {
            opacity: 1;
        }
    }
    @media (max-width: 1200px) {
        .tilte-text {
            font-size: 8rem;
        }
        .up-text {
            height: 120px;
        }

        .up-text > span {
            transform: translateY(120px);
            height: 120px;
        }
    }
    @media (max-width: 700px) {
        .tilte-text {
            width: 100%;
            font-size: 4rem;
        }
        .up-text {
            height: 70px;
        }

        .up-text > span {
            transform: translateY(70px);
            height: 70px;
        }
    }
`;

const SideBgimg = styled.div`
    position: absolute;
    right: 0px;
    width: 30%;
    height: 0vh;
    background: url('./assets/Side-background02.jpg');
    background-size: cover;
    animation: showsidebg 2s forwards 2s;
    opacity: 0.5;

    @keyframes showsidebg {
        100% {
            height: 100vh;
        }
    }

    @media (max-width: 1000px) {
        display: none;
    }
`;
