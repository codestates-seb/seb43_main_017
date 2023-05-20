import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { infoType } from 'src/types/LoginInput';
import { LoginPost } from 'src/types/AxiosInterface';
import { accessToken } from 'src/recoil/Atoms';
import { useSetRecoilState } from 'recoil';
import { ButtonStyle } from 'src/App'; // 버튼 디자인은 App 컴포넌트와 공유합니다.
import GoogleBtn from './GoogleBtn';
import KakaoBtn from './KakaoBtn';
import NaverBtn from './NaverBtn';

function Signin({ setShowSignIn }: { setShowSignIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const BaseUrl = `${process.env.REACT_APP_API_URL}/members/login`;
    const setTokenState = useSetRecoilState(accessToken);
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false); // display closing 모션효과 상태
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loginInfo, setLoginInfo] = useState<infoType>({
        email: '',
        password: '',
    });

    const InputValueHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const SignInHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            setErrorMessage('이메일과 비밀번호를 모두 입력하세요');
        } else if (email && password) {
            setErrorMessage('');
            axios
                .post<LoginPost>(`${BaseUrl}`, {
                    email: loginInfo.email,
                    password: loginInfo.password,
                })
                .then((res) => {
                    if (res.status === 200 && res.headers.authorization !== undefined) {
                        window.localStorage.setItem('access_token', res.headers.authorization);
                        window.localStorage.setItem('refresh_token', res.headers.refresh);
                        axios
                            .get(`${process.env.REACT_APP_API_URL}/members/info`, {
                                headers: {
                                    Authorization: `Bearer ${res.headers.authorization}`,
                                },
                            })
                            .then((res) => {
                                window.localStorage.setItem('memberid', res.data.date.memberid);
                                window.localStorage.setItem('usernickname', res.data.data.neme);
                                window.localStorage.setItem('useremail', loginInfo.email);
                            });
                        setCloseDisplay(!closeDisplay);
                        setTimeout(() => {
                            setShowSignIn(false);
                        }, 1000);
                    }
                })
                .catch(() => {
                    setErrorMessage('유효하지 않은 로그인입니다.');
                });
        }
    };

    /**2023/05/05 - Signin 모달창 밖을 클릭시 모달창을 종료시켜주는 함수 -bumpist  */
    const ModalHandler = () => {
        setCloseDisplay(!closeDisplay);
        setTimeout(() => {
            setShowSignIn(false);
        }, 1000);
    };

    return (
        <BlurBackground className={closeDisplay ? 'close-display' : 'null'} onClick={ModalHandler}>
            <SignInBox
                className={closeDisplay ? 'out-display' : 'null'}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <SignTitle>LOGIN</SignTitle>
                <span>
                    <SignText>UNCOVER 로그인 페이지 입니다.</SignText>
                    <SignText> 소셜로그인을 통한 간편 로그인 또한 가능합니다.</SignText>
                </span>
                <GoogleBtn />
                <KakaoBtn />
                <NaverBtn />
                <InputContainer>
                    <form onSubmit={SignInHandler}>
                        <div>
                            {/* 아이디 인풋창 */}
                            <InputBox
                                placeholder="이메일 입력하세요"
                                type="text"
                                onChange={(e) => InputValueHandler(e, 'email')}
                            />
                            {/* 패스워드 인풋창 */}
                            <InputBox
                                placeholder="패스워드를 입력하세요"
                                type="password"
                                onChange={(e) => InputValueHandler(e, 'password')}
                            />
                        </div>
                        {errorMessage ? <Errorbox>{errorMessage}</Errorbox> : ''}
                        <ButtonStyle>LOGIN</ButtonStyle>
                    </form>
                </InputContainer>
            </SignInBox>
        </BlurBackground>
    );
}

export default Signin;

// 로그인과 회원가입은 같은 스타일드 컴포넌트를 공유합니다.
/**2023/05/05 - 로그인 모달창이 on상태일 때 배경을 Blur처리 해주는 컴포넌트 */
export const BlurBackground = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    backdrop-filter: blur(20px);
    animation: showview 2s forwards;
    opacity: 0;
    @keyframes showview {
        100% {
            opacity: 1;
        }
    }
    &.close-display {
        animation: closedisplay 1s forwards;
    }
    @keyframes closedisplay {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
/**2023/05/05 - 로그인 모달창 컨테이너 - 박수범 */
export const SignInBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    min-height: 600px;
    margin-top: -1000px;
    border-radius: 20px;
    background-color: rgba(28, 31, 34, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 40px rgb(0, 0, 0, 0.2);
    > span {
        margin: 20px 0px;
        text-align: center;
    }
    animation: showLogin 2s forwards;
    @keyframes showLogin {
        70% {
            margin-top: 70px;
        }
        100% {
            margin-top: 0px;
        }
    }
    &.out-display {
        animation: outdisplay 1s forwards;
    }
    @keyframes outdisplay {
        0% {
            margin-top: 0px;
        }
        20% {
            margin-top: 70px;
        }
        100% {
            margin-top: -1000px;
        }
    }
`;
/** 2023/05/05 - Oauth 로그인 버튼 컴포넌트 - 박수범 */
export const OauthBtn = styled.button<{ bgColor: string; color: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 40px;
    border-radius: 8px;
    border: none;
    margin: 10px 0px;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    font-weight: bold;
    cursor: pointer;
    .googleicon {
        right: 26px;
        position: relative;
        width: 20px;
        height: 20px;
    }
    .kakaoicon {
        right: 20px;
        position: relative;
        width: 20px;
        height: 20px;
    }
    .navericon {
        right: 20px;
        position: relative;
        width: 15px;
        height: 15px;
    }
`;

/**2023/05/05 - 로그인 모달창 타이틀 컴포넌트 - 박수범 */
export const SignTitle = styled.h1`
    font-size: 50px;
    font-weight: bold;
    color: rgba(199, 68, 68, 1);
`;
/**2023/05/05 - 로그인 모달창 텍스트 컴포넌트 - 박수범 */
export const SignText = styled.p`
    margin: 5px 0px;
    font-size: 12px;
    font-weight: 600;
    color: #757575;
`;
/**2023/05/05 - 로그인 인풋창 컨테이너  - 박수범 */
export const InputContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 300px;
    align-content: center;
    text-align: center;
`;

/**2023/05/05 - 로그인 인풋창 컴포넌트 - 박수범 */
export const InputBox = styled.input`
    width: 90%;
    margin: 10px 0px;
    padding: 3px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #fff;
    border-bottom: 2px solid #5e5e5e;
    ::placeholder {
        color: rgba(130, 129, 129, 0.6);
    }
    &:focus {
        width: 100%;
        border-bottom: 2px solid rgba(199, 68, 68, 1);
        ::placeholder {
            opacity: 0;
        }
    }
`;

/**2023/05/05 - 에러메시지 박스 컴포넌트 - 박수범 */
export const Errorbox = styled.div`
    color: red;
    font-size: 14px;
`;
