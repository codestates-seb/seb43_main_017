import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commentOpenState, showDownloadState, playlistCommentState, musicIdState } from 'src/recoil/Atoms';
import { PlcardProps } from 'src/types/Slider';
import CommentViewer from 'src/components/musicdetail/CommentViewer';
import Sidebutton from 'src/components/musicdetail/SideButton';
import {
    DetailGroup,
    PlaylistBackground,
    DetailSection,
    AlbumRecode,
    MusicContents,
    // MusicTags,
    MusicTitle,
    MusicInfo,
    MusicText,
} from 'src/components/musicdetail/style/DetailStyle';
import MusicPlayer from 'src/components/soundbar/SoundBar';

function PlaylistDetail() {
    const plId = useParams();
    sessionStorage.setItem('musicId', String(plId.plId));
    sessionStorage.setItem('onPlaylist', 'true');
    const [plDetailData, setPlDetailData] = useState<PlcardProps>({
        playListId: 0,
        memberId: 0,
        createMember: '',
        title: '',
        coverImg: '',
        tags: [],
        likeCount: 0,
        body: '',
        createdAt: '',
        modifiedAt: '',
    });
    const [commentOpen] = useRecoilState<boolean>(commentOpenState);
    const [, setShowDownlaod] = useRecoilState<boolean>(showDownloadState);
    const [, setMusicId] = useRecoilState<string | undefined>(musicIdState);
    const [, setPlaylistComment] = useRecoilState<boolean>(playlistCommentState);

    useEffect(() => {
        setShowDownlaod(false);
        setPlaylistComment(true);
        setMusicId(plId.plId);
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
            <PlaylistBackground url={plDetailData.coverImg}></PlaylistBackground>
            <DetailSection>
                <AlbumRecode url={plDetailData.coverImg}>
                    {/* <MusicTags>
                        {plDetailData.tags.map((tag, index) => (
                            <li key={`tag-${index}`}>{tag}</li>
                        ))}
                    </MusicTags> */}
                </AlbumRecode>
                <MusicContents>
                    <MusicTitle>
                        <span>{plDetailData.title}</span>
                    </MusicTitle>
                    <MusicInfo>
                        <li>CREATE</li>
                        <li>{plDetailData.createMember}</li>
                        <li>ALBUM</li>
                        <li>No album</li>
                    </MusicInfo>
                    <MusicText>
                        <span>{plDetailData.body}</span>
                    </MusicText>
                </MusicContents>
                <Sidebutton />
                <MusicPlayer />
            </DetailSection>
        </DetailGroup>
    );
}

export default PlaylistDetail;
