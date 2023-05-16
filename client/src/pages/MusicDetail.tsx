import styled from 'styled-components';
import CommentViewer from 'src/components/musicdetail/CommentViewer';
import { useRecoilState } from 'recoil';
import { commentOpenState, soundbarOpenState } from 'src/recoil/Atoms';
import { useEffect } from 'react';
import Sidebutton from 'src/components/musicdetail/SideButton';
function MusicDetail() {
    const [commentOpen] = useRecoilState<boolean>(commentOpenState);
    const [, setSoundbarOpen] = useRecoilState<boolean>(soundbarOpenState);

    useEffect(() => {
        setSoundbarOpen(true);
    }, []);

    return (
        <DetailGroup>
            {commentOpen ? <CommentViewer></CommentViewer> : null}
            <PlaylistBackground
                url={
                    'https://musicvine.imgix.net/images/all-good-folks-avatar-v1_4282299045668081.jpg?auto=compress&w=388&h=388'
                }
            ></PlaylistBackground>
            <AlbumRecode>
                <img src="https://musicvine.imgix.net/images/all-good-folks-avatar-v1_4282299045668081.jpg?auto=compress&w=388&h=388" />
            </AlbumRecode>
            <DetailSection>
                <MusicContents>
                    <MusicTags>
                        <li>귀여운</li>
                        <li>발랄한</li>
                        <li>즐거운</li>
                    </MusicTags>
                    <MusicTitle>
                        <span>Cheeky Chops</span>
                    </MusicTitle>
                    <MusicInfo>
                        <li>CREATE</li>
                        <li>All Good Folks</li>
                        <li>ALBUM</li>
                        <li>Cheeky Chops</li>
                    </MusicInfo>
                    <MusicText>
                        <span>
                            A London-based collective of producers and composers. Masters of urban beats and high-end
                            music for creators looking to take their content to the next level.
                        </span>
                    </MusicText>
                </MusicContents>
                <Sidebutton />
            </DetailSection>
        </DetailGroup>
    );
}

export default MusicDetail;

/**2023-05-09 detailpage 전체 섹션 : 김주비 */
const DetailGroup = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    color: #ccc;
    overflow-x: hidden;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 2;
`;
/**2023-05-09 rotate 레코드 : 김주비 */
const AlbumRecode = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -250px;
    width: 500px;
    height: 500px;
    background: url('./assets/background-detail-recode.png');
    background-size: cover;
    opacity: 0.6;
    animation: roundingrecode 10s infinite linear;
    img {
        width: 200px;
        height: 200px;
        border-radius: 200px;
    }
    @keyframes roundingrecode {
        100% {
            transform: rotate(360deg);
        }
    }
`;
/**2023-05-09 detailpage 컨텐츠 섹션 + 키프레임 애니메이션 : 김주비 */
const MusicContents = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70%;
    text-align: center;

    > * {
        margin: 10px 0px;
    }
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
/**2023-05-16 음원 태그 : 김주비 */
const MusicTags = styled.ul`
    display: flex;
    overflow: hidden;
    li {
        padding: 5px 20px;
        border: 2px solid rgba(199, 68, 68, 1);
        border-radius: 20px;
        font-size: 13px;
        transform: scale(0.9);
        color: rgba(199, 68, 68, 1);
        animation: ascendText2 1s forwards 1s;
    }
`;
/**2023-05-09 음원 타이틀 : 김주비 */
const MusicTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6.5rem;
    letter-spacing: -2px;
    text-transform: uppercase;
    font-weight: 700;
    overflow: hidden;
    span {
        transform: translateY(100px);
        animation: ascendText 1s forwards 1.5s;
    }
    @media (max-width: 700px) {
        font-size: 4rem;
    }
`;
/**2023-05-09 음원 정보 : 김주비 */
const MusicInfo = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    li {
        margin-right: 20px;
        transform: translateY(20px);
        animation: ascendText 1s forwards 2s;
    }
    li:nth-child(2n-1) {
        font-weight: 600;
    }
    li:nth-child(2n) {
        opacity: 0.6;
    }

    @media (max-width: 700px) {
    }
`;
/**2023-05-09 사이드 텍스트 : 김주비 */
const MusicText = styled.div`
    display: flex;
    font-size: 13px;
    line-height: 150%;
    width: 600px;
    height: 40px;
    overflow-x: hidden;
    padding-right: 30px;
    opacity: 0;
    animation: fadeinText 1s forwards 2.5s;
    @media (max-width: 1000px) {
        width: 100%;
    }
    @media (max-width: 700px) {
        text-align: center;
    }
`;
