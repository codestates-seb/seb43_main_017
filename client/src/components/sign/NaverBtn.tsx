import { SiNaver } from 'react-icons/si';
import { OauthBtn } from './Signin';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

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

    /** 2023/05/11 네이버 Oauth 인증 함수 - 박수범 */
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: CLIENT_ID,
            callbackUrl: 'http://localhost:3000/oauthloading',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: 45 },
            callbackHandle: true,
        });
        naverLogin.init();
    };

    useEffect(() => {
        initializeNaverLogin();
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
