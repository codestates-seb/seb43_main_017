import styled from 'styled-components';
import Search from './Search';
import Categories from './Categories';
import Trending from './Tranding';
import { FiPlayCircle, FiFolderPlus } from 'react-icons/fi';
import { BsBoxArrowInDown } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

/* 2023.05.08 MusicList MusicList 타입 선언 - 홍혜란 */
interface MusicData {
    index: number;
    albumCover: string;
    songTitle: string;
    artistName: string;
    songAlbum: string;
    musicTime: string;
}

const MusicList: MusicData[] = [
    {
        index: 1,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
    {
        index: 2,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
    {
        index: 3,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
    {
        index: 4,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
    {
        index: 5,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
    {
        index: 6,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
    {
        index: 7,
        albumCover: '/assets/ditto.png',
        songTitle: 'Ditto',
        artistName: 'Newjeans',
        songAlbum: 'OMG',
        musicTime: '3:15',
    },
];

const Musiclist = () => {
    const MsList = MusicList;
    return (
        <div>
            <MusiclistContainer>
                <TagContainer>
                    <Search />
                    <Categories />
                </TagContainer>
                <RightContainer>
                    <Trending />
                    <MusicListTitle>
                        <div className="musicList-title">Music List</div>
                        <div className="music-inquiry">
                            <li>최신순</li>
                            <li>좋아요순</li>
                        </div>
                    </MusicListTitle>
                    <SongContainer>
                        <Item>
                            <li>COVER</li>
                            <li>TITLE</li>
                            <li>ARTIST</li>
                            <li>ALBUM</li>
                            <li>TIME</li>
                            <li>PLAY</li>
                            <li>PLAYLIST</li>
                            <li>DOWNLOAD</li>
                            <li>VOTE</li>
                        </Item>
                        {MsList.map((data) => (
                            <Item key={data.index}>
                                <li>
                                    <img src={data.albumCover} alt={data.songTitle} />
                                </li>
                                <li>{data.songTitle}</li>
                                <li>{data.artistName}</li>
                                <li>{data.songAlbum}</li>
                                <li>{data.musicTime}</li>
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
        </div>
    );
};

export default Musiclist;

/* 2023.05.08 MusicList (뮤직리스트 전체 컨테이너) 컴포넌트 구현 - 홍혜란 */
const MusiclistContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

/* 2023.05.08 MusicList (검색,카테고리 컨테이너) 컴포넌트 구현 - 홍혜란 */
const TagContainer = styled.div`
    width: 200px;
    height: 100vh;
    background-color: #1f1f1f;
    margin-left: 100px;
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

/* 2023.05.08 MusicList (뮤직리스트 출력 타이틀) 컴포넌트 구현 - 홍혜란 */
const MusicListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .musicList-title {
        font-size: 30px;
        font-weight: bold;
        color: hsl(0, 0%, 100%);
        margin: 20px 10px 10px 30px;
    }

    .music-inquiry {
        display: flex;
        margin: 20px 10px 0px 30px;

        li {
            font-size: 10px;
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
    justify-content: space-around;
    flex: 1;
    width: 100%;
    color: hsl(0, 0%, 100%);

    li {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li:nth-child(6) {
        color: #d235d4;
    }

    li:nth-child(9) {
        color: rgb(199, 68, 68);
    }

    li > img {
        width: 50px;
        height: 50px;
        border-radius: 10%;
    }
`;
