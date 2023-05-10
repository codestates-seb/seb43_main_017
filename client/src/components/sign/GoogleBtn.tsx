import { FcGoogle } from 'react-icons/fc';
import { accessToken } from 'src/recoil/Atoms';
import { useSetRecoilState } from 'recoil';
import { OauthBtn } from './Signin';

function GoogleBtn() {
    const BaseUrl = 'https://c2fe-59-17-229-47.ngrok-free.app/members/login';
    const setTokenState = useSetRecoilState(accessToken);

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const GoogleHandler = () => {
        console.log('구글로그인이다.');
        window.location.href = 'https://c2fe-59-17-229-47.ngrok-free.app/oauth2/authorization/google';
        const accesstoken = new URL(
            'https://c2fe-59-17-229-47.ngrok-free.app/oauth2/authorization/google/',
        ).searchParams.get('accesstoken');
        const refreshtoken = new URL(
            'https://c2fe-59-17-229-47.ngrok-free.app/oauth2/authorization/google/',
        ).searchParams.get('refreshToken');
        /*window.localStorage.setItem('access_token', accesstoken);
        setTokenState(localStorage.getItem('access_token'));
        window.localStorage.setItem('refresh_token', refreshtoken);
        setTokenState(localStorage.getItem('refresh_token'));*/
    };

    return (
        <>
            <OauthBtn bgColor="#f9f8f8" color="#2e2e2e" onClick={GoogleHandler}>
                <FcGoogle className="googleicon" />
                구글 계정으로 로그인하기
            </OauthBtn>
        </>
    );
}

export default GoogleBtn;
