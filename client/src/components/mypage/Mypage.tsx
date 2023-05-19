import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { nameState } from 'src/recoil/Atoms';
import React, { useEffect, useState } from 'react';
import LikeMusic from './LIkeMusic';
import Myplaylist from './Myplaylist';
import ModifyPlaylist from './ModifyPlaylist';

type UserData = {
    memberId: number;
    name: string;
    email: string;
};

function Mypage() {
    /* 2023.05.06 유저의 name과 intro부분을 클릭했을 시 수정할 수 있는 상태관리 */
    const [username, setUserName] = useRecoilState(nameState);
    const [editingName, setEditingName] = useState(false);

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
        setUserName(event.target.value);
    };

    // /* 2023.05.06 수정된 이름과 자기소개 데이터를 서버에 저장 */
    // useEffect(() => {
    //     return () => {
    //         const userData: UserData = { name };
    //         axios.patch('members/{member-id}', userData);
    //     };
    // }, [name, intro]);

    const [token, setToken] = useState<string | null>('');
    const [userImg, setUserImg] = useState<string | null>('');
    const [name, setName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');

    useEffect(() => {
        const storedToken = window.localStorage.getItem('access_token');
        const storedUserImg = window.localStorage.getItem('userimg');
        const storedName = window.localStorage.getItem('name');
        const storedEmail = window.localStorage.getItem('email');

        setToken(storedToken);
        setUserImg(storedUserImg);
        setName(storedName);
        setEmail(storedEmail);
    }, []);

    return (
        <div>
            <BackgroundCover></BackgroundCover>
            <MypageContainer>
                <MypageListContainer>
                    <UserProfile>
                        {token ? (
                            <div>
                                <div className="user-profile">
                                    <img src={userImg ?? undefined} alt={name ?? undefined} />
                                </div>
                                <UserContainer>
                                    {/* 사용자의 이름 출력 및 수정 */}
                                    <div className="user-name-container">
                                        {editingName ? (
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={handleNameChange}
                                                onBlur={handleNameBlur}
                                            />
                                        ) : (
                                            <div className="user-name" onClick={handleNameClick} contentEditable>
                                                {name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user-email">{email}</div>
                                </UserContainer>
                            </div>
                        ) : (
                            <div>No user data available</div>
                        )}
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

/* 2023.05.06 유저 프로필사진 컴포넌트 - 홍헤란 */
const UserProfile = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 100px;

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
        margin-left: 0;
        margin-top: 700px;
        width: 400px;
    }
`;

/* 2023.05.06 유저의 이름 / 이메일 컴포넌트 구현 - 홍혜란 */
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
