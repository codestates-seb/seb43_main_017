import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    commentOpenState,
    downloadLink,
    showDownloadState,
    musicIdState,
    playlistCommentState,
    playingMusic,
} from 'src/recoil/Atoms';
import { musicdetail } from 'src/types/Slider';
import CommentViewer from 'src/components/musicdetail/CommentViewer';
import Sidebutton from 'src/components/musicdetail/SideButton';
import {
    DetailGroup,
    PlaylistBackground,
    DetailSection,
    AlbumRecode,
    MusicContents,
    MusicTitle,
    Lodingbar,
    MusicInfo,
    MusicText,
} from 'src/components/musicdetail/style/DetailStyle';
import MusicPlayer from 'src/components/soundbar/SoundBar';

function MusicDetail() {
    const msId = useParams();
    sessionStorage.setItem('musicId', String(msId.msId));
    sessionStorage.setItem('onPlaylist', 'false');
    const [commentOpen] = useRecoilState<boolean>(commentOpenState);
    const [playingDots] = useRecoilState<boolean>(playingMusic);
    const [, setShowDownlaod] = useRecoilState<boolean>(showDownloadState);
    const [, setPlaylistComment] = useRecoilState<boolean>(playlistCommentState);
    const [formattedTime, setFormattedTime] = useState<number>(0);
    const [, setDownload] = useRecoilState<string>(downloadLink);
    const [, setMusicId] = useRecoilState<string | undefined>(musicIdState);
    const [msDetailData, setMsDetailData] = useState<musicdetail>({
        musicId: 0,
        musicName: '',
        artistName: '',
        albumName: '',
        musicTime: 0,
        albumCoverImg: '',
        musicUri: '',
        musicTagName: [],
        createdAt: '',
        modifiedAt: '',
    });

    useEffect(() => {
        // setSoundbarOpen(true);
        setShowDownlaod(true);
        setPlaylistComment(false);
        setMusicId(msId.msId);
        axios
            .get(`${process.env.REACT_APP_API_URL}/musics/${msId.msId}`)
            .then(function (response) {
                // 성공적으로 요청을 보낸 경우

                setMsDetailData(response.data.data);
                setFormattedTime(Number(response.data.data.musicTime));
                setDownload(response.data.data.musicUri);
            })
            .catch(function (error) {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });
    }, []);

    const formatSecondsToTime = () => {
        const minutes = Math.floor(formattedTime / 60);
        const remainingSeconds = formattedTime % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };
    const musicTime = formatSecondsToTime();

    return (
        <DetailGroup>
            {commentOpen ? <CommentViewer></CommentViewer> : null}
            <PlaylistBackground url={msDetailData.albumCoverImg}></PlaylistBackground>
            <DetailSection>
                <AlbumRecode url={msDetailData.albumCoverImg}>
                    <Lodingbar>
                        {[...Array(5)].map((_, index) => (
                            <li className={playingDots ? `sec-${index}` : ''}></li>
                        ))}
                    </Lodingbar>
                </AlbumRecode>
                <MusicContents>
                    <MusicTitle>
                        <span>{msDetailData.musicName}</span>
                    </MusicTitle>
                    <MusicInfo>
                        <li>CREATE</li>
                        <li>{msDetailData.artistName}</li>
                        <li>ALBUM</li>
                        <li>{msDetailData.albumName}</li>
                        <li>TIME</li>
                        <li>{musicTime}</li>
                    </MusicInfo>
                    <MusicText>
                        <span>The music information does not exist.</span>
                    </MusicText>
                </MusicContents>
                <Sidebutton />
                <MusicPlayer />
            </DetailSection>
        </DetailGroup>
    );
}

export default MusicDetail;
