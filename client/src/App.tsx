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
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [showSignUp, setShowSignUp] = useState<boolean>(false);
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
                    </ButtonStyle2>
                </SignBtnSection>
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

const MainSection = styled.section`
    width: 100%;
    min-height: 100vh;
    background-color: #222;
`;

const Signview = styled.section`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    z-index: 3;
`;
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
const ButtonStyle2 = styled(ButtonStyle)`
    border-color: #999;
    color: #999;
`;
const RouterSection = styled.section`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
`;

/* -------------------------------------- */

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
const ButtonStyle4 = styled(ButtonStyle3)`
    border-color: #999;
    color: #999;
`;
