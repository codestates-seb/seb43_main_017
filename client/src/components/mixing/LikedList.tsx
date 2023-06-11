import styled from 'styled-components';
import { HiHeart } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useEffect, useState, RefObject } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showSearch, CurrentMusicState } from 'src/recoil/Atoms';
import { MdTransitEnterexit, MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface LikeMusicList {
    albumCoverImg: string;
    albumName: string;
    artistName: string;
    createdAt: string;
    memberId: number;
    modifiedAt: string;
    musicId: number;
    musicLikeCount: number;
    musicName: string;
    musicTagName: string;
    musicTime: number;
    musicUri: string;
}
/** 2022/05/22 - useRef 타입 선언 - 박수범 */
interface LikedListProps {
    audioRef: RefObject<HTMLAudioElement>;
    setAudioSelect: React.Dispatch<React.SetStateAction<boolean>>;
}
const LikedList = ({ audioRef, setAudioSelect }: LikedListProps) => {
    const setShowSearch = useSetRecoilState<boolean>(showSearch); //모버일버전 좋아요 음악리스트 닫기
    const [emptyList, setEmptyList] = useState<boolean>(false); //좋아요한 음악이 있는지 없는지 여부
    const [MusicTitle, setMusicTitle] = useState<string>(''); //현재 삽입된 오디오 제목
    const [currentMusic, setCurrentMusic] = useRecoilState(CurrentMusicState); // 선택된 음악인지 판단하는 값
    const [audioControl, setAudioControl] = useState<boolean>(false); //오디오 선택창 표시여부
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지
    const buttonArray = [];
    const [likedMusic, setLikedMusic] = useState<LikeMusicList[]>([]); //좋아요한 음악 리스트
    const token: string | undefined = window.localStorage.getItem('access_token') || undefined;
    const [selectedSong, setSelectedSong] = useState<string>(
        'https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/music/A+Hero+Is+Born+-+Anuch.mp3',
    );
    /**2022/05/22 - 믹싱페이지 진입 시 좋아요 한 음악리스트를 받아오는 요청 - 박수범 */
    useEffect(() => {
        const fetchLikedMusic = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/musics/liked-musics?&page=${currentPage}&size=8`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                );
                const likedMusicData: LikeMusicList[] = response.data.data.filter(
                    (music: LikeMusicList) => music.musicLikeCount > 0,
                );
                if (likedMusicData.length < 1) {
                    return setEmptyList(false);
                }
                setEmptyList(true);
                setLikedMusic(likedMusicData);
                setTotalPages(response.data.pageInfo.totalPages);
            } catch (error) {
                console.error('Error fetching liked music:', error);
            }
        };

        fetchLikedMusic();
    }, [setLikedMusic, currentPage]);

    /** 2023.05.17 전체 페이지 수 만큼 버튼 생성 - 김주비*/
    for (let i = 1; i <= totalPages; i++) {
        buttonArray.push(
            <button
                key={i}
                className={i === currentPage ? 'page-focused' : ''}
                onClick={() => {
                    setCurrentPage(i);
                }}
            >
                {i}
            </button>,
        );
    }
    /** 2022/05/22 -  다음 음원목록으로 이동하는 함수 - 박수범*/
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    /** 2022/05/22 - 이전 음원목록으로 이동하는 함수 - 박수범*/
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    /** 2022/05/22 - 현재 선택한 음악의 url을 저장하고, 오디오 컨트롤러 상태를 변경해준다. 현재곡이 추가됐다는 알림이 뜨게 해주는 함수 -박수범 */
    const handleSongClick = (songUrl: string, songName: string) => {
        setSelectedSong(songUrl);
        setAudioControl(true);

        alert(songName + '이 추가되었습니다.');
    };

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <HiHeart />
                    <p>LIKE MUSIC</p>
                </div>
            </LikeTitle>
            {emptyList ? (
                likedMusic.map((likedata) => (
                    <LikeList key={likedata.musicId}>
                        <img src={likedata.albumCoverImg} alt={likedata.musicName} />
                        <li>{likedata.musicName}</li>
                        <li>{likedata.artistName}</li>
                        <AddMusic
                            onClick={() => {
                                handleSongClick(likedata.musicUri, likedata.musicName);
                                setCurrentMusic(true);
                                setMusicTitle(likedata.musicName);
                                setAudioSelect(true);
                            }}
                        >
                            <AiOutlinePlus />
                        </AddMusic>
                    </LikeList>
                ))
            ) : (
                <Link to="/musiclist" style={{ textDecoration: 'none' }}>
                    <EmptyListText>
                        <MdArrowRight />
                        Add your favorite music.
                        <MdArrowLeft />
                    </EmptyListText>
                </Link>
            )}
            {currentMusic && (
                <CurrentMusic>
                    현재 곡은 <span>"{MusicTitle}"</span>입니다.
                </CurrentMusic>
            )}
            {audioControl && (
                <audio ref={audioRef} src={`https://uncoversound.com/assets/music/${selectedSong}`}></audio>
            )}
            {emptyList ? (
                <Pagination>
                    <button disabled={currentPage === 1} onClick={handlePrevPage}>
                        Prev
                    </button>
                    {buttonArray}
                    <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                        Next
                    </button>
                </Pagination>
            ) : null}
            <Exitbox
                onClick={() => {
                    setShowSearch(false);
                }}
            >
                <MdTransitEnterexit />
            </Exitbox>
        </LikeContainer>
    );
};

export default LikedList;

/* 2023.05.10 Like Music 전체 박스 컴포넌트 - 홍혜란 */
const LikeContainer = styled.div`
    width: 15rem;
    align-items: center;
    margin: 30px;
    font-size: 1rem;
    @media screen and (max-width: 1000px) {
        width: 200px;
        margin: 0;
        margin-top: 50px;
        margin-left: 30px;
    }
`;

/* 2023.05.10 Like Music 타이틀 컴포넌트 - 홍혜란 */
const LikeTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;

    .vote-icon {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: rgb(245, 109, 109);
        padding-top: 5px;
    }

    p {
        font-size: 16px;
        color: #ffffff;
        margin-left: 5px;
    }
`;

/* 2023.05.10 Like Music 리스트 출력 컴포넌트 - 홍혜란 */
const LikeList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid hsl(0, 0%, 65%);
    padding: 8px;
    margin-bottom: 20px;

    img {
        width: 30px;
        height: 30px;
        border-radius: 10%;
    }

    li {
        font-size: 12px;
        color: white;
    }

    .music-icon {
        font-size: 16px;
        color: rgb(245, 109, 109);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 1530px) {
        width: 650px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid hsl(0, 0%, 65%);
        padding: 8px;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 722px) {
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid hsl(0, 0%, 65%);
        padding: 8px;
        margin-bottom: 20px;
    }
`;
/* 2023.05.10 Like Music 리스트 페이지네이션 - 홍혜란 */
const Pagination = styled.div`
    button {
        color: #ccc;
        background: none;
        border: 1px solid #5a5a5a;
        border-radius: 3px;
        margin: 40px 3px;
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }
    button:hover {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }

    button:disabled {
        border: 1px solid #5a5a5a;
        color: #5a5a5a;
    }
    button:disabled:hover {
        background: none;
        cursor: default;
    }

    .page-focused {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }
`;
/* 2023.05.10 Like Music 리스트 음악 영상에 추가 - 홍혜란 */
const AddMusic = styled.button`
    background: none;
    border: 0;
    outline: 0;
    color: aquamarine;
    cursor: pointer;
    font-size: 20px;
    &:hover {
        color: red;
    }
`;
/**2023/05/22 - 현재음악 알려주는 p태그 - 박수범 */
const CurrentMusic = styled.p`
    margin-top: 50px;
    font-size: 14px;
    color: #b8b3b3;
    > span {
        font-weight: bold;
        color: #feeaea;
    }
`;
/**2023/05/22 - 모바일버전 좋아요한 음악 리스트 나가기 버튼 - 박수범 */
const Exitbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    color: rgba(199, 68, 68, 1);
    text-align: center;
    border: 2px solid rgba(199, 68, 68, 1);
    :hover {
        color: #ccc;
        border-color: #ccc;
    }
    @media screen and (min-width: 1530px) {
        display: none;
    }
`;
const EmptyListText = styled.p`
    color: #ccc;
    @keyframes blink-effect {
        50% {
            opacity: 0;
        }
    }
    animation: blink-effect 1s step-end infinite;
`;
