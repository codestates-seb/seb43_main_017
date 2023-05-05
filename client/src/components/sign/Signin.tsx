import { useState } from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../App'; // 버튼 디자인은 App 컴포넌트와 공유합니다.
import axios from 'axios';

import { infoType } from '../../types/LoginInput';
import { LoginPost } from '../../types/AxiosInterface';

function Signin({ setShowSignIn }: { setShowSignIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const End_point = '/members/login';
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false); // display closing 모션효과 상태
    const [loginInfo, setLoginInfo] = useState<infoType>({
        userId: '',
        password: '',
    });

    const InputValueHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };
    console.log(loginInfo);
    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const SignInHandler = () => {
        axios
            .post<LoginPost>(`${End_point}`, {
                userId: loginInfo.userId,
                password: loginInfo.password,
            })
            .then((res) => {
                if (res.data.accessToken !== undefined) {
                    window.localStorage.setItem('access_token', res.data.accessToken);
                    //토큰 리코일로 관리.setToken(localStorage.getItem('access_token'));
                }
                setCloseDisplay(!closeDisplay);
                setTimeout(() => {
                    setShowSignIn(false);
                }, 1000);
            });
    };

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const GoogleHandler = () => {
        console.log('구글로그인이다.');
    };

    /**2023/05/05 - 카카오 Oauth 로그인 요청 함수 -bumpist  */
    const KakaoHandler = () => {
        console.log('카카오로그인이다.');
    };

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const NaverHandler = () => {
        console.log('네이버로그인이다.');
    };
    return (
        <BlurBackground className={closeDisplay ? 'close-display' : 'null'} onClick={SignInHandler}>
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
                <OauthBtn bgColor="#f9f8f8" color="#2e2e2e" onClick={GoogleHandler}>
                    <SNSIcon src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png" />
                    구글 계정으로 로그인하기
                </OauthBtn>
                <OauthBtn bgColor="#fee500" color="#2e2e2e" onClick={KakaoHandler}>
                    <SNSIcon src="data:image/png;base64,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" />
                    카카오 계정으로 로그인하기
                </OauthBtn>
                <OauthBtn bgColor="#15c654" color="#fff" onClick={NaverHandler}>
                    <SNSIcon src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFSHKNUAYW5FCUzILITGoVPOrxcP-4f_2yxw&usqp=CAU" />
                    네이버 계정으로 로그인하기
                </OauthBtn>
                <InputContainer>
                    <form onSubmit={SignInHandler}>
                        <div>
                            {/* 아이디 인풋창 */}
                            <InputBox
                                placeholder="아이디를 입력하세요"
                                type="text"
                                onChange={() => InputValueHandler('userId')}
                            />
                            {/* 패스워드 인풋창 */}

                            <InputBox
                                placeholder="패스워드를 입력하세요"
                                type="password"
                                onChange={() => InputValueHandler('password')}
                            />
                        </div>
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
    background-color: rgba(28, 31, 34, 0.5);
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
`;
/**2023/05/05 - SNS아이콘 컴포넌트 - 박수범 */
export const SNSIcon = styled.img`
    right: 20px;
    position: relative;
    width: 30px;
    height: 30px;
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
/**2023/05/05 - 로그인 모달창 텍스트 컴포넌트 - 박수범 */
export const InputContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 300px;
    align-content: center;
    text-align: center;
`;

/**2023/05/05 - 로그인 인풋창 컴포넌트 - 박수범 */
export const InputBox = styled.input`
    width: 100%;
    margin: 10px 0px;
    padding: 3px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #fff;
    border-bottom: 2px solid #5e5e5e;
    ::placeholder {
        color: rgba(94, 94, 94, 0.6);
    }
    &:focus {
        ::placeholder {
            opacity: 0;
        }
    }
`;
