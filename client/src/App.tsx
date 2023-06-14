import { useState } from 'react';
import 'src/css/App.css';
import 'src/css/reset.css';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Navigate from 'src/components/Nav/Navigete';
import Signin from 'src/components/sign/Signin';
import Signup from 'src/components/sign/Signup';
import RoutingPages from 'src/pages/Routingpages';
import { RiProfileFill } from 'react-icons/ri';
import { MdFaceRetouchingNatural, MdLogout } from 'react-icons/md';
import SoundBar from 'src/components/soundbar/SoundBar';
import { useRecoilState } from 'recoil';
import { soundbarOpenState, ShowSigninState, ShowSignupState } from 'src/recoil/Atoms';

function App() {
    /**2023-05-05 로그인 모달오픈 여부 스테이트 : 김주비*/
    const [showSignIn, setShowSignIn] = useRecoilState(ShowSigninState);
    /**2023-05-05 회원가입 모달오픈 여부 스테이트 : 김주비*/
    const [showSignUp, setShowSignUp] = useRecoilState(ShowSignupState);
    const [soundbar] = useRecoilState<boolean>(soundbarOpenState);
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
                {/* 토큰이 있다면 로그아웃버튼을 출력 없다면 로그인 회원가입 버튼을 출력 */}
                {token ? (
                    <SignBtnSection>
                        <ButtonStyle
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                                localStorage.removeItem('com.naver.nid.access_token');
                                localStorage.removeItem('com.naver.nid.oauth.state_token');
                                localStorage.removeItem('memberId');
                                localStorage.removeItem('userimg');
                                localStorage.removeItem('username');
                                localStorage.removeItem('useremail');
                                localStorage.removeItem('usernickname');
                                sessionStorage.setItem('index', '0');
                                location.reload();
                                window.location.href = '/';
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
                                setShowSignUp(false);
                            }}
                        >
                            SignIn
                        </ButtonStyle>
                        <ButtonStyle2
                            onClick={() => {
                                setShowSignUp(true);
                                setShowSignIn(false);
                            }}
                        >
                            SignUp
                        </ButtonStyle2>{' '}
                    </SignBtnSection>
                )}
                {/* 토큰이 있다면 모바일로그아웃아이콘을 출력, 없다면 모바일로그인,모바일회원가입 아이콘 출력 */}
                {token ? (
                    <SignBtnSection2>
                        <ButtonStyle3
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                                localStorage.removeItem('com.naver.nid.access_token');
                                localStorage.removeItem('com.naver.nid.oauth.state_token');
                                localStorage.removeItem('memberId');
                                localStorage.removeItem('userimg');
                                localStorage.removeItem('username');
                                localStorage.removeItem('useremail');
                                localStorage.removeItem('usernickname');
                                sessionStorage.setItem('index', '0');
                                location.reload();
                                window.location.href = '/';
                            }}
                        >
                            <MdLogout />
                        </ButtonStyle3>
                    </SignBtnSection2>
                ) : (
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
                )}
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
            {soundbar ? <SoundBar /> : null}
        </BrowserRouter>
    );
}

export default App;

/**2023-05-05 메인 컴포넌트: 김주비*/
const MainSection = styled.section`
    width: 100%;
    min-height: 100vh;
    background-color: #1b1b1b;
`;
/**2023-05-05 네비게이션 컴포넌트: 김주비*/
const NavSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -150px;
    width: 100px;
    height: 100vh;
    background: linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0, 0));
    animation: sildeNav 2s forwards;
    opacity: 0;
    z-index: 3;
    @keyframes sildeNav {
        100% {
            opacity: 1;
            left: 0px;
        }
    }
    @media (max-width: 700px) {
        z-index: 1;
        width: 100%;
        height: 100px;
        background: none;
    }
`;

/**2023-05-05 sign 버튼 섹션 : 김주비*/
const SignBtnSection = styled.aside`
    z-index: 3;
    position: absolute;
    margin-top: 20px;
    right: 20px;
    z-index: 99;
    opacity: 0;
    animation: sildeSign 2s forwards;
    @keyframes sildeSign {
        100% {
            opacity: 1;
        }
    }
    @media (max-width: 700px) {
        z-index: 3;
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
    z-index: 999;
`;
/**2023-05-05 라우팅 컴포넌트 : 김주비*/
const RouterSection = styled.section`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

/**2023-05-06 미디어쿼리 반응형 - Signup 버튼 섹션 : 김주비*/
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
/**2023-05-06 미디어쿼리 반응형 - Signin 버튼 디자인 : 김주비*/
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
    background-color: rgba(0, 0, 0, 0.6);
`;
/**2023-05-06 미디어쿼리 반응형 - 회원가입버튼 디자인 : 김주비*/
const ButtonStyle4 = styled(ButtonStyle3)`
    border-color: #999;
    color: #999;
`;
