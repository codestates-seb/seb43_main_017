import styled from 'styled-components';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { RiDownload2Fill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { commentOpenState, downloadLink, showDownloadState } from 'src/recoil/Atoms';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebutton() {
    const musicId = sessionStorage.getItem('musicId');
    const onPlaylist = sessionStorage.getItem('onPlaylist');
    const memberId = localStorage.getItem('memberId');
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [commentOpen, setCommentOpen] = useRecoilState<boolean>(commentOpenState);
    const [ShowDownload] = useRecoilState<boolean>(showDownloadState);
    const [like, setLike] = useState<boolean>(false);
    const [download] = useRecoilState<string>(downloadLink);
    const [update, setupDate] = useState<boolean>(false);

    const handleLike = () => {
        if (onPlaylist === 'true') {
            if (!token) {
                alert('로그인을 진행해주세요');
            } else {
                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/playlists/${musicId}/like`,
                        {},
                        {
                            headers: {
                                Authorization: token,
                            },
                        },
                    )
                    .then(() => {
                        setupDate(!update);
                    });
            }
        } else {
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
                    .then(() => {
                        setupDate(!update);
                    });
            }
        }
    };

    useEffect(() => {
        if (onPlaylist === 'true') {
            if (token) {
                axios.get(`${process.env.REACT_APP_API_URL}/playlists/members/${memberId}/like`).then((response) => {
                    const data = response.data;
                    const likedMusicIds = data.map((item: { playListId: number }) => item.playListId); //조회된 멤버의 좋아요 뮤직아이디
                    setLike(likedMusicIds.includes(Number(musicId))); // 현재 조회된 음악의 아이디와 지금 아이디가 겹치면 트루.
                });
            }
        } else {
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
                        setLike(likedMusicIds.includes(Number(musicId))); // 현재 조회된 음악의 아이디와 지금 아이디가 겹치면 트루.
                    });
            }
        }
    }, [update]);

    return (
        <SidebtnGroup>
            <Button onClick={handleLike}>
                {like ? <HiHeart /> : <HiOutlineHeart />}
                <span> LIKE</span>
            </Button>
            <Button
                onClick={() => {
                    setCommentOpen(!commentOpen);
                }}
            >
                <BiMessageSquareAdd />
                <span>COMMENT</span>
            </Button>
            {ShowDownload ? (
                <Button>
                    {token ? (
                        <a href={`/assets/music/${download}`} download>
                            <RiDownload2Fill />
                            <span>DOWNLOAD</span>
                        </a>
                    ) : (
                        <span
                            className="box-center"
                            onClick={() => {
                                alert('로그인된 회원만 음원 다운로드가 가능합니다.');
                            }}
                        >
                            <RiDownload2Fill />
                            <span>DOWNLOAD</span>
                        </span>
                    )}
                </Button>
            ) : null}
        </SidebtnGroup>
    );
}

export default Sidebutton;

const SidebtnGroup = styled.div`
    display: flex;
    opacity: 0;
    animation: fadeinText2 2s forwards 2s;
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
    .box-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
