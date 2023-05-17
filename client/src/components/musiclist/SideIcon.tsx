import { FiPlayCircle, FiFolderPlus } from 'react-icons/fi';
import { MdFileDownload } from 'react-icons/md';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useState } from 'react';
import styled from 'styled-components';

function Sideicon() {
    const [like, setLike] = useState<boolean>(false);

    return (
        <MusicIconGroup>
            <FiPlayCircle className="color-blue" />
            <FiFolderPlus />
            <MdFileDownload />
            {like ? (
                <HiHeart
                    onClick={() => {
                        setLike(!like);
                    }}
                />
            ) : (
                <HiOutlineHeart
                    onClick={() => {
                        setLike(!like);
                    }}
                />
            )}
        </MusicIconGroup>
    );
}

export default Sideicon;

const MusicIconGroup = styled.li`
    > * {
        margin: 0px 10px;
        font-size: 1rem;
    }
    .color-blue {
        color: #6e9cff;
        font-size: 1.5rem;
        transition: 0.5s ease-in-out;
    }
    :hover .color-blue {
        transform: rotate(360deg);
        font-size: 2rem;
    }
`;
