import styled from 'styled-components';
import LikeMusic from './LIkeMusic';
import Myplaylist from './Myplaylist';
import ModifyPlaylist from './ModifyPlaylist';
import { modifyDataState, playListModalState } from 'src/recoil/Atoms';
import { useRecoilState } from 'recoil';
import AddMyplaylist from './AddMyplaylist';
import { ImCross } from 'react-icons/im';

function Mypage() {
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const userimg: string | undefined = window.localStorage.getItem('userimg') || undefined;
    const usernickname: string | undefined = window.localStorage.getItem('usernickname') || undefined;
    const useremail: string | undefined = window.localStorage.getItem('useremail') || undefined;
    const [openPlayList, setOpenPlayList] = useRecoilState<boolean>(playListModalState);
    const [modifyPlaylistState, _] = useRecoilState(modifyDataState);

    return (
        <div>
            <BackgroundCover></BackgroundCover>
            {openPlayList && (
                <PlaylistContainer>
                    <PlaylistModal>
                        <AddMyplaylist />
                        <Exitbox onClick={() => setOpenPlayList(false)}>
                            <ImCross />
                        </Exitbox>
                    </PlaylistModal>
                </PlaylistContainer>
            )}
            <MypageContainer>
                <MypageListContainer>
                    <UserProfile>
                        {token ? (
                            <div>
                                <div className="user-profile">
                                    {userimg ? (
                                        <img src={userimg} alt={usernickname} />
                                    ) : (
                                        <img src="./assets/profile-icon.png" alt="userImg" />
                                    )}
                                </div>

                                <UserContainer>
                                    <div className="user-name">{usernickname}</div>
                                    <div className="user-email">{useremail}</div>
                                </UserContainer>
                            </div>
                        ) : (
                            <div>
                                <div className="user-profile">
                                    <img src="./assets/profile-icon.png" alt="userImg" />
                                </div>
                                <UserContainer>
                                    <div className="user-name">Undefined</div>
                                    <div className="user-email">undefined@naver.com</div>
                                </UserContainer>
                            </div>
                        )}
                    </UserProfile>

                    <MusicInfor>
                        <LeftContainer>
                            <LikeMusic /> {/* like music 파일 */}
                            <Myplaylist /> {/* my playlist 파일 */}
                        </LeftContainer>

                        <RightContainer>{modifyPlaylistState && <ModifyPlaylist />}</RightContainer>
                    </MusicInfor>
                </MypageListContainer>
            </MypageContainer>
        </div>
    );
}

export default Mypage;

const MypageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
`;

/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 - 김주비 */
const BackgroundCover = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/mypage.png');
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

const MypageListContainer = styled.div`
    align-items: center;
    z-index: 2;
`;

/* 2023.05.06 유저 프로필사진 컴포넌트 - 홍헤란 */
const UserProfile = styled.div`
    display: flex;
    align-items: flex-start;

    div {
        display: flex;
    }

    .user-profile {
        img {
            width: 175px;
            height: 175px;
            border-radius: 50%;
            border: 3px solid linear-gradient(to right, #ff00bf, blue) 1;
        }
    }
    @media screen and (max-width: 1000px) {
        margin-left: 30px;
        margin-top: 600px;
        width: 400px;
    }
`;

/* 2023.05.06 유저의 이름 / 이메일 컴포넌트 구현 - 홍혜란 */
const UserContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    .user-name {
        font-size: 30px;
        font-weight: bold;
        color: hsl(0, 0%, 100%);
        margin: 10px 0px 10px 25px;
    }

    .user-email {
        font-size: 16px;
        color: hsl(0, 0%, 100%);
        margin: 10px 0px 15px 25px;
    }

    @media screen and (max-width: 1000px) {
        margin-left: 0;
        margin-top: 20px;
    }
`;

const MusicInfor = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const LeftContainer = styled.div`
    width: 500px;
    height: 600px;
`;

const RightContainer = styled.div`
    width: 500px;
    height: 600px;
`;

/**2023/05/23 - 플레이리스트 음원 추가 컨테이너 - 박수범 */
const PlaylistContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    background: rgba(245, 223, 223, 0.25);
    justify-content: center;
    align-items: center;
`;
/**2023/05/23 - 플레이리스트 음원추가 모달창 - 박수범 */
const PlaylistModal = styled.div`
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 600px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    @media (max-width: 700px) {
        width: 400px;
        height: 560px;
    }
    background: rgba(12, 11, 11, 0.55);
    > button {
        cursor: pointer;
        z-index: 3;
    }
`;
const Exitbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    left: 0px;
    width: 30px;
    height: 30px;
    font-size: 10px;
    border-radius: 100px;
    color: rgba(199, 68, 68, 1);
    text-align: center;
    border: 2px solid rgba(199, 68, 68, 1);
    cursor: pointer;
    @media (max-width: 700px) {
        width: 30px;
        height: 20px;
        font-size: 8px;
        margin-top: 30px;
    }
    z-index: 3;
    :hover {
        color: #ccc;
        border-color: #ccc;
    }
`;
