import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commentOpenState, soundbarOpenState } from 'src/recoil/Atoms';
import { PlcardProps } from 'src/types/Slider';
import CommentViewer from 'src/components/musicdetail/CommentViewer';
import Sidebutton from 'src/components/musicdetail/SideButton';

function MusicDetail() {
    const plId = useParams();
    const [plDetailData, setPlDetailData] = useState<PlcardProps>({
        playListId: 0,
        memberId: 0,
        createMember: '',
        title: '',
        body: '',
        createdAt: '',
        modifiedAt: '',
    });
    console.log(plDetailData);
    const [commentOpen] = useRecoilState<boolean>(commentOpenState);
    const [, setSoundbarOpen] = useRecoilState<boolean>(soundbarOpenState);

    useEffect(() => {
        setSoundbarOpen(true);
        axios
            .get(`http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/playlists/${plId.plId}`)
            .then(function (response) {
                // 성공적으로 요청을 보낸 경우
                // console.log(response.data.pageInfo.totalPages);
                setPlDetailData(response.data.data);
            })
            .catch(function (error) {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });
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
                        <span>{plDetailData.title}</span>
                    </MusicTitle>
                    <MusicInfo>
                        <li>CREATE</li>
                        <li>{plDetailData.createMember}</li>
                        <li>ALBUM</li>
                        <li>정보없음</li>
                    </MusicInfo>
                    <MusicText>
                        <span>{plDetailData.body}</span>
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
    background: url('/assets/background-detail-recode.png');
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
        width: 80%;
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
        transform: translateY(50px);
        color: rgba(199, 68, 68, 1);
        animation: ascendText2 2s forwards 1s;
    }
`;
/**2023-05-09 음원 타이틀 : 김주비 */
const MusicTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 5.5rem;
    letter-spacing: -2px;
    text-transform: uppercase;
    font-weight: 700;
    overflow: hidden;
    span {
        transform: translateY(100px);
        animation: ascendText 2s forwards 1.5s;
    }
    @media (max-width: 1200px) {
        font-size: 4rem;
    }
    @media (max-width: 700px) {
        font-size: 3rem;
    }
`;
/**2023-05-09 음원 정보 : 김주비 */
const MusicInfo = styled.ul`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    li {
        margin-right: 20px;
        transform: translateY(20px);
        animation: ascendText 1s forwards 2.5s;
    }
    li:nth-child(2n-1) {
        font-weight: 600;
    }
    li:nth-child(2n) {
        opacity: 0.6;
    }

    @media (max-width: 700px) {
        font-size: 0.8rem;
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
    animation: fadeinText 2s forwards 3s;
    @media (max-width: 1000px) {
        width: 100%;
    }
    @media (max-width: 700px) {
        text-align: center;
    }
`;
