import styled from 'styled-components';

function Playlist() {
    return (
        <PlaylistSection>
            <PlaylistBackground></PlaylistBackground>
            <PlaylistHeader>
                <div className="flex-center">
                    <Pltitle>
                        <span className="pl-title">PLAYLIST</span>
                    </Pltitle>
                    <Plsubtext>
                        <span className="pl-subtext">Enjoy the various playlists of users</span>
                    </Plsubtext>
                </div>
                <div className="flex-center">
                    <Plsearch placeholder="태그를 검색해주세요" />
                </div>
            </PlaylistHeader>
            <PlaylistContents>
                <Plcard>
                    <Plcover></Plcover>
                    <div className="pl-treck">TRECK 10</div>
                    <div className="pl-contents">
                        <Pltag>
                            <li>차분한</li>
                            <li>피아노</li>
                            <li>힐링</li>
                        </Pltag>
                        <Pluser>
                            <span>WTITER</span>
                            <span>Uncover</span>
                            <span>LIKE</span>
                            <span>2087</span>
                        </Pluser>
                        <Pltext>
                            <span>PLAY LIST: 숲속느낌 BGM</span>
                            <span>
                                내 플레이 리스트를 봐 대박임. 지금까지 이런 플레이 리스트는 없었다. 플레이 리스트의 명가
                                uncover 를 사용하세요.
                            </span>
                        </Pltext>
                    </div>
                </Plcard>
            </PlaylistContents>
        </PlaylistSection>
    );
}

export default Playlist;

/**2023-05-05 플레이리스트 전체섹션 : 김주비*/
const PlaylistSection = styled.section`
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
const PlaylistBackground = styled.article`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/background-playlist.jpg');
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
const PlaylistHeader = styled.article`
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
const Pltitle = styled.div`
    position: relative;
    height: 70px;
    overflow: hidden;
    .pl-title {
        font-family: 'Monoton', cursive;
        font-size: 4rem;
        transform: translateY(70px);
        animation: movingtext 1s forwards 0.5s;
    }
`;
/**2023-05-06 슬라이드 업 되는 서브텍스트 애니메이션 : 김주비*/
const Plsubtext = styled.div`
    position: relative;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
    .pl-subtext {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        transform: translateY(20px);
        animation: movingtext 1s forwards 1s;
        opacity: 0.6;
    }
`;
/**2023-05-06 펼쳐지는 서치바 애니메이션 : 김주비*/
const Plsearch = styled.input`
    border-radius: 30px;
    width: 0%;
    background: rgb(255, 255, 255, 0.2);
    animation: showinput 1s forwards 2s;
    opacity: 0;

    ::placeholder {
        color: #969696;
        font-family: 'Rajdhani', sans-serif;
    }
    @keyframes showinput {
        100% {
            opacity: 1;
            width: 100%;
            padding: 10px 30px;
            border: 2px solid #b1b1b1;
            color: #dddddd;
            outline: none;
            border-radius: 30px;
        }
    }
`;
/**2023-05-06 플레이리스트 슬라이드 섹션 : 김주비 */
const PlaylistContents = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
    margin-top: 20px;
    opacity: 0;
    animation: opacity 2s forwards 3s;
    @keyframes opacity {
        100% {
            opacity: 1;
        }
    }
`;

/**2023-05-06 플리 슬라이드 카드 섹션 : 김주비 */
const Plcard = styled.div`
    position: relative;
    width: 500px;
    height: 350px;
    border-radius: 20px;
    background-color: #000;
    background-size: cover;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    color: #ddd;
    overflow: hidden;
    .pl-treck {
        position: absolute;
        top: 30px;
        right: 30px;
        font-weight: 600;
    }
    .pl-contents {
        position: absolute;
        bottom: 30px;
        left: 30px;
    }
`;
/**2023-05-06 슬라이드 커버배경 : 김주비 */
const Plcover = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('/assets/background-playlist.jpg');
    background-size: cover;
    opacity: 0.65;
`;
/**2023-05-06 슬라이드 태그 : 김주비 */
const Pltag = styled.ul`
    display: flex;
    li {
        border: 2px solid #ccc;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
    }
`;
/**2023-05-06 슬라이드 유저정보 : 김주비 */
const Pluser = styled.div`
    margin-top: 20px;
    font-size: 0.8rem;
    > span {
        margin-right: 15px;
    }
    span:nth-child(2n + 1) {
        font-weight: 800;
    }
`;
/**2023-05-06 슬라이드 텍스트 : 김주비 */
const Pltext = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    > span {
        margin-top: 10px;
    }
    span:nth-child(1) {
        color: #fff;
        letter-spacing: -0.5px;
        font-size: 2rem;
        font-weight: 600;
    }
    span:nth-child(2) {
        margin-top: 20px;
        line-height: 120%;
        opacity: 0.8;
        width: 80%;
        font-size: 0.7rem;
    }
`;
