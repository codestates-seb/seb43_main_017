import { FcGoogle } from 'react-icons/fc';
import { OauthBtn } from './Signin';
const GoogleBtn = () => {
    const googleSocialLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
    };

    return (
        <OauthBtn bgColor="#f6f6f2" color="#2e2e2e" onClick={googleSocialLogin}>
            <FcGoogle className="googleicon" />
            구글 계정으로 로그인하기
        </OauthBtn>
    );
};

export default GoogleBtn;
