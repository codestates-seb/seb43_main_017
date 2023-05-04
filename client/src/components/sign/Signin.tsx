import { useState } from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../App'; // 버튼 디자인은 App 컴포넌트와 공유합니다.

function Signin({ setShowSignIn }: { setShowSignIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false); // display closing 모션효과 상태

    const haldleClose = () => {
        // 로그인 버튼 클릭 함수. 함수명은 차후에 편한대로 변경해주세요~!
        // 로그인 axios 요청이 성공했을때 주석사이의 상태변경 함수가 포함되어야합니다.
        setCloseDisplay(!closeDisplay);
        setTimeout(() => {
            setShowSignIn(false);
        }, 1000);
        // 주석 시작부터 여기까지 then 에 넣어주세요!
    };
    return (
        <BlurBackground className={closeDisplay ? 'close-display' : 'null'} onClick={haldleClose}>
            <SignInBox
                className={closeDisplay ? 'out-display' : 'null'}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/**/}
                {/*대충 이 사이쯤 부터 인풋창 하고 이것저것 넣어주시면 될듯해용 ^.^ */}
                {/**/}
                <ButtonStyle onClick={haldleClose}>LOGIN</ButtonStyle>
            </SignInBox>
        </BlurBackground>
    );
}

export default Signin;

// 로그인과 회원가입은 같은 스타일드 컴포넌트를 공유합니다.
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
export const SignInBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    min-height: 600px;
    margin-top: -1000px;
    border-radius: 20px;
    background-color: rgba(28, 31, 34, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 40px rgb(0, 0, 0, 0.2);
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
