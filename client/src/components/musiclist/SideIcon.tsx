import { FiPlayCircle, FiFolderPlus } from 'react-icons/fi';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { type } from 'os';

interface SideiconProps {
    musicId: number;
    musicUri: string;
}

const Sideicon: React.FC<SideiconProps> = ({ musicId, musicUri }) => {
    const [like, setLike] = useState<boolean>(false);
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/playlists/member-playlist`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                console.log(res.data);
            });
    }, []);
    const handleAddPlaylist = () => {
        console.log('유저리스트 조회');
    };
    const handleLike = () => {
        if (!token) {
            console.log('로그인을 진행해주세요');
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
                .get('http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/musics/liked-musics', {
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
            <AddPlayList onClick={handleAddPlaylist}>
                <FiFolderPlus />
            </AddPlayList>

            <a href={`/assets/music/${musicUri}`} download>
                <MdFileDownload />
            </a>
            {like ? (
                <HiHeart onClick={handleLike} className="color-red like-action" />
            ) : (
                <HiOutlineHeart onClick={handleLike} className="color-red" />
            )}
        </MusicIconGroup>
    );
};

export default Sideicon;

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
`;

const AddPlayList = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ccc;
`;
