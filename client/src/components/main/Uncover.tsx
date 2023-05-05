import styled from 'styled-components';

function Uncover() {
    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <UncoverInfo>
                <div className="text-center">
                    <img src="/assets/logo_icon_001.png" alt="logo image" />
                    <span className="content-title">UNCOVER</span>
                    <span className="content-subtext">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don't look even slightly
                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                        anything embarrassing hidden in the middle of text.
                    </span>
                </div>
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

const UncoverInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;

    img {
        width: 200px;
    }
    title {
    }
    .text-center {
        text-align: center;
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .content-title {
        font-family: 'Monoton', cursive;
        margin-top: 20px;
        font-size: 4rem;
    }
    .content-subtext {
        margin-top: 30px;
        line-height: 150%;
        font-size: 14px;
        opacity: 0.6;
    }
`;
