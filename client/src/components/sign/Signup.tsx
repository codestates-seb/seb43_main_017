import { useState } from 'react';
import { ButtonStyle } from 'src/App'; // 버튼 디자인은 App 컴포넌트와 공유합니다.
import { BlurBackground, SignInBox, SignTitle, SignText, InputContainer, InputBox, Errorbox } from './Signin'; // 로그인과 회원가입은 같은 스타일드 컴포넌트를 공유합니다.
import axios from 'axios';
import styled from 'styled-components';
import { userType } from 'src/types/LoginInput';

function Signup({ setShowSignUp }: { setShowSignUp: React.Dispatch<React.SetStateAction<boolean>> }) {
    const BaseUrl = `${process.env.REACT_APP_API_URL}/members/signup`;
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false); // display closing 모션효과 상태
    /** 에러메시지  */
    const [nameMessage, setnameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [checkMessage, setCheckMessage] = useState('');
    /** 이름, 이메일, 패스워드, 패스워드체크 유효성 통과 여부 */
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [isName, setIsName] = useState(false);
    /** 회원가입 인풋창 입력값 저장*/
    const [userInfo, setUserInfo] = useState<userType>({
        name: '',
        email: '',
        password: '',
    });
    /**2023/05/06 - 인풋창에 회원정보를 저장하고 유효성검사를 진행하는 함수 - 박수범 */
    const InputValueHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserInfo({ ...userInfo, [key]: e.target.value });
        /**2023/05/06 - 이메일 유효성 검사 - 박수범  */
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // 이름 유효성 검사
        if (key === 'name' && e.target.value.length < 1) {
            setnameMessage('이름을 입력해주세요.');
        } else if (e.target.value.length === 0) {
            setnameMessage('');
        }
        if (e.target.value.length > 0) {
            setnameMessage('');
            setIsName(true);
        }
        // 이메일 유효성 검사
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
        // 패스워드 유효성 검사
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
        // 패스워드체크
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

    /**2023/05/05 - 회원가입시 서버로 이름,이메일,패스워드를 전송하는 함수 -bumpist  */
    const SignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPassword && isEmail && isName && isCheck) {
            axios
                .post<null>(`${BaseUrl}`, {
                    name: userInfo.name,
                    email: userInfo.email,
                    password: userInfo.password,
                })
                .then(() => {
                    alert(`Uncover에 오신걸 환영합니다`);
                    setCloseDisplay(!closeDisplay);
                    setTimeout(() => {
                        setShowSignUp(false);
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 409) {
                        alert(error.response.data.message);
                    }
                });
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
                        {/* 유효성 검사를 모두 통과하지못하면 회원가입버튼이 비활성화된다. */}
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
/**2023/05/06 - 유효성 검사를 통과하지 못할 시 보여지는 disable 버튼 컴포넌트 - 박수범  */
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
