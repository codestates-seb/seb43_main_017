import styled from 'styled-components';
import axios from 'axios';
import { LoginPost } from '@/types/AxiosInterface';

export const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
`;

export const Loading = () => {
    const BaseUrl = 'http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/oauth/signup';
    /** 2023/05/16 - 로딩페이지(콜백리다이렉트)로 이동시, 네이버 요청인 경우 - 박수범 */
    if (location.hash) {
        const { naver } = window;
        const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
        const naverLogin = new naver.LoginWithNaverId({
            clientId: CLIENT_ID,
            callbackUrl: 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com/oauthloading',
            isPopup: false,
            callbackHandle: false,
        });
        naverLogin.init();
        naverLogin.getLoginStatus(async function (status: any) {
            if (status) {
                // 유저 이메일,닉네임,프로필이미지 뽑아주고,
                const userid = naverLogin.user.getEmail();
                const username = naverLogin.user.getNickName();
                const userimg = naverLogin.user.getProfileImage();
                console.log(naverLogin.user);
                // 추출한 데이터를 백엔드 서버로 보내준다.
                axios
                    .post<LoginPost>(`${BaseUrl}`, {
                        email: userid,
                        name: username,
                        profileimg: userimg,
                    })
                    .then((res) => {
                        if (res.status === 200 && res.headers.authorization !== undefined) {
                            window.localStorage.setItem('access_token', res.headers.authorization);
                            window.localStorage.setItem('refresh_token', res.headers.Refresh);
                            window.location.href = 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com';
                        }
                    });
            }
        });
    }
    /** 2023/05/16 - 로딩페이지(콜백리다이렉트)로 이동시, 카카오,구글 요청인 경우 - 박수범 */
    if (location.search) {
        const kakaocode = window.location.search.split('=')[1];
        const googletoken = new URL(location.href).searchParams.get('access_token');
        const googlerefresh = new URL(location.href).searchParams.get('refresh_token');

        /** 2023/05/16 - 구글 요청인 경우 - 박수범 */
        if (googlerefresh && googletoken) {
            window.localStorage.setItem('access_token', googletoken);
            window.localStorage.setItem('refresh_token', googlerefresh);
            window.location.href = 'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com';
        }
        /** 2023/05/16 - 카카오 요청인 경우 - 박수범 */
        if (kakaocode) {
            axios
                .post(
                    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=86b53da526902a3a1b6004af05a90009&redirect_uri=http://localhost:3000/oauthloading&code=${kakaocode}&client_secret=c9IiwGJ51rps4uvI0kG1vhUrDhkvo695`,
                    {
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                    },
                )
                .then((res) => {
                    window.localStorage.setItem('access_token', res.data.access_token);
                    window.localStorage.setItem('refresh_token', res.data.refresh_token);
                    console.log(res.data);
                    axios
                        .get(`https://kapi.kakao.com/v2/user/me`, {
                            headers: {
                                Authorization: `Bearer ${res.data.access_token}`,
                            },
                        })
                        .then((res) => {
                            console.log(res.data);
                            const kakaoemail = res.data.kakao_account.email;
                            const kakaonickname = res.data.properties.nickname;
                            const kakaoimg = res.data.properties.profile_image;
                            axios
                                .post<LoginPost>(`${BaseUrl}`, {
                                    email: kakaoemail,
                                    name: kakaonickname,
                                    profileimg: kakaoimg,
                                })
                                .then((res) => {
                                    if (res.status === 200 && res.headers.authorization !== undefined) {
                                        window.localStorage.setItem('access_token', res.headers.authorization);
                                        window.localStorage.setItem('refresh_token', res.headers.Refresh);
                                        window.location.href =
                                            'http://mainproject-uncover.s3-website.ap-northeast-2.amazonaws.com';
                                    }
                                });
                        });
                });
        }
    }
    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요...</LoadingText>
            <img src="./assets/Dual Ring-1s-124px.gif"></img>
        </Background>
    );
};

export default Loading;
