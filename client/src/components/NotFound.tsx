import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../css/App.css';

function NotFound() {
    return (
        <NotfoundSection>
            <div>
                <span className="notfound_404">404</span>
                <span className="notfound_state">OPPS! PAGE NOT FOUND</span>
                <span className="notfound_text">
                    Sorry. the page you're looking for doesn't exist. <br /> If you think something is broken. report a
                    problem.
                </span>
                <Link to="/">
                    <HomeButton> HOME </HomeButton>
                </Link>
            </div>
        </NotfoundSection>
    );
}

export default NotFound;

const NotfoundSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: #fff;
    background-color: #111;
    text-align: center;
    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        margin-top: -100px;
        animation: opacity 2s ease forwards;
    }
    @keyframes opacity {
        100% {
            opacity: 1;
            margin-top: 0px;
        }
    }
    .notfound_404 {
        font-family: 'Monoton';
        font-size: 8em;
        font-weight: 00;
        color: #fff;
        background: linear-gradient(-125deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); // 백그라운드 그라데이션 색상지정
        background-size: 400% 400%; // 그라데이션 사이즈 확장
        color: transparent; // 폰트 컬러를 투명화로 변경
        background-clip: text; // 백그라운드 범위를 텍스트에만 클립하는 속성.
        -webkit-background-clip: text;
        animation: textcolor 7s ease infinite; //애니메이션 시간 및 반복설정 조정
    }

    @keyframes textcolor {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .notfound_state {
        margin: 20px;
        font-size: 1.4em;
        color: #d9e3ec;
    }
    .notfound_text {
        font-size: 1em;
        color: #666;
        line-height: 150%;
        /* letter-spacing: 1px; */
    }
`;

const HomeButton = styled.button`
    margin-top: 50px;
    padding: 8px 30px;
    border-radius: 20px;
    font-weight: 700;
    color: #666;
    border: 2px solid #666;
    background: none;
    transition: 0.2s ease-in-out;
    :hover {
        border-color: #d9e3ec;
        background: #666;
        color: #d9e3ec;
    }
`;
