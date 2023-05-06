import { useState } from 'react';
import { ButtonStyle } from '../../App'; // 버튼 디자인은 App 컴포넌트와 공유합니다.
import { BlurBackground, SignInBox, SignTitle, SignText, InputContainer, InputBox, Errorbox } from './Signin'; // 로그인과 회원가입은 같은 스타일드 컴포넌트를 공유합니다.
import axios from 'axios';
import styled from 'styled-components';
import { userType } from '../../types/LoginInput';
import { LoginPost } from '../../types/AxiosInterface';

function Signup({ setShowSignUp }: { setShowSignUp: React.Dispatch<React.SetStateAction<boolean>> }) {
    const BaseUrl = 'https://1a3f-59-17-229-47.jp.ngrok.io/members/signup';
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false); // display closing 모션효과 상태
    const [nameMessage, setnameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [checkMessage, setCheckMessage] = useState('');
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [isName, setIsName] = useState(false);
    const [userInfo, setUserInfo] = useState<userType>({
        name: '',
        email: '',
        password: '',
    });
    const InputValueHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserInfo({ ...userInfo, [key]: e.target.value });
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (key === 'name' && e.target.value.length < 1) {
            setnameMessage('이름을 입력해주세요.');
        } else if (e.target.value.length === 0) {
            setnameMessage('');
        }
        if (e.target.value.length > 0) {
            setnameMessage('');
            setIsName(true);
        }
        if (key === 'email' && e.target.value.length > 0) {
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            setIsEmail(false);
        } else if (e.target.value.length === 0) {
            setEmailMessage('');
        }
        if (emailRegex.test(e.target.value)) {
            setEmailMessage('');
            setIsEmail(true);
        }
        if (key === 'password' && e.target.value.length < 8 && e.target.value.length > 0) {
            setPasswordMessage('비밀번호는 8자리 이상 입력해주세요.');
            setIsPassword(false);
        } else if (e.target.value.length === 0) {
            setPasswordMessage('');
        }
        if (key === 'password' && e.target.value.length >= 8) {
            setPasswordMessage('');
            setIsPassword(true);
        }
        if (key === 'check' && e.target.value !== userInfo.password) {
            setCheckMessage('비밀번호가 일치하지 않습니다.');
            setIsCheck(false);
        } else if (e.target.value.length === 0) {
            setCheckMessage('');
        }
        if (key === 'check' && e.target.value === userInfo.password) {
            setCheckMessage('');
            setIsCheck(true);
        }
    };

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const SignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPassword && isEmail && isName && isCheck) {
            axios.post<LoginPost>(`${BaseUrl}`, {
                neme: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
            });
            alert(`Uncover에 오신걸 환영합니다 ${userInfo.name}님`);
            setCloseDisplay(!closeDisplay);
            setTimeout(() => {
                setShowSignUp(false);
            }, 1000);
        }
    };

    /**2023/05/05 - SignUp 모달창 밖을 클릭시 모달창을 종료시켜주는 함수 -bumpist  */
    const ModalHandler = () => {
        setCloseDisplay(!closeDisplay);
        setTimeout(() => {
            setShowSignUp(false);
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
                <SignTitle>SignUp</SignTitle>
                <span>
                    <SignText>UNCOVER 회원가입 페이지 입니다.</SignText>
                    <SignText> 소셜로그인을 통한 간편 로그인 또한 가능합니다.</SignText>
                </span>
                <InputContainer>
                    <form onSubmit={SignUpHandler}>
                        <div>
                            {/* 이름 인풋창 */}
                            <InputBox
                                placeholder="이름을 입력하세요"
                                type="text"
                                onChange={(e) => InputValueHandler(e, 'name')}
                            />
                            {nameMessage ? <Errorbox>{nameMessage}</Errorbox> : ''}
                            {/* 아이디 인풋창 */}
                            <InputBox
                                placeholder="이메일을 입력하세요"
                                type="text"
                                onChange={(e) => InputValueHandler(e, 'email')}
                            />
                            {emailMessage ? <Errorbox>{emailMessage}</Errorbox> : ''}
                            {/* 패스워드 인풋창 */}
                            <InputBox
                                placeholder="패스워드를 입력하세요"
                                type="password"
                                onChange={(e) => InputValueHandler(e, 'password')}
                            />
                            {passwordMessage ? <Errorbox>{passwordMessage}</Errorbox> : ''}
                            {/* 패스워드체크 인풋창 */}
                            <InputBox
                                placeholder="패스워드를 확인합니다."
                                type="password"
                                onChange={(e) => InputValueHandler(e, 'check')}
                            />
                            {checkMessage ? <Errorbox>{checkMessage}</Errorbox> : ''}
                        </div>
                        {!isEmail || !isPassword || !isName || !isCheck ? (
                            <Disablebtn disabled={!(isEmail && isPassword && isName && isCheck)}>SignUp</Disablebtn>
                        ) : (
                            <ButtonStyle>SignUp</ButtonStyle>
                        )}
                    </form>
                </InputContainer>
            </SignInBox>
        </BlurBackground>
    );
}

const Disablebtn = styled.button`
    margin: 10px;
    border: 2px solid #656565;
    color: #656565;
    padding: 7px 25px;
    background: none;
    font-weight: 500;
    border-radius: 20px;
    transition: 0.2s ease-in-out;
`;

export default Signup;
