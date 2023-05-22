import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { BsMusicPlayer, BsPlayCircle, BsPlusSquare } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import { modalState } from 'src/recoil/Atoms';
import { useState } from 'react';
import { atom } from 'recoil';
import axios from 'axios';

/* 2023.05.10 마이플레이스트 타입 선언 */
interface PlayData {
    playListId: number;
    imgSrc: string;
    name: string;
    vote: number;
}

/* 2023.05.10 마이플레이스트 더미데이터(임시) */
const MyPlay: PlayData[] = [
    {
        playListId: 0,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        vote: 13,
    },
    {
        playListId: 1,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        vote: 13,
    },
    {
        playListId: 2,
        imgSrc: './assets/ditto.png',
        name: '나만의 플레이리스트',
        vote: 13,
    },
];

const playlistState = atom<PlayData[]>({
    key: 'playlistState',
    default: [],
});

const Myplaylist = () => {
    const playlistData = MyPlay;

    /* 2023.05.16 마이플레이리스트 메뉴 버튼 클릭시 수정, 삭제 버튼 모달 */
    const [showModal, setShowModal] = useRecoilState<boolean>(modalState);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);

    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;

    /* 2023.05.21 마이플레이리스트 생성 */
    const MyplaylistCreate = () => {
        axios
            .post(
                `/playlists`,
                {
                    playListId: '1',
                    title: '제목1',
                },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            )
            .then(() => {
                console.log();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /* 2023.05.16 마이플레이리스트 삭제 */
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    const handleDelete = (playlistId: number) => {
        const updatedPlaylist = playlist.filter((data) => data.playListId !== playlistId);
        setPlaylist(updatedPlaylist);

        axios
            .delete(`/playlists/{playlist-id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(() => {
                console.log('플레이리스트 아이템이 성공적으로 삭제되었습니다.');
            })
            .catch((error) => {
                console.error('플레이리스트 아이템 삭제 중 오류가 발생했습니다:', error);
                setPlaylist(playlist);
            });
    };

    /* 2023.05.21 마이플레이리스트 수정 */
    // const MyplaylistModify = () => {
    //     axios
    //         .patch(
    //             `/playlists/{playlist-id}`,
    //             {
    //                 playListId: '1',
    //                 title: '제목1',
    //             },
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             },
    //         )
    //         .then(() => {
    //             console.log();
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    /* 2023.05.21 마이플레이리스트 음악 삭제 */
    // const MyplaylistMusic = () => {
    //     axios
    //         .delete(
    //             `/playlists/{playlist-id}/musics/{music-id}`,
    //             {
    //                 musicId: 1,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             },
    //         )
    //         .then(() => {
    //             console.log();
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    return (
        <PlayListContainer>
            <div className="playlist-title">
                <div className="play-icon">
                    <BsMusicPlayer />
                </div>
                <p>MY PLAYLIST</p>
                <li>
                    <BsPlusSquare onClick={MyplaylistCreate} />
                </li>
            </div>

            {playlistData.map((data) => (
                <div className="playlist-list">
                    <img src={data.imgSrc} alt="musicimg" />
                    <li>{data.name}</li>
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
                            setSelectedPlaylistId(data.playListId);
                            setShowModal(!showModal);
                        }}
                    >
                        <CiMenuKebab />
                        {selectedPlaylistId === data.playListId && showModal && (
                            <ModalContainer>
                                <ModalButtons>
                                    <Button>수정</Button>

                                    <Button onClick={() => handleDelete(data.playListId)}>삭제</Button>
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
    width: 400px;

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

        li {
            color: white;
            margin-left: 8px;
            display: flex;
            align-items: center;
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
        margin: 0;
        margin-top: 50px;
        margin-left: 30px;
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
