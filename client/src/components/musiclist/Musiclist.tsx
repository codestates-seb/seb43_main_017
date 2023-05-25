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
    index: number;
    albumCover: string;
    songTitle: string;
    artistName: string;
    songAlbum: string;
    musicTime: string;
    tag: string[];
    isLiked: boolean;
}

const MusicList: MusicData[] = [
    {
        index: 0,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
        tag: ['잔잔한', '발라드', '피아노'],
        isLiked: false,
    },
    {
        index: 1,
        albumCover: '/assets/ditto.png',
        songTitle: 'Stitches',
        artistName: 'Shawn Mendes',
        songAlbum: 'Handwritten',
        musicTime: '3:26',
        tag: ['우울한', '어쿠스틱', '기타'],
        isLiked: false,
    },
    {
        index: 2,
        albumCover: '/assets/ditto.png',
        songTitle: 'Attention',
        artistName: 'Charlie Puth',
        songAlbum: 'Voicenotes',
        musicTime: '3:31',
        tag: ['신나는', '댄스'],
        isLiked: false,
    },
    {
        index: 3,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
        tag: ['잔잔한', '발라드', '피아노'],
        isLiked: false,
    },
    {
        index: 4,
        albumCover: '/assets/ditto.png',
        songTitle: 'Stitches',
        artistName: 'Shawn Mendes',
        songAlbum: 'Handwritten',
        musicTime: '3:26',
        tag: ['우울한', '어쿠스틱', '기타'],
        isLiked: false,
    },
    {
        index: 5,
        albumCover: '/assets/ditto.png',
        songTitle: 'Attention',
        artistName: 'Charlie Puth',
        songAlbum: 'Voicenotes',
        musicTime: '3:31',
        tag: ['신나는', '댄스'],
        isLiked: false,
    },
];

const Musiclist = () => {
    const [msList, setMsList] = useState(MusicList);
    const [isLiked, setIsLiked] = useRecoilState(isLikedState);

    const handleClick = (index: number) => {
        const updatedMusicList = [...msList];
        updatedMusicList[index].isLiked = !updatedMusicList[index].isLiked;
        setIsLiked(updatedMusicList[index].isLiked);
        setMsList(updatedMusicList);
    };

    return (
        <div>
            <BackgroundCover></BackgroundCover>
            <MusiclistContainer>
                <TagContainer>
                    <Search />
                    <Categories />
                </TagContainer>
                <RightContainer>
                    <RightchidContainer>
                        <Trending />
                        <MusicListTitle>
                            <div className="musicList-title">Music List</div>
                            <div className="music-inquiry">
                                <li>최신순</li>
                                <li>좋아요순</li>
                            </div>
                        </MusicListTitle>
                        <SongContainer>
                            {msList.map((music, index) => (
                                <Item key={music.index}>
                                    <li>
                                        <img src={music.albumCover} alt={music.songTitle} />
                                    </li>
                                    <li>{music.songTitle}</li>
                                    <li>{music.artistName}</li>
                                    <li>{music.songAlbum}</li>
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
                                    <li onClick={() => handleClick(music.index)}>
                                        {music.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                                    </li>
                                </Item>
                            ))}
                        </SongContainer>
                    </RightchidContainer>
                </RightContainer>
            </MusiclistContainer>
        </div>
    );
};

export default Musiclist;

/* 2023.05.08 MusicList (뮤직리스트 전체 컨테이너) 컴포넌트 구현 - 홍혜란 */
const MusiclistContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;

    @media (max-width: 1000px) {
        display: none;
    }
`;

/* 2023.05.08 MusicList (검색,카테고리 컨테이너) 컴포넌트 구현 - 홍혜란 */
const TagContainer = styled.div`
    width: 500px;
    height: 100vh;
    background: rgba(0, 0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;

    @media (max-width: 1300px) {
        display: none;
    }
`;

/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 - 김주비 */
const BackgroundCover = styled.div`
    box-sizing: border-box;
    position: absolute;
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

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const RightchidContainer = styled.div`
    width: 1300px;
    height: 100vh;
`;

/* 2023.05.08 MusicList (뮤직리스트 출력 타이틀) 컴포넌트 구현 - 홍혜란 */
const MusicListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;

    .musicList-title {
        font-size: 25px;
        font-weight: bold;
        color: hsl(0, 0%, 100%);
        margin: 20px 0px 20px 0px;
    }

    .music-inquiry {
        display: flex;
        margin: 20px 80px 0px 30px;

        li {
            font-size: 12px;
            color: hsl(0, 0%, 100%);
            border-left: 1px solid hsl(0, 0%, 100%);
            padding-left: 10px;
            margin: 5px;
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

    li:nth-child(1) {
        margin-right: 50px;
    }

    li:nth-child(6) {
        color: #b62dc9;
    }

    li:nth-child(9) {
        color: rgb(199, 68, 68);
        margin-right: 45px;
    }

    li > img {
        width: 50px;
        height: 50px;
        border-radius: 10%;
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
