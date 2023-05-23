import styled from 'styled-components';
import { BsPencilSquare } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { titleState, bodyState, modifyClickState, musicDataListState, UpdataModify } from 'src/recoil/Atoms';
import { ModifyTargetData } from 'src/types/myplaylist';

function ModifyPlaylist() {
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [musicDataList, setMusicDataList] = useRecoilState(musicDataListState);
    const [update, setUpdate] = useState<boolean>(false);
    const [ModifyPlaylistId] = useRecoilState(modifyClickState);
    const [title, setTitle] = useRecoilState(titleState);
    const [body, setBody] = useRecoilState(bodyState);
    const [isEditing, setIsEditing] = useState(false);
    const [modifyTarget, setModifyTarget] = useState<ModifyTargetData | undefined>();

    const [UpdateState, setUpdateState] = useRecoilState(UpdataModify);

    /** 2023.05.22  마이플레이리스트 단일 조회 요청 - 홍혜란 */
    useEffect(() => {
        // 플레이리스트 가져오는 함수
        const fetchMyplaylistData = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}/playlists/${ModifyPlaylistId}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    setModifyTarget(response.data.data);
                    setUpdateState(!UpdateState);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        /** 2023.05.23 마이플레이리스트 음악 전체 조회 - 홍혜란 */
        const fetchMusicData = () => {
            axios
                .get(`${process.env.REACT_APP_API_URL}/musics/playlists/${ModifyPlaylistId}`)
                .then((response) => {
                    setMusicDataList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchMyplaylistData();
        fetchMusicData();
    }, [update]);

    /** 2023.05.22 모디파이플레이리스트 이름, 코멘트 수정 input 처리 - 홍혜란 */
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            sendRequestToServer();
        }
    };

    const handleLeave = () => {
        setIsEditing(true);
    };

    /* 2023.05.22 모디파이 플레이리스트 이름, 코멘트 수정 요청 */
    const sendRequestToServer = () => {
        axios
            .patch(
                `${process.env.REACT_APP_API_URL}/playlists/${ModifyPlaylistId}`,
                {
                    title: title,
                    body: body,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            )
            .then(() => {
                setUpdate(!update);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /* 2023.05.22 모디파이 플레이리스트 노래 삭제 요청 */
    const handleDeletePlaylist = (musicId: number) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/playlists/${ModifyPlaylistId}/musics/${musicId}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(() => {
                setUpdate(!update);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <ModifyContainer>
            <div className="modify-title">
                <div className="pencil-icon">
                    <BsPencilSquare />
                </div>
                <p>MODIFY PLAYLIST</p>
            </div>
            <ModiCointainer>
                <ModifyList>
                    <Plcard onClick={handleLeave}>
                        {modifyTarget && (
                            <div className="back-img">
                                <img src={modifyTarget.coverImg} alt={modifyTarget.createMember} />
                                <div className="pl-contents">
                                    <Pluser>
                                        <span>WTITER</span>
                                        <span>{modifyTarget.createMember}</span>
                                        <span>LIKE</span>
                                        <span>{modifyTarget.likeCount}</span>
                                    </Pluser>
                                    <Pltext>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={title}
                                                    onChange={handleTitleChange}
                                                    onKeyPress={handleKeyPress}
                                                />
                                                <textarea
                                                    value={body}
                                                    onChange={handleBodyChange}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </div>
                                        ) : (
                                            <div className="pl-name" onClick={() => setIsEditing(true)}>
                                                <span>{modifyTarget.title}</span>
                                                <span>{modifyTarget.body}</span>
                                            </div>
                                        )}
                                    </Pltext>
                                </div>
                            </div>
                        )}
                    </Plcard>
                    <PlyList>
                        {Array.isArray(musicDataList) &&
                            musicDataList.map((musicData) => (
                                <div className="plyItem" key={musicData.musicId}>
                                    <img src={musicData.albumCoverImg} alt={musicData.musicName} />
                                    <span>{musicData.musicName}</span>
                                    <span>{musicData.artistName}</span>
                                    <span>{musicData.albumName}</span>
                                    <span>
                                        <VscClose onClick={() => handleDeletePlaylist(musicData.musicId)} />
                                    </span>
                                </div>
                            ))}
                    </PlyList>
                </ModifyList>
            </ModiCointainer>
        </ModifyContainer>
    );
}

export default ModifyPlaylist;

/* 2023.05.12 플레이리스트 수정 박스 컴포넌트 구현 - 홍혜란 */
const ModifyContainer = styled.div`
    align-items: center;
    margin: 30px;
    opacity: 0;
    transform: translateX(-20px);
    animation: slideIn 1s ease-in-out forwards;
    width: 400px;

    .modify-title {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .pencil-icon {
            font-size: 16px;
            color: hsl(154, 100%, 40%);
            padding-top: 5px;
        }

        p {
            font-size: 16px;
            color: #ffffff;
            margin-left: 5px;
        }
    }
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const ModiCointainer = styled.div`
    display: flex;
`;

const ModifyList = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

/**2023-05-06 플리 슬라이드 카드 섹션 : 김주비 */
const Plcard = styled.div`
    position: relative;
    width: 450px;
    height: 200px;
    border-radius: 20px 20px 0 0;
    background-size: cover;
    color: #ddd;
    overflow: hidden;

    .back-img {
        z-index: 1;
        img {
            width: 450px;
            height: 200px;
            filter: blur(5px);
        }
    }

    .pl-treck {
        position: absolute;
        top: 30px;
        right: 30px;
        font-weight: 600;
    }
    .pl-contents {
        position: absolute;
        bottom: 30px;
        left: 30px;

        .pl-name {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
        }
    }
    input {
        width: 150px;
        height: 20px;
        border: none;
        outline: none;
        background-color: hsl(0, 0%, 0%, 0.5);
        border-radius: 5px;
        color: white;
        margin: 10px 0px 0px 0px;
    }
    textarea {
        width: 300px;
        height: 20px;
        border: none;
        outline: none;
        background-color: hsl(0, 0%, 0%, 0.5);
        color: white;
        margin: 10px 0px 0px 0px;
        border-radius: 5px;
    }
    @media screen and (max-width: 1000px) {
        width: 400px;
        margin: 0;
    }
`;

/**2023-05-06 슬라이드 유저정보 : 김주비 */
const Pluser = styled.div`
    margin-top: 20px;
    font-size: 0.8rem;
    color: #000000;
    > span {
        margin-right: 15px;
    }
    span:nth-child(2n + 1) {
        font-weight: 800;
        color: #ff8716;
    }
`;
/**2023-05-06 슬라이드 텍스트 : 김주비 */
const Pltext = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    > span {
        margin-top: 10px;
    }
    span:nth-child(1) {
        color: #000000;
        letter-spacing: -0.5px;
        font-size: 1.6rem;
        min-width: 103%;
        word-break: break-all;
        font-weight: 600;
    }
    span:nth-child(2) {
        margin-top: 20px;
        line-height: 140%;
        opacity: 0.5;
        width: 80%;
        font-size: 0.7rem;
        color: #000000;
    }
    @media (max-width: 600px) {
        span:nth-child(1) {
            font-size: 1rem;
        }
    }
`;

/* 2023.05.12 플레이리스트 수정 박스 음악리스트 컴포넌트 구현 - 홍혜란 */
const PlyList = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #272727;
    width: 450px;
    height: 300px;
    overflow: auto;
    border-radius: 0 0 20px 20px;

    .plyItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid hsl(0, 0%, 65%);
        padding: 15px;

        img {
            width: 30px;
            height: 30px;
            border-radius: 10%;
        }

        span {
            font-size: 14px;
            color: white;
        }

        li:nth-child(2) {
            font-weight: bold;
        }
        li:nth-child(n + 3):nth-child(-n + 4) {
            color: hsl(0, 0%, 72%);
        }
    }
    @media screen and (max-width: 1000px) {
        width: 400px;
        margin: 0;
    }
`;
