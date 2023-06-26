import styled from 'styled-components';
import { RiPencilRuler2Fill, RiDeleteBack2Line } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    titleState,
    bodyState,
    modifyClickState,
    musicDataListState,
    UpdataModify,
    modifyDataState,
} from 'src/recoil/Atoms';
import { ModifyTargetData } from 'src/types/myplaylist';
import { Link } from 'react-router-dom';

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
    const setLeaveModify = useSetRecoilState(modifyDataState);

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
        setIsEditing(false);
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
                <RiPencilRuler2Fill className="pencil-icon" />
                <p>MODIFY PLAYLIST</p>
                <Exitbtn
                    onClick={() => {
                        setLeaveModify(false);
                    }}
                >
                    <TiDeleteOutline />
                </Exitbtn>
            </div>
            <ModiCointainer>
                <ModifyList>
                    <Plcard>
                        {modifyTarget && (
                            <div className="back-img">
                                <img
                                    src={modifyTarget.coverImg}
                                    alt={modifyTarget.createMember}
                                    onClick={handleLeave}
                                />
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
                                                    defaultValue={modifyTarget.title}
                                                    value={title}
                                                    onChange={handleTitleChange}
                                                    onKeyDown={handleKeyPress}
                                                />
                                                <textarea
                                                    defaultValue={modifyTarget.body}
                                                    value={body}
                                                    onChange={handleBodyChange}
                                                    onKeyDown={handleKeyPress}
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
                            musicDataList.map((musicData, index) => (
                                <ul className="plyItem" key={musicData.musicId}>
                                    <li className="index-number mini-size">{index + 1}</li>
                                    <li className="coverImg mini-size">
                                        <Link to={`/musiclist/${musicData.musicId}`}>
                                            <img src={musicData.albumCoverImg} alt={musicData.musicName} />
                                        </Link>
                                    </li>
                                    <li className="music-name">
                                        <p>{musicData.musicName}</p>
                                        <p>{musicData.artistName}</p>
                                    </li>

                                    <li className="mini-size delete-btn">
                                        <RiDeleteBack2Line onClick={() => handleDeletePlaylist(musicData.musicId)} />
                                    </li>
                                </ul>
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
    opacity: 0;
    transform: translateX(-20px);
    animation: slideIn 1s forwards;
    width: 400px;

    .modify-title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        .pencil-icon {
            font-size: 16px;
            color: hsl(154.15384615384616, 57.01754385964912%, 55.294117647058826%);
            padding-top: 5px;
        }
        p {
            font-size: 1rem;
            color: #ffffff;
            margin-left: 5px;
        }
    }
    @keyframes slideIn {
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
    width: 400px;
    height: 150px;
    border-radius: 20px 20px 0 0;
    background-size: cover;
    color: #ddd;
    overflow: hidden;

    .back-img {
        background-color: #000;
        img {
            width: 400px;
            height: 200px;
            opacity: 0.4;
        }
    }
    .pl-contents {
        position: absolute;
        bottom: 30px;
        left: 30px;

        .pl-name {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            color: #ccc;
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
    > span {
        margin-right: 15px;
    }
    span:nth-child(2n + 1) {
        font-weight: 800;
        color: #ff4545;
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
        letter-spacing: -0.5px;
        font-size: 1.6rem;
        min-width: 103%;
        word-break: break-all;
        font-weight: 600;
    }
    span:nth-child(2) {
        margin-top: 5px;
        line-height: 140%;
        opacity: 0.5;
        width: 80%;
        font-size: 0.7rem;
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
    width: 400px;
    height: 320px;
    overflow: auto;
    border-radius: 0 0 20px 20px;
    margin-bottom: 100px;

    .plyItem {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
        height: 50px;
        color: #ccc;
        font-size: 0.8rem;
        font-family: 'Noto Sans KR', sans-serif;
        > li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        .mini-size {
            width: 40px;
            padding: 10px;
            cursor: pointer;
        }
        .index-number {
            font-weight: 700;
            font-size: 1.2rem;
            width: 50px;
        }

        .coverImg {
            img {
                width: 30px;
                height: 30px;
                border-radius: 10%;
            }
        }
        .delete-btn:hover {
            color: rgb(255, 68, 68);
        }
        .music-name {
            flex-direction: column;
            align-items: start;
            width: 100%;
            text-align: left;
            p {
                margin: 2px 10px;
                :nth-child(2) {
                    color: #666;
                }
            }
        }
    }
`;

const Exitbtn = styled.button`
    display: flex;
    align-items: center;
    color: white;
    margin-left: 10px;
    background-color: #6b6b6b;
    border-radius: 10px;
    border: none;
    cursor: pointer;
`;
