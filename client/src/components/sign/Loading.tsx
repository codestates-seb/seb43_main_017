import styled from 'styled-components';
import axios from 'axios';
import { LoginPost } from '@/types/AxiosInterface';
import { useEffect } from 'react';

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
    const BaseUrl = 'http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/oauth/signup';

    if (location.hash) {
        const { naver } = window;
        const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
        const naverLogin = new naver.LoginWithNaverId({
            clientId: CLIENT_ID,
            callbackUrl: 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com/oauthloading',
            isPopup: false,
            callbackHandle: false,
        });
        naverLogin.init();
        naverLogin.getLoginStatus(async function (status: any) {
            if (status) {
                // 아래처럼 선택하여 추출이 가능하고,
                const userid = naverLogin.user.getEmail();
                const username = naverLogin.user.getNickName();
                // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
                console.log(naverLogin.user);
                axios
                    .post<LoginPost>(`${BaseUrl}`, {
                        email: userid,
                        name: username,
                    })
                    .then((res) => {
                        if (res.status === 200 && res.headers.authorization !== undefined) {
                            window.localStorage.setItem('access_token', res.headers.authorization);
                            window.localStorage.setItem('refresh_token', res.headers.Refresh);
                            window.location.href = 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com';
                        }
                    });
            }
        });
    } else if (location.search) {
        const accesscode = window.location.search.split('=')[0];
        const refreshcode = window.location.search.split('=')[1];
        localStorage.setItem('access_token', accesscode);
        localStorage.setItem('refresh_token', refreshcode);
        window.location.href = 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com';
        console.log(accesscode);
    }
    const accesscode = localStorage.getItem('access_token');
    /** 서버로  */
    axios
        .post<LoginPost>(`${BaseUrl}`, {
            headers: {
                Authorization: `${accesscode}`,
            },
        })
        .then((res) => {
            if (res.status === 200 && res.headers.authorization !== undefined) {
                window.localStorage.setItem('access_token', res.headers.authorization);
                window.location.href = 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com';
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
