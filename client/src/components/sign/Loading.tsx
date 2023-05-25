import styled from 'styled-components';
import axios from 'axios';
import { LoginPost } from '@/types/AxiosInterface';

export const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
`;

export const Loading = () => {
    const BaseUrl = 'ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/oauth/signup';
    if (location.hash) {
        const navertoken = window.location.hash.split('=')[1].split('&')[0];
        console.log(navertoken);
        localStorage.setItem('access_token', navertoken);
        window.location.href = '/';
    } else if (location.search) {
        const kakaocode = window.location.search.split('=')[1];
        localStorage.setItem('access_token', kakaocode);
        window.location.href = '/';
        console.log(kakaocode);
    }
    const accesscode = localStorage.getItem('access_token');

    axios
        .post<LoginPost>(`${BaseUrl}`, {
            headers: {
                Authorization: `${accesscode}`,
            },
        })
        .then((res) => {
            if (res.status === 200 && res.headers.authorization !== undefined) {
                window.localStorage.setItem('access_token', res.headers.authorization);
                window.location.href = '/';
            }
        });

    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요...</LoadingText>
            <img src="./assets/Dual Ring-1s-124px.gif"></img>
        </Background>
    );
};

export default Loading;
