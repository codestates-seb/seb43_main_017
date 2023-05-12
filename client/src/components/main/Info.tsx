import styled from 'styled-components';

function Uncover() {
    return (
        <UncoverInfoGroup>
            <BackgroundCover></BackgroundCover>
            <UncoverInfo>
                <InfoTitle>
                    <span>UNCOVER 의</span>
                    <span>다양한 기능을 확인해보세요 </span>
                </InfoTitle>
                <Subcontents>
                    <li>
                        <div className="hover-line">
                            <div></div>
                        </div>
                        <h3>저작권없는 음원 No copyright</h3>
                        <p>
                            Uncover에서는 상업적 이용에도 문제없는 no copyright music 을 제공합니다. YouTube, 소셜
                            미디어, 라이브 스트림, 웹 사이트 및 온라인 어디에서나 공유하는 컨텐츠에 음악과 음향 효과를
                            사용하세요. Uncover 에서는 언제나 현재 원하는 음원을 기분, 날씨, 상황에 따라 태그로 검색할수
                            있습니다.
                        </p>
                        <button>more</button>
                    </li>
                    <li>
                        <div className="hover-line">
                            <div></div>
                        </div>
                        <h3>플레이 리스트 Playlist </h3>
                        <p>
                            Uncover를 이용하는 모든 유저는 자신만의 플레이리스트를 생성할수 있습니다. 플레이리스트에서
                            본인만의 무드를 저장하고 공유해주세요. 공유된 플레이 리스트들을 통해 유저들이 더욱 손 쉽게
                            관련된 음원들을 찾아볼 수 있습니다.
                        </p>
                        <button>more</button>
                    </li>
                    <li>
                        <div className="hover-line">
                            <div></div>
                        </div>
                        <h3>음원 믹싱 Mixing</h3>
                        <p>
                            사용자가 원하는 샘플 음악을 영상에 직접 믹싱해 볼 수 있습니다. 영상, 사운드 효과, 디자인을
                            위한 워크스테이션으로 작업에 완성도를 더해 보세요.
                        </p>
                        <button>more</button>
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
`;

const InfoTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -2px;
    span {
        margin: 5px 0px;
    }
`;

const Subcontents = styled.ul`
    display: flex;
    margin-top: 40px;
    .hover-line {
        width: 320px;
        height: 3px;
        background-color: #ccc;
        overflow: hidden;
    }

    .hover-line > div {
        width: 0px;
        height: 3px;
        background-color: rgba(199, 68, 68, 1);
        transition: 0.3s ease-in-out;
    }

    li:hover .hover-line > div {
        width: 320px;
    }

    li {
        width: 320px;
        padding: 30px 70px 0px 0px;
    }

    li > h3 {
        font-size: 1.2rem;
        font-weight: 700;
        margin: 20px 0px;
    }

    li > p {
        font-size: 14px;
        line-height: 150%;

        opacity: 0.6;
        letter-spacing: -1.3px;
    }

    li > button {
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
`;
