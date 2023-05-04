import React from 'react';
import './css/App.css';
import './css/reset.css';
import styled from 'styled-components';
import Navigate from './components/Nav/Navigete';
// import NotFound from './components/NotFound';

function App() {
    return (
        <MainSection>
            <NavSection>
                <Navigate />
            </NavSection>
        </MainSection>
    );
}

export default App;

const MainSection = styled.section`
    width: 100%;
    min-height: 100vh;
    background-color: #222;
`;

const NavSection = styled.section`
    position: absolute;
    left: -150px;
    width: 150px;
    height: 100vh;
    animation: sildeNav 2s forwards;
    opacity: 0;

    @keyframes sildeNav {
        100% {
            opacity: 1;
            left: 0px;
        }
    }
`;
