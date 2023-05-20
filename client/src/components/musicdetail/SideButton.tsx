import styled from 'styled-components';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { RiDownload2Fill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { commentOpenState, downloadLink } from 'src/recoil/Atoms';
import { useState } from 'react';

function Sidebutton() {
    const [commentOpen, setCommentOpen] = useRecoilState<boolean>(commentOpenState);
    const [like, setLike] = useState<boolean>(false);
    const [download] = useRecoilState<string>(downloadLink);
    console.log(download);
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
            <Button>
                <a href="/music/An+Open+Book+-+Soundroll.mp3" download>
                    <RiDownload2Fill />
                    <span>DOWNLOAD</span>
                </a>
            </Button>
        </SidebtnGroup>
    );
}

export default Sidebutton;

const SidebtnGroup = styled.div`
    display: flex;
    opacity: 0;
    animation: fadeinText2 2s forwards 3.5s;
    > * {
        margin: 20px 20px 0px 20px;
    }
    @keyframes fadeinText2 {
        100% {
            opacity: 1;
        }
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

    a {
        color: #ccc;
        text-decoration: none;
    }
    a:hover {
        color: rgba(199, 68, 68, 1);
    }
`;
