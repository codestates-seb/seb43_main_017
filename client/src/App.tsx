import React, { useState } from 'react';
import './css/App.css';
import './css/reset.css';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Navigate from './components/Nav/Navigete';
import Signin from './components/sign/Signin';
import Signup from './components/sign/Signup';
import RoutingPages from './pages/Routingpages';
import { RiProfileFill } from 'react-icons/ri';
import { MdFaceRetouchingNatural } from 'react-icons/md';

function App() {
    /**2023-05-05 로그인 모달오픈 여부 스테이트 : 김주비*/
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    /**2023-05-05 회원가입 모달오픈 여부 스테이트 : 김주비*/
    const [showSignUp, setShowSignUp] = useState<boolean>(false);
    const token = localStorage.getItem('access_token'); // 로컬스토리지에 담긴 토큰 정보를 가져옵니다.

    return (
        <BrowserRouter>
            <MainSection>
                {/* Login botton Start*/}
                {showSignIn ? (
                    <Signview>
                        <Signin setShowSignIn={setShowSignIn} />
                    </Signview>
                ) : null}
                {showSignUp ? (
                    <Signview>
                        <Signup setShowSignUp={setShowSignUp} />
                    </Signview>
                ) : null}
                {token ? (
                    <SignBtnSection>
                        <ButtonStyle
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                location.reload();
                            }}
                        >
                            Logout
                        </ButtonStyle>
                    </SignBtnSection>
                ) : (
                    <SignBtnSection>
                        <ButtonStyle
                            onClick={() => {
                                setShowSignIn(true);
                            }}
                        >
                            SignIn
                        </ButtonStyle>
                        <ButtonStyle2
                            onClick={() => {
                                setShowSignUp(true);
                            }}
                        >
                            SingUp
                        </ButtonStyle2>{' '}
                    </SignBtnSection>
                )}
                <SignBtnSection2>
                    <ButtonStyle3
                        onClick={() => {
                            setShowSignIn(true);
                        }}
                    >
                        <MdFaceRetouchingNatural />
                    </ButtonStyle3>
                    <ButtonStyle4
                        onClick={() => {
                            setShowSignUp(true);
                        }}
                    >
                        <RiProfileFill />
                    </ButtonStyle4>
                </SignBtnSection2>
                {/* Login botton End*/}
                {/* Nav Start*/}
                <NavSection>
                    <Navigate />
                </NavSection>
                {/* Nav End*/}
                {/* view Start*/}
                <RouterSection>
                    <RoutingPages />
                </RouterSection>
                {/* view Start*/}
            </MainSection>
        </BrowserRouter>
    );
}

export default App;

/**2023-05-05 메인 컴포넌트: 김주비*/
const MainSection = styled.section`
    width: 100%;
    min-height: 100vh;
    background-color: #222;
`;
/**2023-05-05 네비게이션 컴포넌트: 김주비*/
const NavSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -150px;
    width: 150px;
    height: 100vh;
    background: linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0, 0));
    animation: sildeNav 2s forwards;
    opacity: 0;
    z-index: 1;
    @keyframes sildeNav {
        100% {
            opacity: 1;
            left: 0px;
        }
    }
    @media (max-width: 700px) {
        width: 100%;
        height: 100px;
        background: none;
    }
`;

/**2023-05-05 sign 버튼 섹션 : 김주비*/
const SignBtnSection = styled.aside`
    position: absolute;
    margin-top: 20px;
    right: 20px;
    z-index: 2;
    opacity: 0;
    animation: sildeSign 2s forwards;
    @keyframes sildeSign {
        100% {
            opacity: 1;
        }
    }
    @media (max-width: 700px) {
        display: none;
    }
`;
/**2023-05-05 로그인버튼 디자인 : 김주비*/
export const ButtonStyle = styled.button`
    margin: 10px;
    border: 2px solid rgba(199, 68, 68, 1);
    color: rgba(199, 68, 68, 1);
    padding: 7px 25px;
    background: none;
    font-weight: 500;
    border-radius: 20px;
    transition: 0.2s ease-in-out;
    :hover {
        border-color: #ccc;
        color: #ccc;
        background-color: rgba(255, 255, 255, 0.2);
    }
    :active {
        border-color: rgba(199, 68, 68, 1);
        color: rgba(199, 68, 68, 1);
        background-color: rgba(199, 68, 68, 0.2);
    }
`;
/**2023-05-05 회원가입버튼 디자인 : 김주비*/
const ButtonStyle2 = styled(ButtonStyle)`
    border-color: #999;
    color: #999;
`;
/**2023-05-05 Sign 버튼 모달창 컴포넌트 : 김주비*/
const Signview = styled.section`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    z-index: 3;
`;
/**2023-05-05 라우팅 컴포넌트 : 김주비*/
const RouterSection = styled.section`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
`;

/**2023-05-06 미디어쿼리 반응형 - sign 버튼 섹션 : 김주비*/
const SignBtnSection2 = styled(SignBtnSection)`
    display: none;
    flex-direction: column;
    top: none;
    width: 50px;
    height: 110px;
    right: 20px;
    bottom: 20px;
    @media (max-width: 700px) {
        display: flex;
    }
`;
/**2023-05-06 미디어쿼리 반응형 - 로그인버튼 디자인 : 김주비*/
const ButtonStyle3 = styled(ButtonStyle)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 15px 0px;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 60px;
    font-size: 1.5rem;
`;
/**2023-05-06 미디어쿼리 반응형 - 회원가입버튼 디자인 : 김주비*/
const ButtonStyle4 = styled(ButtonStyle3)`
    border-color: #999;
    color: #999;
`;
