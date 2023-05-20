import { FiPlayCircle, FiFolderPlus } from 'react-icons/fi';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface SideiconProps {
    musicId: number;
}

const Sideicon: React.FC<SideiconProps> = ({ musicId }) => {
    const [like, setLike] = useState<boolean>(false);

    const handleLike = () => {
        setLike(!like);

        const memberId: string | undefined = window.localStorage.getItem('memberId') || undefined;

        axios
            .get(`http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/music-like/toggle`, {
                params: {
                    memberId: memberId,
                    musicId: musicId,
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <MusicIconGroup>
            <Link to={`/musiclist/${musicId}`}>
                <FiPlayCircle className="color-blue" />
            </Link>
            <FiFolderPlus />
            <MdFileDownload />
            {like ? (
                <HiHeart onClick={handleLike} className="color-red like-action" />
            ) : (
                <HiOutlineHeart onClick={handleLike} className="color-red" />
            )}
        </MusicIconGroup>
    );
};

export default Sideicon;

const MusicIconGroup = styled.li`
    > * {
        margin: 0px 20px;
        font-size: 1rem;
    }
    .color-blue {
        color: #6e9cff;
        font-size: 1.5rem;
        transition: 0.2s ease-in-out;
    }
    .color-blue:hover {
        color: #a3c0ff;
    }

    .color-red {
        color: rgba(199, 68, 68, 1);
    }
    .like-action {
        animation: likeaction 0.5s forwards;
    }
    @keyframes likeaction {
        50% {
            transform: scale(1.5);
            color: #ff7777;
        }
    }
    @media (max-width: 1200px) {
        > * {
            margin: 0px 10px;
        }
    }
`;
