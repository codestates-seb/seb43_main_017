import { RiKakaoTalkFill } from 'react-icons/ri';
import { accessToken } from 'src/recoil/Atoms';
import { useSetRecoilState } from 'recoil';
import { OauthBtn } from './Signin';
import axios from 'axios';

function KakaoBtn() {
    const REST_API_KEY = '86b53da526902a3a1b6004af05a90009';
    const REDIRECT_URI = 'http://localhost:3000/oauthloading';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const kakaoLogin = () => {
      window.location.href = KAKAO_AUTH_URL;
    }
    return (
      <>
        <OauthBtn bgColor="#fee500" color="#2e2e2e" onClick={kakaoLogin}>
                <RiKakaoTalkFill className="googleicon" />
                카카오 계정으로 로그인하기
            </OauthBtn>
      </>
    )
  }

export default KakaoBtn;
