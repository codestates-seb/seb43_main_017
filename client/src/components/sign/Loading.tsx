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
    const BaseUrl = `${process.env.REACT_APP_API_URL}/members/oauth/signup`;
    /** 2023/05/16 - 로딩페이지(콜백리다이렉트)로 이동시, 네이버 요청인 경우 - 박수범 */
    if (location.hash) {
        const { naver } = window;
        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
            callbackUrl: process.env.REDIRECT_URI,
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
                // 유저정보 로컬스토리지에 저장.
                window.localStorage.setItem('useremail', userid);
                window.localStorage.setItem('usernickname', username);
                window.localStorage.setItem('userimg', userimg);
                // 추출한 데이터를 백엔드 서버로 보내준다.
                axios
                    .post<LoginPost>(`${BaseUrl}/naver`, {
                        email: userid,
                        name: username,
                        profileimg: userimg,
                    })
                    .then((res) => {
                        if (res.status === 200 && res.headers.authorization !== undefined) {
                            window.localStorage.setItem('access_token', res.headers.authorization);
                            window.localStorage.setItem('refresh_token', res.headers.refresh);
                            window.localStorage.setItem('memberId', res.headers.memberid);
                            window.location.href = '/';
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
            window.localStorage.setItem('access_token', `Bearer ${googletoken}`);
            window.localStorage.setItem('refresh_token', googlerefresh);
            axios
                .get(`${process.env.REACT_APP_API_URL}/members/info`, {
                    headers: {
                        Authorization: `Bearer ${googletoken}`,
                    },
                })
                .then((res) => {
                    const googleemail = res.data.data.email.slice(0, -1);
                    const googleickname = res.data.data.name;
                    const googleimg = res.data.data.image;
                    const googlememberid = res.data.data.memberId;
                    window.localStorage.setItem('useremail', googleemail);
                    window.localStorage.setItem('usernickname', googleickname);
                    window.localStorage.setItem('userimg', googleimg);
                    window.localStorage.setItem('memberId', googlememberid);
                    window.location.href = '/';
                });
        }
        /** 2023/05/16 - 카카오 요청인 경우 - 박수범 */
        if (kakaocode) {
            // 카카오 인가코드를 통해 엑세스 토큰을 요청
            axios
                .post(
                    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${kakaocode}&client_secret=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}`,
                    {
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                    },
                )
                .then((res) => {
                    // 카카오 엑세스토큰을 이용하여 유저정보를 요청
                    axios
                        .get(`https://kapi.kakao.com/v2/user/me`, {
                            headers: {
                                Authorization: `Bearer ${res.data.access_token}`,
                            },
                        })
                        .then((res) => {
                            // 유저 이메일,닉네임,프로필이미지 뽑아주고,
                            const kakaoemail = res.data.kakao_account.email;
                            const kakaonickname = res.data.properties.nickname;
                            const kakaoimg = res.data.properties.profile_image;
                            // 만약 카카오 정보제공동의를 하지 않은 경우에는. 알림창이뜨며 메인창으로 리다이렉트된다.
                            if (!kakaoemail) {
                                localStorage.removeItem('useremail');
                                alert('이메일 제공에 동의를 하시지 않으면 로그인이 불가능합니다.');
                                window.location.href = '/';
                            }
                            // 유저정보 로컬스토리지에 저장.
                            window.localStorage.setItem('useremail', kakaoemail);
                            window.localStorage.setItem('usernickname', kakaonickname);
                            window.localStorage.setItem('userimg', kakaoimg);
                            if (kakaoemail) {
                                // 카카오에서 받아온 유저정보를 백엔드 서버로 보내주고 토큰을 요청
                                axios
                                    .post<LoginPost>(`${BaseUrl}/kakao`, {
                                        email: kakaoemail,
                                        name: kakaonickname,
                                        profileimg: kakaoimg,
                                    })
                                    .then((res) => {
                                        if (res.status === 200 && res.headers.authorization !== undefined) {
                                            window.localStorage.setItem('access_token', res.headers.authorization);
                                            window.localStorage.setItem('refresh_token', res.headers.refresh);
                                            window.localStorage.setItem('memberId', res.headers.memberid);
                                            window.location.href = '/';
                                        }
                                    });
                            }
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
