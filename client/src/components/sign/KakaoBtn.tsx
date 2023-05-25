import { RiKakaoTalkFill } from 'react-icons/ri';
import { OauthBtn } from './Signin';
function KakaoBtn() {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = 'http://localhost:3000/oauthloading';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    /** 2023/05/14 - 카카오 인증페이지로 리다이렉트 해주는 함수 - 박수범*/
    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };
    return (
        <>
            <OauthBtn bgColor="#fee500" color="#2e2e2e" onClick={kakaoLogin}>
                <RiKakaoTalkFill className="kakaoicon" />
                카카오 계정으로 로그인하기
            </OauthBtn>
        </>
    );
}

export default KakaoBtn;
