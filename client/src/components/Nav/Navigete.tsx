import styled from 'styled-components';
// import { HiSearch } from 'react-icons/hi';
import { MdOutlineQueueMusic, MdOutlineVideoSettings } from 'react-icons/md';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useState } from 'react';
function Navigate() {
    const [selectIndex, setSelectIndex] = useState<number>(0);
    const [click, setClick] = useState<boolean>(false);
    console.log(selectIndex);

    const menuIconlist = [
        { index: 0, name: <BiHomeAlt /> },
        { index: 1, name: <HiOutlineMusicNote /> },
        { index: 2, name: <MdOutlineQueueMusic /> },
        { index: 3, name: <MdOutlineVideoSettings /> },
    ];

    return (
        <NavigateBox>
            <div className="icon-group">
                <LogoIcon>
                    <img src="/assets/logo_icon_012.png" alt="uncover logo image" />
                </LogoIcon>
                <Dotsstyle>
                    {[...Array(5)].map((_, index) => (
                        <span key={index}></span>
                    ))}
                </Dotsstyle>
                <MenuIcon>
                    {menuIconlist.map((el, index) => (
                        <li
                            key={el.index}
                            onClick={() => {
                                setSelectIndex(el.index);
                            }}
                            className={selectIndex === index ? 'click-icon' : 'null'}
                        >
                            {el.name}
                        </li>
                    ))}
                </MenuIcon>
                <Dotsstyle>
                    {[...Array(5)].map((_, index) => (
                        <span key={index}></span>
                    ))}
                </Dotsstyle>
                <ProfileIcon>
                    <span
                        onClick={() => {
                            setClick(!click);
                        }}
                    >
                        <img
                            src="/assets/profile-icon.png"
                            alt="profile icon"
                            className={click ? 'img-active' : 'null'}
                        />
                    </span>
                </ProfileIcon>
            </div>
        </NavigateBox>
    );
}

export default Navigate;

const NavigateBox = styled.nav`
    width: 100%;
    .icon-group {
        min-height: 85vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`;

const LogoIcon = styled.div`
    width: 50px;
    height: 50px;
    img {
        width: 100%;
    }
`;
const MenuIcon = styled.ul`
    li {
        border-radius: 10px;
        margin-top: 5px;
        padding: 10px;
        color: #9b9b9b;
        font-size: 1rem;
        transition: 0.3s ease-in-out;
    }
    li:hover {
        background-color: rgba(199, 68, 68, 1);
        color: #fff;
    }
    .click-icon {
        background-color: rgba(199, 68, 68, 1);
        color: #fff;
    }
`;

const ProfileIcon = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background-color: #333;
        overflow: hidden;
        transition: 0.3s ease-in-out;
        animation: showborder 2s infinite;
    }
    span:hover {
        width: 60px;
        height: 60px;
        animation: none;
    }
    img {
        width: 100%;
        transition: 0.5s ease-in-out;
    }
    img:hover {
        width: 130%;
    }
    .img-active {
        transform: rotate(360deg);
    }
    @keyframes showborder {
        50% {
            border: 7px solid #333;
        }
    }
`;

const Dotsstyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    span {
        width: 5px;
        height: 5px;
        border-radius: 6px;
        background-color: #333;
        margin: 5px 0px;
        animation: magindot 2s infinite;
    }
    @keyframes magindot {
        50% {
            margin: 8px 0px;
        }
    }
`;
