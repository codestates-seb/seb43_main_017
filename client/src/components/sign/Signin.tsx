import { useState } from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../App';

function Signin({ setShowSignIn }: { setShowSignIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false);
    console.log(closeDisplay);

    const haldleClose = () => {
        setCloseDisplay(!closeDisplay);
        setTimeout(() => {
            setShowSignIn(false);
        }, 1000);
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
                {/*여기에 인풋창 하고 이것저것 넣어주시면 될듯용*/}
                {/**/}
                <ButtonStyle onClick={haldleClose}>LOGIN</ButtonStyle>
            </SignInBox>
        </BlurBackground>
    );
}

export default Signin;

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
