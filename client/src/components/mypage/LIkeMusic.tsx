import styled from 'styled-components';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { likeState } from 'src/recoil/Atoms';
import { MusicDataResponse } from 'src/types/Musiclist';
import { musicDataListState } from 'src/recoil/Atoms';
import { useEffect } from 'react';

interface LikeProps {
    musicId: number;
}

const [musicDataList, setMusicDataList] = useRecoilState(musicDataListState);
const memberId: string | undefined = window.localStorage.getItem('memeberId') || undefined;

useEffect(() => {
    axios
        .get<MusicDataResponse>(
            `http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`,
        )
        .then((response) => {
            setMusicDataList(response.data.data);
        })
        .catch((error) => {
            console.error(error);
        });
}, [setMusicDataList]);

const LikeMusic: React.FC<LikeProps> = ({ musicId }) => {
    const [like, setLike] = useRecoilState(likeState);

    const handleLike = () => {
        setLike(!like);

        const memberId: string | undefined = window.localStorage.getItem('memberId') || undefined;
        const token: string | undefined = window.localStorage.getItem('access_token') || undefined;

        axios
            .post(
                `http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/music-like/toggle`,
                {
                    memberId: memberId,
                    musicId: musicId,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                },
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <LikeContainer>
            <LikeTitle>
                <div className="vote-icon">
                    <HiHeart />
                    <p>LIKE MUSIC</p>
                </div>
            </LikeTitle>
            {musicDataList.map((data) => (
                <LikeList>
                    <img src={data.albumCoverImg} alt={data.musicName} />
                    <li>{data.musicName}</li>
                    <li>{data.artistName}</li>
                    <li>{data.albumName}</li>
                    <div className="music-icon">
                        {like ? (
                            <HiHeart onClick={handleLike} className="color-red like-action" />
                        ) : (
                            <HiOutlineHeart onClick={handleLike} className="color-red" />
                        )}
                    </div>
                </LikeList>
            ))}
        </LikeContainer>
    );
};

export default LikeMusic;

/* 2023.05.10 Like Music 전체 박스 컴포넌트 - 홍혜란 */
const LikeContainer = styled.div`
    width: 400px;
    align-items: center;
    margin: 30px;
    @media screen and (max-width: 1000px) {
        width: 400px;
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
const LikeList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid hsl(0, 0%, 65%);
    padding: 8px;

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
`;
