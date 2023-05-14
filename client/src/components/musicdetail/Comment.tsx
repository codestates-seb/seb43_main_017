import styled from 'styled-components';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { commentOpenState } from 'src/recoil/Atoms';

function Comment() {
    const [commentOpen, setCommentOpen] = useRecoilState<boolean>(commentOpenState);

    return (
        <MusicComment>
            <CommentBox>
                <div className="comment-title">
                    <h2>COMMENT</h2>
                    <button
                        onClick={() => {
                            setCommentOpen(!commentOpen);
                        }}
                    >
                        <BiMessageSquareAdd />
                    </button>
                </div>
                <ul className="comment-detail">
                    <li className="user-icon">
                        <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                    </li>
                    <li className="user-comment">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in arcu tellus. Maecenas ligula
                        justo, ullamcorper eget ex eu, feugiat pharetra augue.
                    </li>
                    <li className="created-time">
                        <span>1 hour ago</span>
                    </li>
                </ul>
            </CommentBox>
            <LikedBox>
                <h2>LIKED</h2>
                <ul className="liked-detail">
                    <li>
                        <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                    </li>
                    <li>
                        <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                    </li>
                    <li>
                        <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                    </li>
                    <li>
                        <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                    </li>
                    <li>
                        <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                    </li>
                </ul>
            </LikedBox>
        </MusicComment>
    );
}

export default Comment;

/**2023-05-09 detailpage 사이드 코멘트 섹션 : 김주비 */
const MusicComment = styled.article`
    display: flex;
    margin-top: 50px;
    width: 100%;
    opacity: 0;
    animation: fadeInSection 2s forwards 3s;

    > div {
        width: 100%;
    }
    > div h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 20px;
    }

    @keyframes fadeInSection {
        100% {
            opacity: 1;
        }
    }

    @media (max-width: 700px) {
        display: none;
    }
`;
/**2023-05-09 detailpage 코멘트 디테일 섹션 : 김주비 */
const CommentBox = styled.div`
    ul {
        display: flex;
        width: 100%;
    }

    li {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-right: 20px;
    }

    .comment-title {
        display: flex;
    }
    .comment-title > button {
        width: 40px;
        height: 30px;
        background: none;
        border: none;
        color: #ccc;
        opacity: 0.6;
        font-size: 20px;
    }
    .comment-title > button:hover {
        opacity: 1;
        color: rgba(199, 68, 68, 1);
    }
    .comment-detail {
        width: 100%;
    }

    .user-icon img {
        width: 50px;
        height: 50px;
        border-radius: 60px;
        background-size: cover;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    }
    .user-comment {
        min-width: 350px;
        font-size: 14px;
        line-height: 150%;
    }
    .created-time span {
        padding: 8px 20px;
        background-color: rgba(199, 68, 68, 1);
        border-radius: 20px;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
    }
    @media (max-width: 1000px) {
        .created-time {
            display: none;
        }
    }

    @media (max-width: 700px) {
        .user-comment {
            min-width: 300px;
            word-break: break-all;
        }
    }
`;
/**2023-05-09 detailpage 좋아요 섹션 : 김주비 */
const LikedBox = styled.div`
    margin-left: 20px;
    width: 100%;
    .liked-detail {
        display: flex;
    }
    .liked-detail li {
        margin-left: -10px;
    }
    .liked-detail li:nth-child(1) {
        margin-left: 0px;
    }
    .liked-detail li > img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    }
    @media (max-width: 1000px) {
        display: none;
    }
`;
