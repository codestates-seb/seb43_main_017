import { SiNaver } from 'react-icons/si';
import { accessToken } from 'src/recoil/Atoms';
import { useSetRecoilState } from 'recoil';
import { OauthBtn } from './Signin';

function NaverBtn() {
    const BaseUrl = 'https://c2fe-59-17-229-47.ngrok-free.app/members/login';
    const setTokenState = useSetRecoilState(accessToken);

    /**2023/05/05 - 로그인 시 서버로부터 받아 온 Access토큰을 로컬스토리지에 저장하고 로그인 모달을 종료한다 -bumpist  */
    const NaverHandler = () => {
        console.log('네이버로그인이다.');
    };

    return (
        <>
            <OauthBtn bgColor="#15c654" color="#fff" onClick={NaverHandler}>
                <SiNaver className="navericon" />
                네이버 계정으로 로그인하기
            </OauthBtn>
        </>
    );
}

export default NaverBtn;
