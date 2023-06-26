import styled from 'styled-components';
import Categories from './Categories';
import Trending from './Trending';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Sideicon from 'src/components/musiclist/SideIcon';
import { BiSearch } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { MusicDataResponse } from 'src/types/Musiclist';
import { musicDataListState, playListModalState, showSearch, tagSreachState } from 'src/recoil/Atoms';
import Loding from 'src/pages/Loding';
import AddListMusic from './AddListMusic';

const Musiclist = () => {
    const [musicDataList, setMusicDataList] = useRecoilState(musicDataListState);
    const [tagSearch] = useRecoilState(tagSreachState);
    const [isLoding, setIsLoding] = useState(true);
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
    const [openSearch, setOpenSearch] = useRecoilState<boolean>(showSearch);
    const [openPlayList, setOpenPlayList] = useRecoilState<boolean>(playListModalState);
    const [tapClick, setTapClick] = useState<string>('musics');
    const buttonArray = [];

    /* 2023.05.21 서치 결과에 따른 뮤직리스트 출력 */
    const showSearchResult = (searchText: string) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/musics/search-by-keyword`, {
                params: {
                    keyword: searchText,
                    page: currentPage,
                    size: 5,
                },
            })
            .then((response) => {
                const { content, pageInfo } = response.data;
                setMusicDataList(content);
                setTotalPages(pageInfo.totalPages);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /* 2023.05.21 뮤직리스트 토탈 출력 */

    const url = tagSearch
        ? `musics/search-by-tags?${tagSearch}&page=${currentPage}&size=5`
        : `${tapClick}?&page=${currentPage}&size=5`;

    useEffect(() => {
        axios
            .get<MusicDataResponse>(`${process.env.REACT_APP_API_URL}/${url}`)
            .then((response) => {
                if (tagSearch) {
                    setMusicDataList(response.data.content);
                } else {
                    setMusicDataList(response.data.data);
                }
                setTotalPages(response.data.pageInfo.totalPages);
                setIsLoding(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tapClick, currentPage, tagSearch]);

    /** 2023.05.17 전체 페이지 수 만큼 버튼 생성 - 김주비*/
    const prevGroupPage = Math.floor((currentPage - 1) / 5) * 5;
    const nextGroupPage = Math.ceil(currentPage / 5) * 5 + 1;

    const isPrevButtonDisabled = prevGroupPage < 1; // 이전페이지 비활성화 여부
    const isNextButtonDisabled = nextGroupPage > totalPages; // 다음페이지 비활성화 여부

    for (let i = prevGroupPage + 1; i < Math.min(prevGroupPage + 6, totalPages + 1); i++) {
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
    const handleNextPage = () => {
        if (!isNextButtonDisabled) {
            setCurrentPage(nextGroupPage);
        }
    };
    const handlePrevPage = () => {
        if (!isPrevButtonDisabled) {
            setCurrentPage(prevGroupPage);
        }
    };

    const formatSecondsToTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <Container>
            <BackgroundCover></BackgroundCover>
            {openPlayList && (
                <PlaylistContainer>
                    <PlaylistModal>
                        <AddListMusic />
                        <Exitbox onClick={() => setOpenPlayList(false)}>
                            <ImCross />
                        </Exitbox>
                    </PlaylistModal>
                </PlaylistContainer>
            )}
            <MusiclistContainer>
                <TagContainer className={openSearch ? 'open-search' : ''}>
                    <Categories showSearchResult={showSearchResult} />
                </TagContainer>
                <RightContainer>
                    <SearchOpen
                        onClick={() => {
                            setOpenSearch(true);
                        }}
                    >
                        <BiSearch />
                        SEARCH
                    </SearchOpen>
                    <Trending />
                    <MusicListTitle>
                        <div className="musicList-title">Music List</div>
                        <div className="music-inquiry">
                            <li
                                onClick={() => {
                                    setTapClick('musics');
                                }}
                                className={tapClick === 'musics' ? 'active' : ''}
                            >
                                최신순
                            </li>
                            <li
                                onClick={() => {
                                    setTapClick('musics/order-by-like-count');
                                }}
                                className={tapClick === 'musics/order-by-like-count' ? 'active' : ''}
                            >
                                좋아요순
                            </li>
                        </div>
                    </MusicListTitle>
                    {isLoding ? (
                        <Loding />
                    ) : (
                        <SongContainer>
                            {musicDataList.map((musicData) => (
                                <Item key={musicData.musicId}>
                                    <li className="music-image">
                                        <img src={musicData.albumCoverImg} alt={musicData.musicName} />
                                    </li>
                                    <li className="music-name">
                                        <Link to={`/musiclist/${musicData.musicId}`}>{musicData.musicName}</Link>
                                    </li>
                                    <li className="music-artist color-gray">{musicData.artistName}</li>
                                    <li className="music-album color-gray">{musicData.albumName}</li>
                                    <TagValue>
                                        {musicData.musicTagName.slice(0, 2).map((tag, i) => (
                                            <li key={`tag-${i}`}>{tag}</li>
                                        ))}
                                    </TagValue>
                                    <li className="music-time color-gray">
                                        {formatSecondsToTime(Number(musicData.musicTime))}
                                    </li>
                                    <Sideicon musicId={musicData.musicId} musicUri={musicData.musicUri} />
                                </Item>
                            ))}
                        </SongContainer>
                    )}
                    <Pagination>
                        <button disabled={currentPage === 1} onClick={handlePrevPage}>
                            Prev
                        </button>
                        {buttonArray}
                        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                            Next
                        </button>
                    </Pagination>
                </RightContainer>
            </MusiclistContainer>
        </Container>
    );
};

export default Musiclist;

/* 2023.05.08 MusicList 컴포넌트 구현 - 홍혜란 */
const Container = styled.div`
    height: 100vh;
    overflow-x: hidden;
`;

/* 2023.05.08 MusicList (뮤직리스트 전체 컨테이너) 컴포넌트 구현 - 홍혜란 */
const MusiclistContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    @media screen and (max-width: 700px) {
        padding-top: 100px;
    }
`;

/* 2023.05.08 MusicList (검색,카테고리 컨테이너) 컴포넌트 구현 - 홍혜란 */
const TagContainer = styled.div`
    width: 450px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 700px) {
        /* display: none; */
        position: fixed;
        display: none;
        top: 0px;
        height: 100vh;
        width: 0%;
        z-index: 3;
        animation: openSearch 1s forwards;
        overflow: hidden;
    }

    &.open-search {
        display: block;
    }
    @keyframes openSearch {
        100% {
            width: 100%;
        }
    }
`;

/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 - 김주비 */
const BackgroundCover = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url('./assets/background-img03.jpg');
    filter: blur(5px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 30s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.3);
        }
    }
`;

/* 2023.05.08 MusicList (뮤직리스트 오른쪽 컨테이너) 컴포넌트 구현 - 홍혜란 */
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin: 0px 5%;
    @media screen and (max-width: 700px) {
        width: 90%;
    }
`;

/* 2023.05.08 MusicList (뮤직리스트 출력 타이틀) 컴포넌트 구현 - 홍혜란 */
const MusicListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;

    .musicList-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: hsl(0, 0%, 100%);
    }
    .music-inquiry {
        display: flex;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 5px;
        cursor: pointer;
    }
    li {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.2);
        padding: 8px 12px;
        align-items: center;
        height: 100%;
    }
    li:nth-child(2) {
        border-left: 2px solid rgba(255, 255, 255, 0.4);
    }
    .active {
        color: rgba(255, 255, 255, 0.6);
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

/* 2023.05.08 MusicList (뮤직리스트) 컴포넌트 구현 - 홍혜란 */
const SongContainer = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;
    width: 100%;
`;

/* 2023.05.08 MusicList (뮤직리스트의 아이템 전체) 컴포넌트 구현 - 홍혜란 */
const Item = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: hsl(0, 0%, 100%);
    transition: 0.3s ease-in-out;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    &:hover {
        background-color: hsl(0, 0%, 46%, 0.5);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        letter-spacing: 0.5px;
        height: 20px;
        width: 100%;
        font-family: 'Rajdhani', sans-serif;
    }

    :nth-child(1) {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .music-name a {
        color: #ccc;
        text-decoration: none;
        font-weight: 500;
    }
    .music-image {
        width: 70px;
        height: 50px;
    }
    .music-image img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin: 0px 10px;
    }

    .color-gray {
        color: #999;
    }
    @media (max-width: 1200px) {
        .music-time {
            display: none;
        }
        .music-album {
            display: none;
        }
    }
    @media (max-width: 700px) {
        .music-artist {
            display: none;
        }
    }
`;

const TagValue = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    min-width: 160px;
    /* border: 1px solid red; */

    li {
        font-family: 'Noto Sans KR', sans-serif;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 5px;
        width: 80px;
        font-size: 0.65rem;
        color: #d4d4d4;
        margin: 3px;
        font-weight: 300;
        text-transform: uppercase;
    }
`;

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

const SearchOpen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
    border-radius: 20px;
    border: 2px solid #ccc;
    color: #ccc;
    font-size: 0.8rem;
    transition: 0.2s ease-in-out;
    > * {
        margin-right: 5px;
    }
    :hover {
        border: 2px solid rgba(199, 68, 68, 1);
        color: rgba(199, 68, 68, 1);
    }
    @media (min-width: 700px) {
        display: none;
    }
`;
/**2023/05/23 - 플레이리스트 음원 추가 컨테이너 - 박수범 */
const PlaylistContainer = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 0vh;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 3;
    animation: showModal 1s forwards;
    @keyframes showModal {
        100% {
            height: 100vh;
        }
    }
`;
/**2023/05/23 - 플레이리스트 음원추가 모달창 - 박수범 */
const PlaylistModal = styled.div`
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 600px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    @media (max-width: 700px) {
        width: 400px;
        height: 560px;
    }
    > button {
        cursor: pointer;
    }
`;
const Exitbox = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    left: 0px;
    width: 60px;
    height: 60px;
    font-size: 10px;
    color: #ccc;
    text-align: center;
    font-size: 2rem;
    border: 2px solid #ccc;

    cursor: pointer;
    z-index: 3;
    :hover {
        color: rgba(199, 68, 68, 1);
        border-color: rgba(199, 68, 68, 1);
    }
`;
