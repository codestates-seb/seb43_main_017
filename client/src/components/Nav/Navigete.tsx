import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdOutlineQueueMusic, MdOutlineVideoSettings } from 'react-icons/md';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useState } from 'react';

function Navigate() {
    const [selectIndex, setSelectIndex] = useState<number>(0);
    const [click, setClick] = useState<boolean>(false);

    const menuIconlist = [
        {
            index: 0,
            name: <BiHomeAlt />,
            link: '/',
        },
        {
            index: 1,
            name: <HiOutlineMusicNote />,
            link: '/musiclist',
        },
        {
            index: 2,
            name: <MdOutlineQueueMusic />,
            link: '/playlist',
        },
        {
            index: 3,
            name: <MdOutlineVideoSettings />,
            link: '/mixing',
        },
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
                        <Link to={el.link}>
                            <li
                                key={el.index}
                                onClick={() => {
                                    setSelectIndex(el.index);
                                }}
                                className={selectIndex === index ? 'click-icon' : 'null'}
                            >
                                {el.name}
                            </li>
                        </Link>
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
    @media (max-width: 700px) {
        .icon-group {
            flex-direction: row;
            padding: 20px;
        }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    border-radius: 200px;
    background-color: #222222;
    li {
        border-radius: 50px;
        margin: 5px;
        padding: 10px;
        color: #9b9b9b;
        font-size: 1rem;
        transition: 0.3s ease-in-out;
    }
    li:hover {
        background-color: #333;
        color: #fff;
        transform: scale(1.2);
    }
    .click-icon {
        background-color: rgba(199, 68, 68, 1);
        color: #fff;
    }
    a {
        color: #9b9b9b;
        transition: 0.3s ease-in-out;
    }
    a:hover {
        color: #fff;
    }
    @media (max-width: 700px) {
        flex-direction: row;
        width: 180px;
        height: 100%;
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
    @media (max-width: 700px) {
        width: 55px;
        height: 55px;
        span {
            width: 40px;
            height: 40px;
        }
        span:hover {
            width: 50px;
            height: 50px;
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
    @media (max-width: 700px) {
        display: none;
    }
`;
