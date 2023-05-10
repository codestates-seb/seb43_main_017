import { SiNaver } from 'react-icons/si';
import { accessToken } from 'src/recoil/Atoms';
import { useSetRecoilState } from 'recoil';
import { OauthBtn } from './Signin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LoginPost } from '@/types/AxiosInterface';
import useScript from 'src/hook/useScript';

declare global {
    interface Window {
        naver: any;
    }
}
function NaverBtn() {
    const { naver } = window;
    const setTokenState = useSetRecoilState(accessToken);
    const status = useScript('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js');
    const BaseUrl = 'https://c2fe-59-17-229-47.ngrok-free.app/members/login';

    useEffect(() => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_CLIENT_ID,
            callbackUrl: 'http://localhost:3000/',
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: 30 },
            callbackHandle: true,
        });
        naverLogin.init();
    }, [status]);

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const NaverHandler = () => {
        console.log('네이버로그인이다.');
    };

    return (
        <>
            <div id="naverIdLogin"></div>
        </>
    );
}

export default NaverBtn;
