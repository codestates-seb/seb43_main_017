import React from 'react';
import './css/App.css';
import './css/reset.css';
import styled from 'styled-components';
import Navigate from './components/nav/Navigete';
import Signin from './components/sign/Signin';
import Signup from './components/sign/Signup';
// import NotFound from './components/NotFound';

function App() {
    return (
        <MainSection>
            <Signview>
                <Signin />
                <Signup />
            </Signview>
            <SignBtnSection>
                <button>LOGIN</button>
                <button>JOIN</button>
            </SignBtnSection>
            <NavSection>
                <Navigate />
            </NavSection>
            <div className="main-css"></div>
        </MainSection>
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
    z-index: 2;
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
`;

const SignBtnSection = styled.div`
    position: absolute;
    top: -50px;
    right: 20px;
    z-index: 1;
    opacity: 0;
    animation: sildeSign 2s forwards;
    button {
        margin: 10px;
        border: 2px solid rgba(199, 68, 68, 1);
        color: rgba(199, 68, 68, 1);
        padding: 7px 25px;
        background: none;
        font-weight: 500;
        border-radius: 20px;
        transition: 0.2s ease-in-out;
    }
    button:nth-child(2) {
        border-color: #999;
        color: #999;
    }
    button:hover {
        border-color: #ccc;
        color: #ccc;
        background-color: rgba(255, 255, 255, 0.2);
    }
    button:active {
        border-color: rgba(199, 68, 68, 1);
        color: rgba(199, 68, 68, 1);
        background-color: rgba(199, 68, 68, 0.2);
    }
    @keyframes sildeSign {
        100% {
            opacity: 1;
            top: 20px;
        }
    }
`;
