import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { OauthBtn } from './Signin';
import axios from 'axios';

const GoogleBtn = () => {
    const BaseUrl = 'ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/oauth/signup';
    const googleSocialLogin = useGoogleLogin({
        scope: 'email profile',
        onSuccess: async ({ code }) => {
            axios.post(`${BaseUrl}`, { code }).then(({ data }) => {
                console.log(data);
            });
        },
        onError: (errorResponse) => {
            console.error(errorResponse);
        },
        flow: 'auth-code',
    });

    return (
        <OauthBtn bgColor="#f6f6f2" color="#2e2e2e" onClick={googleSocialLogin}>
            <FcGoogle className="googleicon" />
            구글 계정으로 로그인하기
        </OauthBtn>
    );
};

export default GoogleBtn;
