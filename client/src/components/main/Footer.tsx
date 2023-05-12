import styled from 'styled-components';

function Footer() {
    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <UncoverInfo>
                <div className="tilte-text">
                    <div className="up-text">
                        <span className="ani-1">Thank</span>
                    </div>
                    <div className="up-text">
                        <span className="ani-2">you!</span>
                    </div>
                </div>
                <span className="sub-text">
                    Did you like our work?
                    <span>
                        <a href="https://github.com/codestates-seb/seb43_main_017">Git hub</a>
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
        margin: 30px;
    }

    .tilte-text {
        font-family: 'Monoton', cursive;
        font-size: 10rem;
    }
    .sub-text {
        font-family: 'Rajdhani', sans-serif;
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
        width: 100%;
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
`;
