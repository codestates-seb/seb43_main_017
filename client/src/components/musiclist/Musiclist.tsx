import styled from 'styled-components';
import Search from './Search';
import Categories from './Categories';
import Trending from './Tranding';
import { FiPlayCircle, FiFolderPlus } from 'react-icons/fi';
import { BsBoxArrowInDown } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { isLikedState } from 'src/recoil/Atoms';
import { useState } from 'react';

/* 2023.05.08 MusicList MusicList 타입 선언 - 홍혜란 */
interface MusicData {
    musicId: number;
    albumCoverImg: string;
    musicName: string;
    artistName: string;
    albumName: string;
    musicTime: string;
    tags: string[];
    isLiked: boolean;
}

const MusicList: MusicData[] = [
    {
        musicId: 0,
        albumCoverImg: '/assets/ditto.png',
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        musicTime: '3:15',
        tags: ['잔잔한', '발라드', '피아노'],
        isLiked: false,
    },
    {
        musicId: 1,
        albumCoverImg: '/assets/ditto.png',
        musicName: 'Stitches',
        artistName: 'Shawn Mendes',
        albumName: 'Handwritten',
        musicTime: '3:26',
        tags: ['우울한', '어쿠스틱', '기타'],
        isLiked: false,
    },
    {
        musicId: 2,
        albumCoverImg: '/assets/ditto.png',
        musicName: 'Attention',
        artistName: 'Charlie Puth',
        albumName: 'Voicenotes',
        musicTime: '3:31',
        tags: ['신나는', '댄스'],
        isLiked: false,
    },
    {
        musicId: 3,
        albumCoverImg: '/assets/ditto.png',
        musicName: 'Ditto',
        artistName: 'Newjeans',
        albumName: 'OMG',
        musicTime: '3:15',
        tags: ['잔잔한', '발라드', '피아노'],
        isLiked: false,
    },
    {
        musicId: 4,
        albumCoverImg: '/assets/ditto.png',
        musicName: 'Stitches',
        artistName: 'Shawn Mendes',
        albumName: 'Handwritten',
        musicTime: '3:26',
        tags: ['우울한', '어쿠스틱', '기타'],
        isLiked: false,
    },
    {
        musicId: 5,
        albumCoverImg: '/assets/ditto.png',
        musicName: 'Attention',
        artistName: 'Charlie Puth',
        albumName: 'Voicenotes',
        musicTime: '3:31',
        tags: ['신나는', '댄스'],
        isLiked: false,
    },
];

const Musiclist = () => {
    /* 2023.05.11 뮤직리스트 좋아요 상태 관리 - 홍혜란 */
    const [msList, setMsList] = useState(MusicList);
    const [isLiked, setIsLiked] = useRecoilState(isLikedState);

    const handleClick = (index: number) => {
        const updatedMusicList = [...msList];
        updatedMusicList[index].isLiked = !updatedMusicList[index].isLiked;
        setIsLiked(updatedMusicList[index].isLiked);
        setMsList(updatedMusicList);
    };

    return (
        <Container>
            <BackgroundCover></BackgroundCover>
            <MusiclistContainer>
                <TagContainer>
                    <Search />
                    <Categories />
                </TagContainer>
                <RightContainer>
                    <Trending />
                    <MusicListTitle>
                        <div className="musicList-title">MUSIC LIST</div>
                        <div className="music-inquiry">
                            <li>최신순</li>
                            <li>좋아요순</li>
                        </div>
                    </MusicListTitle>
                    <SongContainer>
                        {msList.map((music) => (
                            <Item key={music.musicId}>
                                <li>
                                    <img src={music.albumCoverImg} alt={music.musicName} />
                                </li>
                                <li>{music.musicName}</li>
                                <li>{music.artistName}</li>
                                <li>{music.albumName}</li>
                                <li>{music.musicTime}</li>
                                <li>
                                    <FiPlayCircle />
                                </li>
                                <li>
                                    <FiFolderPlus />
                                </li>
                                <li>
                                    <BsBoxArrowInDown />
                                </li>
                                <li>
                                    <AiOutlineHeart />
                                </li>
                            </Item>
                        ))}
                    </SongContainer>
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
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

/* 2023.05.08 MusicList (검색,카테고리 컨테이너) 컴포넌트 구현 - 홍혜란 */
const TagContainer = styled.div`
    width: 500px;
    height: 100vh;
    background: rgba(0, 0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 700px) {
        width: 350px;
        height: auto;
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
    margin-left: 100px;
    @media screen and (max-width: 700px) {
        margin-left: 0;
        margin-top: 30px;
    }
`;

/* 2023.05.08 MusicList (뮤직리스트 출력 타이틀) 컴포넌트 구현 - 홍혜란 */
const MusicListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;

    .musicList-title {
        font-size: 30px;
        color: hsl(0, 0%, 100%);
        margin: 20px 0px 20px 0px;
        font-family: 'Monoton';
        transform: translateY(30px);
        animation: movingtext 1s forwards 0.2s;
    }

    .music-inquiry {
        display: flex;
        margin: 20px 80px 0px 30px;
        border: 1px solid white;
        border-radius: 20px;
        transform: translateY(30px);
        animation: movingtext 1s forwards 0.2s;

        li {
            font-size: 12px;
            color: hsl(0, 0%, 100%);
            padding: 8px 12px;
            align-items: center;
            height: 100%;
        }

        li:nth-child(2) {
            border-left: 1px solid white;
        }
    }
    @media screen and (max-width: 800px) {
        margin-left: 50px;
        .music-inquiry > li {
            font-size: 5px;
            padding: 6px 8px;
        }
    }
`;

/* 2023.05.08 MusicList (뮤직리스트) 컴포넌트 구현 - 홍혜란 */
const SongContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 500px;
`;

/* 2023.05.08 MusicList (뮤직리스트의 아이템 전체) 컴포넌트 구현 - 홍혜란 */
const Item = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    width: 100%;
    color: hsl(0, 0%, 100%);
    &:hover {
        background-color: hsl(0, 0%, 46%, 0.5);
    }
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;

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
        font-size: 12px;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li:nth-child(n + 2):nth-child(-n + 5) {
        margin-right: 100px;
    }

    li:nth-child(n + 3):nth-child(-n + 5) {
        color: hsl(0, 0%, 72%);
    }

    li:nth-child(n + 6):nth-child(-n + 9) {
        font-size: 18px;
    }

    li:nth-child(1) {
        margin-right: 50px;
    }

    li:nth-child(2) {
        font-weight: bold;
    }

    li:nth-child(6) {
        color: hsl(207, 100%, 52%);
    }

    li:nth-child(9) {
        color: rgb(245, 109, 109);
        margin-right: 45px;
    }

    li > img {
        width: 50px;
        height: 50px;
        border-radius: 10%;
    }
    @media screen and (max-width: 1200px) {
        li:nth-child(n + 2):nth-child(-n + 5) {
            font-size: 10px;
            margin-right: 5px;
        }
    }
    @media screen and (max-width: 800px) {
        li:nth-child(n + 4):nth-child(-n + 5) {
            display: none;
        }
        li > img {
            width: 40px;
            height: 40px;
        }
        li:nth-child(n + 2):nth-child(-n + 3) {
            font-size: 11px;
            margin-right: 5px;
        }
        li:nth-child(1) {
            margin-right: 5px;
            margin-left: 30px;
        }
        li:nth-child(9) {
            margin-right: 20px;
        }
    }
`;

/* 추후 음악 데이터 불러오는 코드 */
// const fetchMusicData = async (): Promise<MusicData[]> => {
//     const response = await fetch('/api/music');
//     const musicData: MusicData[] = await response.json();
//     return musicData;
// };
/* 추후 음악 데이터 불러오는 코드 */
//       const [musicData, setMusicData] = useState<MusicData[]>([]);
//   useEffect(() => {
//     fetchMusicData().then((data) => {
//       setMusicData(data); // 받아온 데이터를 상태에 저장합니다.
//     });
//   }, []);
