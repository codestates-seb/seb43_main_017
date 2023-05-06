import { useState } from 'react';
import { ButtonStyle } from '../../App'; // 버튼 디자인은 App 컴포넌트와 공유합니다.
import { BlurBackground, SignInBox } from './Signin'; // 로그인과 회원가입은 같은 스타일드 컴포넌트를 공유합니다.

function Signup({ setShowSignUp }: { setShowSignUp: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false); // display closing 모션효과 상태
    /**로 */
    const haldleClose = () => {
        // 회원가입 버튼 클릭 함수. 함수명은 차후에 편한대로 변경해주세요~!
        // 회원가입 axios 요청이 성공했을때 주석사이의 상태변경 함수가 포함되어야합니다.
        setCloseDisplay(!closeDisplay);
        setTimeout(() => {
            setShowSignUp(false);
        }, 1000);
        // 주석 시작부터 여기까지 then 에 넣어주세요!
    };

    return (
        <BlurBackground className={closeDisplay ? 'close-display' : 'null'} onClick={haldleClose}>
            <SignInBox
                className={closeDisplay ? 'out-display' : 'null'}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/**/}
                {/*대충 이 사이쯤 부터 인풋창 하고 이것저것 넣어주시면 될듯해용 ^.^ */}
                {/**/}
                <ButtonStyle onClick={haldleClose}>JOIN</ButtonStyle>
            </SignInBox>
        </BlurBackground>
    );
}

export default Signup;
