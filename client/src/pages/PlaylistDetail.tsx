import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commentOpenState, soundbarOpenState } from 'src/recoil/Atoms';
import { PlcardProps } from 'src/types/Slider';
import CommentViewer from 'src/components/musicdetail/CommentViewer';
import Sidebutton from 'src/components/musicdetail/SideButton';
import {
    DetailGroup,
    PlaylistBackground,
    DetailSection,
    AlbumRecode,
    MusicContents,
    MusicTags,
    MusicTitle,
    MusicInfo,
    MusicText,
} from 'src/components/musicdetail/style/DetailStyle';

function PlaylistDetail() {
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

export default PlaylistDetail;
