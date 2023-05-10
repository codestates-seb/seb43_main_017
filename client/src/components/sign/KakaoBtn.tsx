import { RiKakaoTalkFill } from 'react-icons/ri';
import { accessToken } from 'src/recoil/Atoms';
import { useSetRecoilState } from 'recoil';
import { OauthBtn } from './Signin';

function KakaoBtn() {
    const BaseUrl = 'https://c2fe-59-17-229-47.ngrok-free.app/members/login';
    const setTokenState = useSetRecoilState(accessToken);

    /**2023/05/05 - 카카오 Oauth 로그인 요청 함수 -bumpist  */
    const KakaoHandler = () => {
        console.log('카카오로그인이다.');
    };

    return (
        <>
            <OauthBtn bgColor="#fee500" color="#2e2e2e" onClick={KakaoHandler}>
                <RiKakaoTalkFill className="kakaoicon" />
                카카오 계정으로 로그인하기
            </OauthBtn>
        </>
    );
}

export default KakaoBtn;
