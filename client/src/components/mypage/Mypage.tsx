import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { nameState, introState } from 'src/recoil/Atoms';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LikeMusic from './LIkeMusic';
import Myplaylist from './Myplaylist';
import ModifyPlaylist from './ModifyPlaylist';
import { atom } from 'recoil';

type UserData = {
    name: string;
    intro: string;
};

type UserInfo = {
    image: string;
    name: string;
    email: string;
};

function Mypage() {
    /* 2023.05.06 유저의 name과 intro부분을 클릭했을 시 수정할 수 있는 상태관리 */
    const [name, setName] = useRecoilState(nameState);
    const [intro, setIntro] = useRecoilState(introState);
    const [editingName, setEditingName] = useState(false);
    const [editingIntro, setEditingIntro] = useState(false);

    /* 2023.05.06 사용자가 이름을 클릭했을 때 호출되는 함수 , 이름이 편집 모드로 전환  */
    const handleNameClick = () => {
        setEditingName(true);
    };

    /* 2023.05.06 사용자가 이름 입력 폼에서 포커스를 벗어났을 때 호출되는 함수 , 이름이 편집 모드에서 보기 모드로 전환  */
    const handleNameBlur = () => {
        setEditingName(false);
    };

    /* 2023.05.06 사용자가 이름 입력 폼에서 값을 변경할 때마다 호출되는 함수 , 입력 폼에 입력된 값으로 name 상태가 업데이트 */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    /* 2023.05.06 사용자가 자기소개를 클릭했을 때 호출되는 함수 , 자기소개가 편집 모드로 전환 - 홍혜란 */
    const handleIntroClick = () => {
        setEditingIntro(true);
    };

    /* 2023.05.06 사용자가 자기소개 입력 폼에서 포커스를 벗어났을 때 호출되는 함수 , 자기소개가 편집 모드에서 보기 모드로 전환  */
    const handleIntroBlur = () => {
        setEditingIntro(false);
    };

    /* 2023.05.06 사용자가 자기소개 입력 폼에서 값을 변경할 때마다 호출되는 함수 , 입력 폼에 입력된 값으로 intro 상태가 업데이트 */
    const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntro(event.target.value);
    };

    // /* 2023.05.06 수정된 이름과 자기소개 데이터를 서버에 저장 */
    // useEffect(() => {
    //     return () => {
    //         const userData: UserData = { name, intro };
    //         axios.patch('members/{member-id}', userData);
    //     };
    // }, [name, intro]);

    // /* 2023.05.16 마이페이지 유저 정보 상태관리 - 홍혜란 */
    // const userInfoState = atom<UserInfo | null>({
    //     key: 'userInfoState',
    //     default: null,
    // });

    // /* 2023.05.16 로그인 했을 시 유저 정보 데이터 불러오기 - 홍혜란 */
    // const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userInfoState);

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const response = await fetch(
    //                 'http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/{member-id}',
    //             );
    //             const userData = await response.json();
    //             setUserInfo(userData);
    //         } catch (error) {
    //             console.error('Failed to fetch user information:', error);
    //         }
    //     };

    //     fetchUserInfo();
    // }, [setUserInfo]);

    return (
        <div>
            <BackgroundCover></BackgroundCover>
            <MypageContainer>
                <MypageListContainer>
                    <UserProfile>
                        {/* {userInfo ? ( */}
                        <>
                            <div className="user-profile">
                                <img src="./assets/ditto.png" alt="userimg" />
                            </div>
                            <UserContainer>
                                {/* 사용자의 이름 출력 및 수정 */}
                                <div className="user-name-container">
                                    {editingName ? (
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={handleNameChange}
                                            onBlur={handleNameBlur}
                                        />
                                    ) : (
                                        <div className="user-name" onClick={handleNameClick} contentEditable>
                                            {name}
                                        </div>
                                    )}
                                </div>
                                <div className="user-email">undefinded@naver.com</div>
                                {/* 사용자의 자기소개 출력 및 수정 */}
                                <div className="user-coment-container">
                                    {editingIntro ? (
                                        <input
                                            type="text"
                                            value={intro}
                                            onChange={handleIntroChange}
                                            onBlur={handleIntroBlur}
                                        />
                                    ) : (
                                        <div className="user-coment" onClick={handleIntroClick} contentEditable>
                                            {intro}
                                        </div>
                                    )}
                                </div>
                            </UserContainer>
                        </>
                        {/* ) : (
                            <p>Loading user information...</p>
                        )} */}
                    </UserProfile>

                    <MusicInfor>
                        <LeftContainer>
                            <LikeMusic /> {/* like music 파일 */}
                            <Myplaylist /> {/* my playlist 파일 */}
                        </LeftContainer>

                        <RightContainer>
                            <ModifyPlaylist />
                        </RightContainer>
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

const UserProfile = styled.div`
    display: flex;
    padding: 20px;

    .user-profile {
        img {
            width: 175px;
            height: 175px;
            border-radius: 50%;
        }
    }
    @media screen and (max-width: 1000px) {
        margin-left: 0;
        margin-top: 700px;
        width: 400px;
    }
`;

/* 2023.05.06 유저의 이름 / 이메일 / 자기소개 컴포넌트 구현 -홍혜란 */
const UserContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;

    .user-name-container {
        input {
            font-size: 30px;
            color: hsl(0, 0%, 100%);
            font-weight: bold;
            width: 300px;
            height: 50px;
            background-color: black;
            border: none;
            margin: 10px 0px 10px 25px;
        }

        .user-name {
            font-size: 30px;
            font-weight: bold;
            color: hsl(0, 0%, 100%);
            margin: 10px 0px 10px 25px;
        }
    }

    .user-email {
        font-size: 16px;
        color: hsl(0, 0%, 100%);
        margin: 10px 0px 15px 25px;
    }

    .user-coment-container {
        input {
            font-size: 15px;
            color: hsl(0, 0%, 100%);
            width: 250px;
            height: 20px;
            background-color: black;
            border: none;
            margin: 10px 0px 10px 25px;
        }

        .user-coment {
            font-size: 15px;
            color: hsl(0, 0%, 100%);
            margin: 10px 0px 10px 25px;
        }
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
