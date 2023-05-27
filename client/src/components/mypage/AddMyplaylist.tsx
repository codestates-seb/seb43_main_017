import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UpdataModify, playListModalState } from 'src/recoil/Atoms';
import { useState } from 'react';

const AddListMusic = () => {
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [update, setUpdate] = useRecoilState(UpdataModify);
    const [, setModalOpen] = useRecoilState(playListModalState);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [coverImg, setCoverImg] = useState<string>(`https://i.imgur.com/d88JH69.png`);

    /* 2023.05.21 마이플레이리스트 생성 요청 - 홍혜란 */
    const MyplaylistCreate = () => {
        if (body.length === 0 || title.length === 0) {
            alert('플레이리스트의 이름과 내용을 모두 작성해주시기 바랍니다.');
        } else {
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/playlists`,
                    {
                        title: title,
                        body: body,
                        coverImg: coverImg,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then(() => {
                    setCoverImg('');
                    setTitle('');
                    setBody('');
                    setUpdate(!update);
                    alert('플레이리스트가 생성되었습니다!');
                    setModalOpen(false);
                })
                .catch(() => {
                    alert('플레이리스트 생성에 실패했습니다.');
                });
        }
    };

    return (
        <PlayListContainer>
            <MyplaylistTitle>
                <span>ADD PLAYLIST</span>
            </MyplaylistTitle>
            <MyplaylistItem>
                <span>Cover Image</span>
                <input
                    value={coverImg}
                    onChange={(e) => setCoverImg(e.target.value)}
                    placeholder="커버 이미지 url 주소를 넣어주세요"
                />
                <span>Title</span>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="플레이리스트의 제목을 작성해주세요"
                />
                <span>Content</span>
                <input
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="자신의 플레이리스트를 소개해주세요"
                />
            </MyplaylistItem>
            <Submit>
                <button onClick={MyplaylistCreate}>SUBMIT</button>
            </Submit>
        </PlayListContainer>
    );
};

export default AddListMusic;

/** 2023.05.23 마이플레이리스트 모달창 안에 작성 컴포넌트 - 홍혜란 */
const PlayListContainer = styled.div`
    z-index: 5;
    width: 400px;
`;

const MyplaylistTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: white;
        font-size: 2.5rem;
        margin: 30px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
    }
`;

const MyplaylistItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    font-family: 'Noto Sans KR', sans-serif;

    span {
        display: flex;
        align-items: center;
        color: white;
        margin: 10px 0px 10px 0px;
        text-transform: uppercase;
    }

    p {
        color: rgba(255, 255, 255, 0.3);
        font-size: 0.8rem;
        margin-bottom: 5px;
        font-weight: 300;
    }

    input {
        width: 400px;
        height: 20px;
        border: none;
        background: none;
        border-bottom: 2px solid #ccc;
        padding: 5px 0px;
        color: #ccc;
        margin-bottom: 20px;
        :focus {
            outline: none;
            border-color: #ff4444;
        }
        ::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }
    }
    @media (max-width: 700px) {
        margin: 30px;

        input {
            width: 330px;
        }
    }
`;

const Submit = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px;
    button {
        border-style: none;
        width: 100px;
        height: 50px;
        border-radius: 5px;
        background-color: #ff4444;
        color: #e9e9e9;
        font-family: 'Noto Sans KR', sans-serif;
    }
`;
