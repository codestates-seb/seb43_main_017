import { SiNaver } from 'react-icons/si';
import { OauthBtn } from './Signin';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LoginPost } from '@/types/AxiosInterface';

declare global {
    interface Window {
        naver: any;
    }
}

const NaverIdLogin = styled.div`
    display: none;
`;

function NaverBtn() {
    const naverRef = useRef<HTMLInputElement>(null);
    const { naver } = window;
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const BaseUrl = 'ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/oauth/signup';

    /** 2023/05/11 네이버 Oauth 인증 함수 - 박수범 */
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: CLIENT_ID,
            callbackUrl: 'http://localhost:3000/oauthloading',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: 45 },
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
                            window.location.href = '/';
                        }
                    });
            }
        });
    };

    const userAccessToken = () => {
        window.location.href.includes('access_token');
    };

    useEffect(() => {
        initializeNaverLogin();
        userAccessToken();
    }, []);

    /** 2023/05/11 - 네이버 로그인 버튼 커스텀을 위해 useRef를 이용하여 커스텀 버튼 클릭 시, 기존 네이버로그인버튼 눌리도록 만든 함수 - 박수범 */
    const handleNaverLogin = () => {
        if (naverRef.current) {
            (naverRef.current.children[0] as HTMLElement).click();
        }
    };

    return (
        <>
            <NaverIdLogin ref={naverRef} id="naverIdLogin" />
            <OauthBtn bgColor="#1fd771" color="#f5f2f2" onClick={handleNaverLogin}>
                <SiNaver className="navericon" />
                네이버 계정으로 로그인하기
            </OauthBtn>
        </>
    );
}

export default NaverBtn;
