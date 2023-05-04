import { useState } from 'react';
// import styled from 'styled-components';
import { ButtonStyle } from '../../App';
import { BlurBackground, SignInBox } from './Signin';

function Signup({ setShowSignUp }: { setShowSignUp: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [closeDisplay, setCloseDisplay] = useState<boolean>(false);

    const haldleClose = () => {
        setCloseDisplay(!closeDisplay);
        setTimeout(() => {
            setShowSignUp(false);
        }, 1000);
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
                {/*여기에 인풋창 하고 이것저것 넣어주시면 될듯용*/}
                {/**/}
                <ButtonStyle onClick={haldleClose}>SIGNUP</ButtonStyle>
            </SignInBox>
        </BlurBackground>
    );
}

export default Signup;
