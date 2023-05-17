import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { BsMusicPlayer, BsPlayCircle } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import { modalState } from 'src/recoil/Atoms';

/* 2023.05.10 마이플레이스트 타입 선언 - 홍혜란 */
type PlayData = {
    id: number;
    imgSrc: string;
    name: string;
    time: string;
    vote: number;
};

/* 2023.05.10 마이플레이스트 더미데이터(임시) - 홍혜란 */
const MyPlay: PlayData[] = [
    {
        id: 0,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        time: '2023.05.04',
        vote: 13,
    },
    {
        id: 1,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        time: '2023.05.04',
        vote: 13,
    },
    {
        id: 2,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        time: '2023.05.04',
        vote: 13,
    },
];

const Myplaylist = () => {
    const playlistData = MyPlay;

    /* 2023.05.16 마이플레이리스트 메뉴 버튼 클릭시 수정, 삭제 버튼 모달 - 홍혜란 */
    const [showModal, setShowModal] = useRecoilState<boolean>(modalState);

    return (
        <PlayListContainer>
            <div className="playlist-title">
                <div className="play-icon">
                    <BsMusicPlayer />
                </div>
                <p>MY PLAYLIST</p>
            </div>

            {playlistData.map((data) => (
                <div className="playlist-list">
                    <img src={data.imgSrc} alt="musicimg" />
                    <li>{data.name}</li>
                    <li>{data.time}</li>
                    <div className="playlist-vote-icon">
                        <AiFillHeart />
                        {data.vote}
                    </div>
                    <div className="playlist-button">
                        <BsPlayCircle />
                    </div>
                    <div
                        className="playlist-menu"
                        onClick={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        <CiMenuKebab />
                        {showModal && (
                            <ModalContainer>
                                <ModalButtons>
                                    <Button>수정</Button>
                                    <Button>삭제</Button>
                                </ModalButtons>
                            </ModalContainer>
                        )}
                    </div>
                </div>
            ))}
        </PlayListContainer>
    );
};

export default Myplaylist;

/* 2023.05.07 마이플레이리스트 컴포넌트 구현 - 홍혜란 */
const PlayListContainer = styled.div`
    align-items: center;
    margin: 30px;
    margin-top: 40px;
    width: 450px;

    .playlist-title {
        display: flex;
        align-items: center;

        .play-icon {
            font-size: 16px;
            color: hsl(216, 100%, 50%);
            display: flex;
            align-items: center;
        }

        p {
            font-size: 16px;
            color: #ffffff;
            margin-left: 5px;
        }
    }

    .playlist-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(43, 43, 43, 0.8);
        margin-top: 20px;

        img {
            width: 50px;
            height: 50px;
        }

        li {
            font-size: 12px;
            color: white;
        }

        li:nth-child(3) {
            font-size: 10px;
        }

        .playlist-vote-icon {
            font-size: 12px;
            color: rgb(245, 109, 109);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .playlist-button {
            font-size: 16px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .playlist-menu {
            font-size: 16px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    @media screen and (max-width: 1000px) {
        width: 400px;
    }
`;

/* 2023.05.16 마이플레이리스트 메뉴 모달 컴포넌트 - 홍혜란 */
const ModalContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
`;

/* 2023.05.16 마이플레이리스트 메뉴 모달 버튼 컴포넌트 - 홍혜란 */
const ModalButtons = styled.div`
    display: flex;
    flex-direction: column;
`;

/* 2023.05.16 마이플레이리스트 메뉴 모달 버튼 컴포넌트 - 홍혜란 */
const Button = styled.button`
    margin-left: 10px;
    background-color: rgba(43, 43, 43, 0.8);
    border: none;
    color: white;
    font-size: 10px;
    padding: 5px;
`;
