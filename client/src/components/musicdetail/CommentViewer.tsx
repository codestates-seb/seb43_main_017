import styled from 'styled-components';
import { BiX } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { commentOpenState } from 'src/recoil/Atoms';
import { useEffect, useState } from 'react';
import { commentType } from 'src/types/Commentlist';
import axios from 'axios';

function CommentViewer() {
    const [, setCommentOpen] = useRecoilState<boolean>(commentOpenState);
    const [comment, setComment] = useState<commentType[]>([]);
    const [commentText, setCommentText] = useState<string>('');
    const [commentSubmit, setCommentSubmit] = useState<boolean>(false);
    const onPlaylist = sessionStorage.getItem('onPlaylist');
    const msId = sessionStorage.getItem('musicId');
    const token = localStorage.getItem('access_token');
    const memberId = localStorage.getItem('memberId');

    const url: string = onPlaylist === 'true' ? `/playlist-comments/` : `/music-comments/musics/`;

    /**2023.05.22 코멘트조회 - 김주비 */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}${url}${msId}`).then((response) => {
            setComment(response.data);
        });
    }, [commentSubmit]);
    /**2023.05.22 코멘트작성 - 김주비 */
    const handelCommentWriting = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            if (commentText.length === 0) {
                alert('내용을 작성해주세요.');
            } else {
                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}${url}${msId}`,
                        {
                            content: commentText,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )
                    .then(() => {
                        setCommentText('');
                        setCommentSubmit(!commentSubmit);
                    });
            }
        } else {
            alert('로그인을 먼저 진행해주시기 바랍니다.');
        }
    };
    /**2023.05.22 코멘트삭제 - 김주비 */
    const handleCommentDelete = (index: number) => {
        const delurl: string = onPlaylist === 'true' ? `/playlist-comments/` : `/music-comments/`;

        axios
            .delete(`${process.env.REACT_APP_API_URL}${delurl}${index}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setCommentSubmit(!commentSubmit);
            });
    };

    return (
        <CommentViewerGroup>
            <div className="ViewerGroup">
                <form onSubmit={handelCommentWriting} className="comment-input">
                    <CommentInput
                        type="text"
                        placeholder="코멘트를 작성해주세요"
                        value={commentText}
                        onChange={(e) => {
                            setCommentText(e.target.value);
                        }}
                    />
                    <button type="submit">제출</button>
                </form>

                <CommentBox>
                    {comment.map((comment) => (
                        <li key={comment.id}>
                            <img
                                src={comment.image}
                                alt="profile icon"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/assets/profile-icon.png';
                                }}
                            />
                            <div className="comment-contents">
                                <span className="comment-user">{comment.name}</span>
                                <span className="comment-text">{comment.content}</span>
                            </div>
                            {Number(memberId) === comment.memberId ? (
                                <div
                                    className="comment-delete"
                                    onClick={() => {
                                        handleCommentDelete(comment.id);
                                    }}
                                >
                                    <span>DEL</span>
                                </div>
                            ) : null}
                        </li>
                    ))}
                </CommentBox>
                <Xbutton>
                    <BiX
                        onClick={() => {
                            setCommentOpen(false);
                        }}
                    />
                </Xbutton>
            </div>
        </CommentViewerGroup>
    );
}

export default CommentViewer;

/**2023-05-15 코멘트 뷰어 전체섹션 : 김주비 */
const CommentViewerGroup = styled.div`
    box-sizing: border-box;
    position: absolute;
    right: 0px;
    width: 400px;
    height: 100vh;
    z-index: 3;
    transform: translateX(400px);
    background-color: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(15px);
    border-radius: 30px 0px 0px 30px;
    overflow-x: hidden;
    animation: showViewr 1.5s forwards;

    .ViewerGroup {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .comment-input {
        display: flex;
        margin-top: 120px;
        width: 80%;
    }
    .comment-input button {
        width: 80px;
        background: none;
        border: 2px solid #747474;
        border-radius: 3px;
        color: #747474;
        transition: 0.2s ease-in-out;
    }

    .comment-input button:hover {
        border: 2px solid #e24c4c;
        color: #e24c4c;
    }

    .comment-input button:active {
        background: #e24c4c;
    }

    @keyframes showViewr {
        100% {
            transform: translateX(0px);
        }
    }

    @media (max-width: 600px) {
        width: 100%;
        transform: translateX(100%);
    }
`;
/**2023-05-15 코멘트 작성 인풋창 : 김주비 */
const CommentInput = styled.input`
    width: 100%;
    border-style: none;
    padding: 10px 0px;
    border-bottom: 2px solid #747474;
    background: none;
    color: #747474;

    :focus {
        outline-style: none;
        border-bottom: 2px solid #e24c4c;
    }
`;
/**2023-05-15 작성된 코멘트 : 김주비 */
const CommentBox = styled.ul`
    margin-top: 30px;
    width: 100%;
    li {
        /* border: 1px solid red; */
        display: flex;
        padding: 15px 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        margin-right: 20px;
    }

    .comment-contents {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        /* border: 1px solid red; */
        width: 100%;
    }
    .comment-user {
        font-weight: 700;
        margin-bottom: 5px;
        text-transform: uppercase;
        font-family: 'Rajdhani', 'Noto Sans KR', sans-serif;
        letter-spacing: 1px;
    }
    .comment-text {
        line-height: 130%;
        word-break: break-all;
        opacity: 0.6;
        font-family: 'Rajdhani', 'Noto Sans KR', sans-serif;
    }

    .comment-delete {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .comment-delete span {
        border: 2px solid #333;
        font-size: 0.8rem;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .comment-delete span:hover {
        border-color: #e24c4c;
    }
`;
/**2023-05-15 코멘트창 닫기 버튼 : 김주비 */
const Xbutton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    border: 2px solid #a0a0a0;
    background-color: #000;
    width: 50px;
    height: 50px;
    border-radius: 60px;
    bottom: 20px;
    font-size: 30px;
    transition: 0.3s ease-in-out;

    :hover {
        border-color: #e24c4c;
        color: #e24c4c;
        transform: rotate(180deg);
    }
`;
