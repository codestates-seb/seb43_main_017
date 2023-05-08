import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { BsMusicPlayer, BsPencilSquare, BsPlayCircle } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import { useRecoilState } from 'recoil';
import { nameState, introState } from '../../recoil/Atoms';
import { useState, useEffect } from 'react';
import axios from 'axios';

type UserData = {
    name: string;
    intro: string;
};

function Mypage() {
    /* 2023.05.06 유저의 name과 intro부분을 클릭했을 시 수정할 수 있는 상태관리 - 홍혜란 */
    const [name, setName] = useRecoilState(nameState);
    const [intro, setIntro] = useRecoilState(introState);
    const [editingName, setEditingName] = useState(false);
    const [editingIntro, setEditingIntro] = useState(false);

    /* 2023.05.06 사용자가 이름을 클릭했을 때 호출되는 함수 , 이름이 편집 모드로 전환 - 홍혜란 */
    const handleNameClick = () => {
        setEditingName(true);
    };

    /* 2023.05.06 사용자가 이름 입력 폼에서 포커스를 벗어났을 때 호출되는 함수 , 이름이 편집 모드에서 보기 모드로 전환 - 홍혜란 */
    const handleNameBlur = () => {
        setEditingName(false);
    };

    /* 2023.05.06 사용자가 이름 입력 폼에서 값을 변경할 때마다 호출되는 함수 , 입력 폼에 입력된 값으로 name 상태가 업데이트 - 홍혜란 */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    /* 2023.05.06 사용자가 자기소개를 클릭했을 때 호출되는 함수 , 자기소개가 편집 모드로 전환 - 홍혜란 */
    const handleIntroClick = () => {
        setEditingIntro(true);
    };

    /* 2023.05.06 사용자가 자기소개 입력 폼에서 포커스를 벗어났을 때 호출되는 함수 , 자기소개가 편집 모드에서 보기 모드로 전환 - 홍혜란 */
    const handleIntroBlur = () => {
        setEditingIntro(false);
    };

    /* 2023.05.06 사용자가 자기소개 입력 폼에서 값을 변경할 때마다 호출되는 함수 , 입력 폼에 입력된 값으로 intro 상태가 업데이트 - 홍혜란 */
    const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntro(event.target.value);
    };

    /* 2023.05.06 수정된 이름과 자기소개 데이터를 서버에 저장 - 홍혜란 */
    useEffect(() => {
        return () => {
            const userData: UserData = { name, intro };
            axios.patch('/api/user', userData);
        };
    }, [name, intro]);

    return (
        <MusicListContainer>
            <MypageContainer>
                <UserProfile>
                    <div className="user-profile">
                        <img src="./assets/ditto.png" alt="userimg" />
                    </div>
                    <UserContainer>
                        {/* 사용자의 이름 출력 및 수정 */}
                        <div className="user-name-container">
                            {editingName ? (
                                <input type="text" value={name} onChange={handleNameChange} onBlur={handleNameBlur} />
                            ) : (
                                <div className="user-name" onClick={handleNameClick} contentEditable>
                                    {name}
                                </div>
                            )}
                        </div>
                        <div className="user-email">undefined@gmail.com</div>
                        {/* 사용자의 자기소개 출력 및 수정 */}
                        <div className="user-coment-container">
                            {editingIntro ? (
                                <input
                                    type="text"
                                    value={intro}
                                    onChange={handleIntroChange}
                                    onBlur={handleIntroBlur}
                                />
                            ) : (
                                <div className="user-coment" onClick={handleIntroClick} contentEditable>
                                    {intro}
                                </div>
                            )}
                        </div>
                    </UserContainer>
                </UserProfile>

                <MusicInfor>
                    <LeftContainer>
                        <VoteContainer>
                            <div className="vote-title">
                                <div className="vote-icon">
                                    <AiOutlineHeart />
                                </div>{' '}
                                <p>VOTE MUSIC</p>
                            </div>

                            <div className="music-like">
                                <img src="./assets/ditto.png" alt="musicimg" />
                                <div className="music-name">Ditto</div>
                                <div className="music-artist">Newjeans</div>
                                <div className="music-album">OMG</div>
                                <div className="music-icon">
                                    <AiFillHeart />
                                </div>
                            </div>
                        </VoteContainer>

                        <PlayListContainer>
                            <div className="playlist-title">
                                <div className="play-icon">
                                    <BsMusicPlayer />
                                </div>{' '}
                                <p>MY PLAYLIST</p>
                            </div>

                            <div className="playlist-list">
                                <img src="./assets/ditto.png" alt="musicimg" />
                                <div className="playlist-name">나만의 플레이리스트</div>
                                <div className="playlist-time">2023.05.04</div>
                                <div className="playlist-vote-icon">
                                    <AiFillHeart />
                                    13
                                </div>
                                <div className="playlist-button">
                                    <BsPlayCircle />
                                </div>
                                <div className="playlist-menu">
                                    <CiMenuKebab />
                                </div>
                            </div>
                        </PlayListContainer>
                    </LeftContainer>

                    <RightContainer>
                        <ModifyContainer>
                            <div className="modify-title">
                                <div className="pencil-icon">
                                    <BsPencilSquare />
                                </div>{' '}
                                <p>MODIFY PLAYLIST</p>
                            </div>

                            <div className="modify-adit">
                                <div className="modify-name">PLAYLIST:나만의 플레이리스트</div>
                                <div className="modify-icon">
                                    <AiOutlinePlusSquare />
                                </div>
                            </div>
                        </ModifyContainer>
                    </RightContainer>
                </MusicInfor>
            </MypageContainer>
        </MusicListContainer>
    );
}

export default Mypage;

const MusicListContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MypageContainer = styled.div`
    align-items: center;
`;

const UserProfile = styled.div`
    display: flex;
    padding: 20px;

    .user-profile {
        img {
            width: 175px;
            height: 175px;
            border-radius: 50%;
        }
    }
`;

/* 2023.05.06 유저의 이름 / 이메일 / 자기소개 컴포넌트 구현 -홍혜란 */
const UserContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;

    .user-name-container {
        input {
            font-size: 50px;
            color: hsl(0, 0%, 100%);
            font-weight: bold;
            width: 300px;
            height: 50px;
            background-color: black;
            border: none;
            margin: 10px 0px 10px 25px;
        }

        .user-name {
            font-size: 50px;
            font-weight: bold;
            color: hsl(0, 0%, 100%);
            margin: 10px 0px 10px 25px;
        }
    }

    .user-email {
        font-size: 20px;
        color: hsl(0, 0%, 100%);
        margin: 10px 0px 15px 25px;
    }

    .user-coment-container {
        input {
            font-size: 20px;
            color: hsl(0, 0%, 100%);
            width: 250px;
            height: 20px;
            background-color: black;
            border: none;
            margin: 10px 0px 10px 25px;
        }

        .user-coment {
            font-size: 20px;
            color: hsl(0, 0%, 100%);
            margin: 10px 0px 10px 25px;
        }
    }
`;

const MusicInfor = styled.div`
    display: flex;
`;

const LeftContainer = styled.div`
    align-items: center;
    width: 600px;
    height: 400px;
    border: 1px solid blue;
`;

const VoteContainer = styled.div`
    align-items: center;
    margin: 10px;
    border: 1px solid red;

    .vote-title {
        display: flex;
        align-items: center;

        .vote-icon {
            font-size: 25px;
            color: hsl(330, 100%, 51%);
            padding-top: 5px;
        }

        p {
            font-size: 20px;
            color: #ffffff;
            margin-left: 5px;
        }
    }

    .music-like {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid white;

        img {
            width: 30px;
            height: 30px;
            border-radius: 10%;
        }

        .music-name {
            font-size: 20px;
            color: white;
            font-weight: bold;
        }

        .music-artist {
            font-size: 20px;
            color: white;
        }

        .music-album {
            font-size: 20px;
            color: white;
        }

        .music-icon {
            font-size: 25px;
            color: hsl(330, 100%, 51%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

const PlayListContainer = styled.div`
    align-items: center;
    margin: 10px;
    border: 1px solid red;

    .playlist-title {
        display: flex;
        align-items: center;

        .play-icon {
            font-size: 25px;
            color: hsl(216, 100%, 50%);
            padding-top: 5px;
        }

        p {
            font-size: 20px;
            color: #ffffff;
            margin-left: 5px;
        }
    }

    .playlist-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(43, 43, 43, 0.8);

        img {
            width: 50px;
            height: 50px;
        }

        .playlist-name {
            font-size: 20px;
            color: white;
            font-weight: bold;
        }

        .playlist-time {
            font-size: 10px;
            color: white;
        }

        .playlist-vote-icon {
            font-size: 15px;
            color: red;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .playlist-button {
            font-size: 30px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .playlist-menu {
            font-size: 30px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

const RightContainer = styled.div`
    align-items: center;
    width: 700px;
    height: 400px;
    border: 1px solid blue;
`;

const ModifyContainer = styled.div`
    align-items: center;
    margin: 10px;
    border: 1px solid red;

    .modify-title {
        display: flex;
        align-items: center;

        .pencil-icon {
            font-size: 25px;
            color: hsl(152, 100%, 50%);
            padding-top: 5px;
        }

        p {
            font-size: 20px;
            color: #ffffff;
            margin-left: 5px;
        }
    }

    .modify-adit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(43, 43, 43, 0.8);

        .modify-name {
            font-size: 30px;
            color: white;
            font-weight: bold;
        }

        .modify-icon {
            font-size: 30px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
