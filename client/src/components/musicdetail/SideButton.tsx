import styled from 'styled-components';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { commentOpenState } from 'src/recoil/Atoms';
import { useState } from 'react';

function Sidebutton() {
    const [commentOpen, setCommentOpen] = useRecoilState<boolean>(commentOpenState);
    const [like, setLike] = useState<boolean>(false);

    return (
        <SidebtnGroup>
            <Button
                onClick={() => {
                    setLike(!like);
                }}
            >
                {like ? <HiOutlineHeart /> : <HiHeart />}
                <span>6 LIKE</span>
            </Button>
            <Button
                onClick={() => {
                    setCommentOpen(!commentOpen);
                }}
            >
                <BiMessageSquareAdd />
                <span>COMMENT</span>
            </Button>
        </SidebtnGroup>
    );
}

export default Sidebutton;

const SidebtnGroup = styled.div`
    display: flex;
    > * {
        margin: 40px 20px 0px 20px;
    }
`;
const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Rajdhani', sans-serif;
    cursor: pointer;
    :hover {
        color: rgba(199, 68, 68, 1);
    }
    span {
        margin-left: 10px;
    }
`;
