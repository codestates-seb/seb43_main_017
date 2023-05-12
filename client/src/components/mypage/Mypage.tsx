import styled from 'styled-components';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { nameState, introState } from 'src/recoil/Atoms';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LikeMusic from './LIkeMusic';
import Myplaylist from './Myplaylist';

type UserData = {
    name: string;
    intro: string;
};

function Mypage() {
    /* 2023.05.06 유저의 name과 intro부분을 클릭했을 시 수정할 수 있는 상태관리 - 홍혜란 */
    const [name, setName] = useRecoilState(nameState);
    const [intro, setIntro] = useRecoilState(introState);
    const [editingName, setEditingName] = useState(false);
    const [editingIntro, setEditingIntro] = useState(false);

    /* 2023.05.06 사용자가 이름을 클릭했을 때 호출되는 함수 , 이름이 편집 모드로 전환 - 홍혜란 */
    const handleNameClick = () => {
        setEditingName(true);
    };

    /* 2023.05.06 사용자가 이름 입력 폼에서 포커스를 벗어났을 때 호출되는 함수 , 이름이 편집 모드에서 보기 모드로 전환 - 홍혜란 */
    const handleNameBlur = () => {
        setEditingName(false);
    };

    /* 2023.05.06 사용자가 이름 입력 폼에서 값을 변경할 때마다 호출되는 함수 , 입력 폼에 입력된 값으로 name 상태가 업데이트 - 홍혜란 */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    /* 2023.05.06 사용자가 자기소개를 클릭했을 때 호출되는 함수 , 자기소개가 편집 모드로 전환 - 홍혜란 */
    const handleIntroClick = () => {
        setEditingIntro(true);
    };

    /* 2023.05.06 사용자가 자기소개 입력 폼에서 포커스를 벗어났을 때 호출되는 함수 , 자기소개가 편집 모드에서 보기 모드로 전환 - 홍혜란 */
    const handleIntroBlur = () => {
        setEditingIntro(false);
    };

    /* 2023.05.06 사용자가 자기소개 입력 폼에서 값을 변경할 때마다 호출되는 함수 , 입력 폼에 입력된 값으로 intro 상태가 업데이트 - 홍혜란 */
    const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntro(event.target.value);
    };

    /* 2023.05.06 수정된 이름과 자기소개 데이터를 서버에 저장 - 홍혜란 */
    useEffect(() => {
        return () => {
            const userData: UserData = { name, intro };
            axios.patch('https://c2fe-59-17-229-47.ngrok-free.app/members/{member-id}', userData);
        };
    }, [name, intro]);

    /* 2023.05.06 수정된 이름과 자기소개 데이터를 서버에 저장 - 홍혜란 */
    return (
        <div>
            <BackgroundCover></BackgroundCover>
            <MypageContainer>
                <MypageListContainer>
                    <UserProfile>
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
                            <div className="user-email">undefined@gmail.com</div>
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
                    </UserProfile>

                    <MusicInfor>
                        <LeftContainer>
                            <LikeMusic /> {/* like music 파일 */}
                            <Myplaylist /> {/* my playlist 파일 */}
                        </LeftContainer>

                        <RightContainer>
                            <ModifyContainer>
                                <div className="modify-title">
                                    <div className="pencil-icon">
                                        <BsPencilSquare />
                                    </div>
                                    <p>MODIFY PLAYLIST</p>
                                </div>
                                <Plcard>
                                    <div className="pl-treck">TRECK 8</div>
                                    <div className="pl-contents">
                                        <Pltag>
                                            <li>잔잔한</li>
                                            <li>어쿠스틱</li>
                                            <li>피아노</li>
                                        </Pltag>
                                        <Pluser>
                                            <span>WTITER</span>
                                            <span>Undefined</span>
                                            <span>LIKE</span>
                                            <span>13</span>
                                        </Pluser>
                                        <Pltext>
                                            <span>나만의 플레이리스트</span>
                                            <span>이건 나만 듣고 싶은 노래입니다.</span>
                                        </Pltext>
                                    </div>
                                    <PlyItem>
                                        <div className="plylist">
                                            <img src="./assets/ditto.png" alt="cover-img" />
                                            <li>Ditto</li>
                                            <li>Newjeans</li>
                                            <li>OMG</li>
                                        </div>
                                        <div className="plylist">
                                            <img src="./assets/ditto.png" alt="cover-img" />
                                            <li>Ditto</li>
                                            <li>Newjeans</li>
                                            <li>OMG</li>
                                        </div>
                                        <div className="plylist">
                                            <img src="./assets/ditto.png" alt="cover-img" />
                                            <li>Ditto</li>
                                            <li>Newjeans</li>
                                            <li>OMG</li>
                                        </div>
                                        <div className="plylist">
                                            <img src="./assets/ditto.png" alt="cover-img" />
                                            <li>Ditto</li>
                                            <li>Newjeans</li>
                                            <li>OMG</li>
                                        </div>
                                    </PlyItem>
                                </Plcard>
                            </ModifyContainer>
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
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
`;

const MusicInfor = styled.div`
    display: flex;
`;

const LeftContainer = styled.div`
    align-items: center;
    width: 500px;
    height: 600px;
`;

const RightContainer = styled.div`
    align-items: center;
    width: 500px;
    height: 600px;
`;

const ModifyContainer = styled.div`
    align-items: center;
    margin: 30px;

    .modify-title {
        display: flex;
        align-items: center;

        .pencil-icon {
            font-size: 16px;
            color: hsl(154, 100%, 40%);
            padding-top: 5px;
        }

        p {
            font-size: 16px;
            color: #ffffff;
            margin-left: 5px;
        }
    }
`;

/**2023-05-06 플리 슬라이드 카드 섹션 : 김주비 */
const Plcard = styled.div`
    position: relative;
    width: 500px;
    height: 500px;
    border-radius: 20px;
    background: url('./assets/mypage.png');
    background-size: cover;
    transform: scale(0.85);
    color: #ddd;
    overflow: hidden;
    transition: 0.3s ease-in-out;
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
        margin-bottom: 200px;
    }
`;

/**2023-05-06 슬라이드 태그 : 김주비 */
const Pltag = styled.ul`
    display: flex;
    li {
        word-break: keep-all;
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
        color: #ff8716;
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
        font-size: 1.6rem;
        min-width: 103%;
        word-break: break-all;
        font-weight: 600;
    }
    span:nth-child(2) {
        margin-top: 20px;
        line-height: 140%;
        opacity: 0.5;
        width: 80%;
        font-size: 0.7rem;
    }
    @media (max-width: 600px) {
        span:nth-child(1) {
            font-size: 1rem;
        }
    }
`;

const PlyItem = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: black;
    z-index: 2;
    width: 500px;
    height: 200px;
    margin-top: 300px;

    .plylist {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 500px;
        margin: 10px 0px 10px 0px;

        img {
            width: 30px;
            height: 30px;
        }

        li {
            font-size: 13px;
            color: white;
        }
    }
`;
