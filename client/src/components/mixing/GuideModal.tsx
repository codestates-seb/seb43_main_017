import styled from 'styled-components';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { GuideModalState } from 'src/recoil/Atoms';
import { MdTransitEnterexit } from 'react-icons/md';
const GuideModal = () => {
    const setGuideModal = useSetRecoilState(GuideModalState);
    return (
        <ModalContainer>
            <p>1.영상을 업로드한다.</p>
            <p>2.촤측에 좋아요한 음원 리스트에서 + 버튼을 눌러 음원을 선택한다.</p>
            <p>3.영상 아래 컨트롤바를 통해 재생/정지/음원 사운드를 조절한다.</p>
            <p>4.내 영상과 음원의 핏이 맞는지 확인한다.</p>
            <p>5.마음에 들었다면 음원을 다운받으러 간다.</p>
            <Exitbox onClick={() => setGuideModal(false)}>
                <MdTransitEnterexit />
            </Exitbox>
        </ModalContainer>
    );
};

const ModalContainer = styled.div`
    height: 80vh;
    width: 80vw;
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 100px;
    top: 0;
    background: rgba(63, 59, 59, 0.25);
    box-shadow: 0 8px 32px 0 rgba(113, 119, 207, 0.57);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Exitbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    color: rgba(199, 68, 68, 1);
    text-align: center;
    border: 2px solid rgba(199, 68, 68, 1);
    cursor: pointer;
    :hover {
        color: #ccc;
        border-color: #ccc;
    }
`;
export default GuideModal;
