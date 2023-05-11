import styled from 'styled-components';
import { useEffect, useState } from 'react';
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
    if (location.hash) {
        const token = window.location.hash.split('=')[1].split('&')[0];
        localStorage.setItem('com.naver.nid.access_token', `bearer.${token}`);
        localStorage.setItem('access_token', token);
        window.location.href = '/';
    }

    /*axios
        .post<LoginPost>(`${BaseUrl}`, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            if (res.status === 200 && res.headers.authorization !== undefined) {
                window.localStorage.setItem('access_token', res.headers.authorization);
                window.location.href = '/';
            }
        });*/

    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요...</LoadingText>
            <img src="./assets/Spinner-1s-200px.gif"></img>
        </Background>
    );
};

export default Loading;
