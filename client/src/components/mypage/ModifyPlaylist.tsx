import styled from 'styled-components';
import { BsPencilSquare } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';

function ModifyPlaylist() {
    return (
        <ModifyContainer>
            <div className="modify-title">
                <div className="pencil-icon">
                    <BsPencilSquare />
                </div>
                <p>MODIFY PLAYLIST</p>
            </div>
            <ModiCointainer>
                <Plcard>
                    <div className="pl-treck">TRECK 8</div>
                    <div className="pl-contents">
                        <Pluser>
                            <span>WTITER</span>
                            <span>Undefined</span>
                            <span>LIKE</span>
                            <span>13</span>
                        </Pluser>
                        <Pltext>
                            <span>나만의 플레이리스트</span>
                            <span>이건 나만 듣고 싶은 노래입니다.</span>
                        </Pltext>
                    </div>
                </Plcard>
                <PlyList>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                    <div className="plyItem">
                        <img src="./assets/ditto.png" alt="cover-img" />
                        <li>Ditto</li>
                        <li>Newjeans</li>
                        <li>OMG</li>
                        <li>
                            <VscClose />
                        </li>
                    </div>
                </PlyList>
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
    flex-direction: column;
`;

/**2023-05-06 플리 슬라이드 카드 섹션 : 김주비 */
const Plcard = styled.div`
    position: relative;
    width: 450px;
    height: 200px;
    border-radius: 20px 20px 0 0;
    background: url('./assets/mypage.png');
    background-size: cover;
    color: #ddd;
    overflow: hidden;
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
        color: #fff;
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

        li {
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
