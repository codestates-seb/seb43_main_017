import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { soundbarOpenState } from 'src/recoil/Atoms';

function Mixing() {
    const [, setSoundbarOpen] = useRecoilState<boolean>(soundbarOpenState);

    /** 2023.05.16 사운드바 상태 변경 -김주비 */
    useEffect(() => {
        setSoundbarOpen(false);
    }, []);

    return (
        <MixingSection>
            <MixingBackground></MixingBackground>
            <MixingHeader>
                <div className="flex-center">
                    <MixingPage>
                        <span className="mixing-title">MIXING</span>
                    </MixingPage>
                    <MixingTitle>
                        <span className="mixing-subtext">현재 페이지는 준비중입니다.</span>
                    </MixingTitle>
                    <img src="./assets/Dual Ring-1s-124px.gif"></img>
                </div>
            </MixingHeader>
        </MixingSection>
    );
}

export default Mixing;

/**2023-05-05 플레이리스트 전체섹션 : 김주비*/
const MixingSection = styled.section`
    display: flex;
    flex-direction: column;
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
    flex-direction: column;
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
/**2023-05-06 슬라이드 업 되는 타이틀 애니메이션 - 타이틀 : 김주비*/
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
`;
/**2023-05-06 슬라이드 업 되는 서브텍스트 애니메이션 : 김주비*/
const MixingTitle = styled.div`
    position: relative;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
    .mixing-subtext {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        transform: translateY(20px);
        animation: movingtext 1s forwards 1s;
        opacity: 0.6;
    }
`;
