import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

const AddListMusic = () => {
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [coverImg, setCoverImg] = useState<string>('');

    /* 2023.05.21 마이플레이리스트 생성 요청 - 홍혜란 */
    const MyplaylistCreate = () => {
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
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <PlayListContainer>
            <MyplaylistTitle>
                <li>Add My Playlist</li>
            </MyplaylistTitle>
            <MyplaylistItem>
                <li>Playlist-CoverImg</li>
                <p>커버 이미지 url 주소를 넣어주세요.</p>
                <input value={coverImg} onChange={(e) => setCoverImg(e.target.value)} />
                <li>Playlist-Title</li>
                <p>플레이리스트의 제목을 적어주세요.</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <li>Playlist-Content</li>
                <p>플레이리스트를 설명하는 글을 적어주세요.</p>
                <input value={body} onChange={(e) => setBody(e.target.value)} />
            </MyplaylistItem>
            <Submit>
                <button onClick={MyplaylistCreate}>submit</button>
            </Submit>
        </PlayListContainer>
    );
};

export default AddListMusic;

/** 2023.05.23 마이플레이리스트 모달창 안에 작성 컴포넌트 - 홍혜란 */
const PlayListContainer = styled.div`
    z-index: 3;
    width: 400px;
    height: 350px;
`;

const MyplaylistTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
        color: white;
        font-size: 20px;
        margin: 10px;
    }
`;

const MyplaylistItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;

    li {
        display: flex;
        align-items: center;
        color: white;
        margin: 10px 0px 10px 0px;
    }

    p {
        color: rgb(156, 156, 156);
        font-size: 12px;
        margin-bottom: 5px;
    }

    input {
        width: 400px;
        height: 20px;
        border: none;
        background-color: rgba(75, 75, 75, 0.8);
        color: white;
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
    flex-direction: column;
    align-items: center;
    button {
        width: 80px;
        height: 30px;
        margin: 10px;
        border-radius: 10px;
        background-color: #8f8f8f;
    }
`;
