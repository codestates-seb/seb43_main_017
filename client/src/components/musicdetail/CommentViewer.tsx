import styled from 'styled-components';
import { BiX } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { commentOpenState } from 'src/recoil/Atoms';
function CommentViewer() {
    const [, setCommentOpen] = useRecoilState<boolean>(commentOpenState);
    const comment = [
        {
            commentId: 1,
            userName: 'Uncover',
            userIcon: './assets/profile-icon-01.png',
            commentText:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in arcu tellus. Maecenas ligula justo, ullamcorper eget ex eu, feugiat pharetra augue.',
            createAt: '1 HOUR AGO',
        },
        {
            commentId: 2,
            userName: 'JUBEE',
            userIcon: './assets/background-playlist1.jpg',
            commentText: '노래 너무 잘들었습니다. 좋은 음원 공유 감사합니다.',
            createAt: '1 HOUR AGO',
        },
        {
            commentId: 3,
            userName: 'Lalala',
            userIcon: './assets/logo_icon_012.png',
            commentText: 'Cras in arcu tellus. Maecenas ligula justo, ullamcorper eget ex eu, feugiat pharetra augue.',
            createAt: '1 HOUR AGO',
        },
        {
            commentId: 4,
            userName: 'lucky letter',
            userIcon: './assets/profile-icon.png',
            commentText:
                '이 코멘트는 영국에서 부터 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 코멘트는 4일 안에 당신 곁을 떠나야 합니다. ',
            createAt: '1 HOUR AGO',
        },
    ];
    return (
        <CommentViewerGroup>
            <div className="ViewerGroup">
                <div className="comment-input">
                    <CommentInput type="text" placeholder="코멘트를 작성해주세요" /> <button>작성</button>
                </div>
                <CommentBox>
                    {comment.map((comment) => (
                        <li key={comment.commentId}>
                            <img src={comment.userIcon} alt="profile icon" />
                            <div className="comment-contents">
                                <span className="comment-user">{comment.userName}</span>
                                <span className="comment-text">{comment.commentText}</span>
                            </div>
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
