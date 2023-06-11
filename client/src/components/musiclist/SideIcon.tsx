import { FiPlayCircle, FiFolderPlus } from 'react-icons/fi';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { playListModalState, getMusicIdState } from 'src/recoil/Atoms';

interface SideiconProps {
    musicId: number;
    musicUri: string;
}

const Sideicon: React.FC<SideiconProps> = ({ musicId, musicUri }) => {
    const [like, setLike] = useState<boolean>(false);
    const setPlayListState = useSetRecoilState(playListModalState);
    const setMusicIdState = useSetRecoilState(getMusicIdState);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;

    const handleLike = () => {
        if (!token) {
            alert('로그인을 진행해주세요');
        } else {
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/music-like/toggle`,
                    {
                        musicId: musicId,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    setLike(typeof response.data.musicLikeId === 'number');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (token) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/musics/liked-musics`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    const data = response.data.data;
                    const likedMusicIds = data.map((item: { musicId: number }) => item.musicId); //조회된 멤버의 좋아요 뮤직아이디
                    setLike(likedMusicIds.includes(musicId)); // 현재 조회된 음악의 아이디와 지금 아이디가 겹치면 트루.
                });
        }
    }, []);

    return (
        <MusicIconGroup>
            <Link to={`/musiclist/${musicId}`}>
                <FiPlayCircle className="color-blue" />
            </Link>

            <AddPlayList
                onClick={() => {
                    setPlayListState(true);
                    setMusicIdState(musicId);
                }}
                className="view-700"
            >
                <FiFolderPlus />
            </AddPlayList>
            {token ? (
                <a href={`/assets/music/${musicUri}`} download>
                    <MdFileDownload className="view-700" />
                </a>
            ) : (
                <MdFileDownload
                    className="view-700"
                    onClick={() => {
                        alert('로그인된 회원만 음원 다운로드가 가능합니다.');
                    }}
                />
            )}
            {like ? (
                <HiHeart onClick={handleLike} className="color-red like-action view-700" />
            ) : (
                <HiOutlineHeart onClick={handleLike} className="color-red view-700" />
            )}
        </MusicIconGroup>
    );
};

export default Sideicon;
/**2023/05/23 - 플레이리스트 옆에 아이콘 그룹 - 박수범 */
const MusicIconGroup = styled.li`
    > * {
        margin: 0px 20px;
        font-size: 1rem;
    }
    .color-blue {
        color: #6e9cff;
        font-size: 1.5rem;
        transition: 0.2s ease-in-out;
    }
    .color-blue:hover {
        color: #a3c0ff;
    }

    .color-red {
        color: rgba(199, 68, 68, 1);
    }
    .like-action {
        animation: likeaction 0.5s forwards;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    @keyframes likeaction {
        50% {
            transform: scale(1.5);
            color: #ff7777;
        }
    }
    @media (max-width: 1200px) {
        > * {
            margin: 0px 10px;
        }
    }

    @media (max-width: 700px) {
        max-width: 80px;
        .view-700 {
            display: none;
        }
        > * {
            margin: 0px;
        }
    }
`;

/**2023/05/23 - 플레이리스트에 음악을 추가하는 모달창을 띄워주는 버튼 - 박수범 */
const AddPlayList = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ccc;
`;
