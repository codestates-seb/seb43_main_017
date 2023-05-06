import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { BsMusicPlayer, BsPencilSquare, BsPlayCircle } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import { useRecoilState } from 'recoil';
import { nameState, introState } from './atoms';
import { useState } from 'react';

function MusicList() {
    const [name, setName] = useRecoilState(nameState);
    const [intro, setIntro] = useRecoilState(introState);
    const [editingName, setEditingName] = useState(false);
    const [editingIntro, setEditingIntro] = useState(false);

    const handleNameClick = () => {
        setEditingName(true);
    };

    const handleNameBlur = () => {
        setEditingName(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleIntroClick = () => {
        setEditingIntro(true);
    };

    const handleIntroBlur = () => {
        setEditingIntro(false);
    };

    const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntro(event.target.value);
    };

    return (
        <MusicListContainer>
            <MypageContainer>
                <UserProfile>
                    <div className="user-profile">
                        <img src="./assets/ditto.png" alt="userimg" />
                    </div>
                    <UserContainer>
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

export default MusicList;

const MusicListContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
`;

const MypageContainer = styled.div`
    align-items: center;
    border: 1px solid red;
`;

const UserProfile = styled.div`
    display: flex;
    border: 1px solid green;
    padding: 20px;

    .user-profile {
        img {
            width: 175px;
            height: 175px;
            border-radius: 50%;
        }
    }
`;

const UserContainer = styled.div`
    align-items: center;

    .user-name-container {
        input {
            font-size: 40px;
            color: #ffffff;
            font-weight: bold;
            width: 250px;
            height: 50px;
            margin-left: 25px;
            margin-top: 10px;
            background-color: black;
            border: none;
        }

        .user-name {
            font-size: 50px;
            font-weight: bold;
            color: hsl(0, 0%, 100%);
            margin-left: 25px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

    .user-email {
        font-size: 20px;
        color: hsl(0, 0%, 65%);
        margin-left: 25px;
        margin-bottom: 10px;
    }

    .user-coment-container {
        input {
            font-size: 15px;
            color: hsl(32, 100%, 60%);
            font-weight: bold;
            width: 250px;
            height: 50px;
            margin-left: 25px;
            margin-top: 10px;
            background-color: black;
            border: none;
        }

        .user-coment {
            font-size: 25px;
            color: hsl(32, 100%, 60%);
            margin-left: 25px;
        }
    }
`;

const MusicInfor = styled.div`
    display: flex;
    border: 1px solid blue;
`;

const LeftContainer = styled.div`
    align-items: center;
    border: 1px solid red;
    width: 500px;
    padding: 20px;
`;

const VoteContainer = styled.div`
    align-items: center;
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
        border: 1px solid red;

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
        border: 1px solid red;

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
    border: 1px solid red;
    padding: 20px;
`;

const ModifyContainer = styled.div`
    align-items: center;
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
