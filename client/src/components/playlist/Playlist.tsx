import styled from 'styled-components';

function Playlist() {
    return (
        <PlaylistSection>
            <PlaylistBackground></PlaylistBackground>
            <PlaylistTitle>
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
            </PlaylistTitle>
        </PlaylistSection>
    );
}

export default Playlist;

const PlaylistSection = styled.section`
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    overflow: hidden;
`;

const PlaylistBackground = styled.article`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/background-playlist.jpg');
    filter: blur(5px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 20s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.2);
        }
    }
`;

const PlaylistTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    z-index: 2;
    > div {
        margin: 20px;
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
/** 타이틀 애니메이션 */
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
/** 서브텍스트 애니메이션 */
const Plsubtext = styled.div`
    position: relative;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
    .pl-subtext {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        transform: translateY(20px);
        animation: movingtext 1s forwards 1.5s;
        opacity: 0.6;
    }
`;
/** 서칭바 애니메이션 */
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
            border: 1px solid #b1b1b1;
            color: #dddddd;
            outline: none;
            border-radius: 30px;
        }
    }
`;
