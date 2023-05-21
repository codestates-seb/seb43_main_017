import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
/*
1. axios.get으로 유저가 좋아요 누른 음악들만 불러온다.
2. res.data안에 들어있는 좋아요한 음악들의 리스트를 state로 관리한다.
3. 상태값을 map으로 순회하며 <li>타이틀</li>/<li>가수</li>/<button onClick={setSelectedSong(uri)}> 뿌려준다.
4. selectedSong는 audio src로 사용한다.
5.최종적으로  타이틀   가수    +버튼  이런식으로 뿌려지게 한다.

 */
function MixingList() {
    const [selectedSong, setSelectedSong] = useState<string>(
        'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
    );
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleSongClick = (songUrl: string) => {
        setSelectedSong(songUrl);
        alert(selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[0] + '이 추가되었습니다.');
    };

    const handleVideoPlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handleVideoPause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <MusicListContainer>
            <MusicList>
                <MusicTitle>{selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[0]}</MusicTitle>
                <MusicTitle>{selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[1].split('.')[0]}</MusicTitle>
                <SongItem
                    onClick={() =>
                        handleSongClick(
                            'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
                        )
                    }
                >
                    <AiOutlinePlus />
                </SongItem>
            </MusicList>
            <MusicList>
                <MusicTitle>{selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[0]}</MusicTitle>
                <MusicTitle>{selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[1].split('.')[0]}</MusicTitle>
                <SongItem
                    onClick={() =>
                        handleSongClick(
                            'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
                        )
                    }
                >
                    <AiOutlinePlus />
                </SongItem>
            </MusicList>
            <MusicList>
                <MusicTitle>{selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[0]}</MusicTitle>
                <MusicTitle>{selectedSong.split('/')[4].replaceAll('+', ' ').split('-')[1].split('.')[0]}</MusicTitle>
                <SongItem
                    onClick={() =>
                        handleSongClick(
                            'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
                        )
                    }
                >
                    <AiOutlinePlus />
                </SongItem>
            </MusicList>

            {selectedSong && (
                <div>
                    <p>Selected Song: {selectedSong.split('/')[4].replaceAll('+', ' ')}</p>
                    <audio ref={audioRef} controls src={selectedSong} />
                </div>
            )}
        </MusicListContainer>
    );
}

const MusicListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MusicList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const MusicTitle = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    color: #c7c4c4;
    margin: 0px 10px;
`;

const SongItem = styled.button`
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
        color: #ed0dd3;
    }
    &:focus {
        color: green;
    }
`;

export default MixingList;
