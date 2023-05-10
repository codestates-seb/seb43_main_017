import styled from 'styled-components';

function MusicDetail() {
    return (
        <DetailGroup>
            <PlaylistBackground
                url={'https://uppbeat.imgix.net/images/Hartzmann_avatar_8842544684411792.jpg?auto=compress'}
            ></PlaylistBackground>
            <DetailSection>
                <MusicContents>
                    <MusicTitle>
                        <span>Track Name</span>
                    </MusicTitle>
                    <MusicInfo>
                        <ul className="music-producer">
                            <li>CREATE</li>
                            <li>Uncover</li>
                            <li>ALBUM</li>
                            <li>albumname</li>
                        </ul>
                        <ul className="music-tag">
                            <li>신나는</li>
                            <li>EDM</li>
                            <li>클럽음악</li>
                        </ul>
                    </MusicInfo>
                    <MusicText>
                        <span>
                            A London-based collective of producers and composers. Masters of urban beats and high-end
                            music for creators looking to take their content to the next level.
                        </span>
                    </MusicText>
                </MusicContents>
                <MusicCover>
                    <AlbumDesign
                        url={'https://uppbeat.imgix.net/images/Hartzmann_avatar_8842544684411792.jpg?auto=compress'}
                    >
                        <div className="album-recode">
                            <div className="recode-img"></div>
                        </div>
                        <div className="cover-img"></div>
                    </AlbumDesign>
                </MusicCover>
                <MusicComment>
                    <CommentBox>
                        <h2>COMMENT</h2>
                        <ul className="comment-detail">
                            <li className="user-icon">
                                <img src="./assets/profile-icon-01.png" alt="profile-icon" />
                            </li>
                            <li className="user-comment">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in arcu tellus. Maecenas
                                ligula justo, ullamcorper eget ex eu, feugiat pharetra augue.
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
            </DetailSection>
        </DetailGroup>
    );
}

export default MusicDetail;

/**2023-05-09 detailpage 전체 섹션 : 김주비 */
const DetailGroup = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100vh;
    color: #ccc;
`;
interface url {
    url: string;
}
/**2023-05-09 ScaleOver 되는 백그라운드 애니메이션 : 김주비 */
const PlaylistBackground = styled.article<url>`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url(${(props) => props.url});
    filter: blur(10px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 20s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.2);
        }
    }
`;
/**2023-05-09 detailpage 서브 섹션 : 김주비 */
const DetailSection = styled.div`
    box-sizing: border-box;
    margin-left: 300px;
    width: calc(100% - 300px);
    height: 100%;
    z-index: 2;
    @media (max-width: 1000px) {
        margin-left: 200px;
    }
    @media (max-width: 700px) {
        margin-left: 0;
        width: 90%;
    }
`;
/**2023-05-09 detailpage 컨텐츠 섹션 + 키프레임 애니메이션 : 김주비 */
const MusicContents = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 100px;
    @keyframes ascendText {
        100% {
            transform: translateY(0px);
        }
    }
    @keyframes ascendText2 {
        100% {
            transform: translateY(0px);
            transform: scale(0.9);
        }
    }
    @keyframes fadeinText {
        100% {
            opacity: 0.6;
        }
    }

    @media (max-width: 700px) {
        > div {
            justify-content: center;
            align-content: center;
        }
    }
`;
/**2023-05-09 음원정보 - 타이틀 : 김주비 */
const MusicTitle = styled.div`
    display: flex;
    font-size: 2.5rem;
    text-transform: uppercase;
    font-weight: 700;
    overflow: hidden;
    span {
        transform: translateY(40px);
        animation: ascendText 1s forwards 1s;
    }
`;
/**2023-05-09 음원정보 - 앨범 / 태그 : 김주비 */
const MusicInfo = styled.div`
    display: flex;
    margin: 10px 0px 30px 0px;
    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    ul > li {
        transform: translateY(20px);
        animation: ascendText 1s forwards 1.5s;
    }

    .music-producer li {
        margin-right: 20px;
    }
    .music-producer li:nth-child(2n-1) {
        font-weight: 600;
    }
    .music-producer li:nth-child(2n) {
        opacity: 0.6;
    }
    .music-tag li {
        padding: 5px 20px;
        border: 2px solid #ccc;
        border-radius: 20px;
        font-size: 13px;
        transform: translateY(30px);

        animation: ascendText2 1s forwards 1.8s;
    }

    @media (max-width: 700px) {
        justify-content: center;
        align-items: center;
        .music-tag {
            margin-top: 30px;
        }
    }
    @media (max-width: 1000px) {
        flex-direction: column;
        justify-content: left;

        ul {
            margin-bottom: 10px;
            justify-content: left;
        }
    }
`;
/**2023-05-09 음원정보 - 사이드 텍스트 : 김주비 */
const MusicText = styled.div`
    display: flex;
    font-size: 13px;
    line-height: 150%;
    width: 600px;
    height: 40px;
    overflow-x: hidden;
    padding-right: 30px;
    opacity: 0;
    animation: fadeinText 1s forwards 2s;
    @media (max-width: 1000px) {
        width: 100%;
    }
    @media (max-width: 700px) {
        text-align: center;
    }
`;
/**2023-05-09 detailpage 앨범커버 섹션 : 김주비 */
const MusicCover = styled.article`
    display: flex;
    width: 100%;
    margin-top: 50px;
`;
/**2023-05-09 detailpage 앨범커버 디자인 : 김주비 */
const AlbumDesign = styled.div<url>`
    position: relative;
    width: 650px;
    height: 400px;
    .cover-img {
        position: absolute;
        width: 400px;
        height: 400px;
        background-color: #111;
        background: url(${(props) => props.url});
        background-size: cover;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
    }
    .album-recode {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        width: 400px;
        height: 400px;
        background: url('./assets/background-detail-recode.png');
        background-size: cover;
        animation: roundingrecode 10s infinite linear;
    }

    .recode-img {
        width: 150px;
        height: 150px;
        border-radius: 100%;
        background: url(${(props) => props.url});
        background-size: cover;
    }

    @keyframes roundingrecode {
        100% {
            transform: rotate(360deg);
        }
    }
`;

/**2023-05-09 detailpage 사이드 코멘트 섹션 : 김주비 */
const MusicComment = styled.article`
    display: flex;
    margin-top: 50px;
    height: 100px;
    width: 90%;

    > div {
        width: 100%;
    }
    > div h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 20px;
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
`;
