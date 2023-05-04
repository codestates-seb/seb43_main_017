import styled from 'styled-components';
// import { HiSearch } from 'react-icons/hi';
import { MdOutlineQueueMusic, MdOutlineVideoSettings } from 'react-icons/md';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useState } from 'react';
function Navigate() {
    const [selectIndex, setSelectIndex] = useState<number>(0);
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
                <div className="logo-Icon"></div>
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
                <div className="profile-icon"></div>
            </div>
        </NavigateBox>
    );
}

export default Navigate;

const NavigateBox = styled.nav`
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0, 0));
    .icon-group {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const MenuIcon = styled.ul`
    li {
        border-radius: 10px;
        margin-top: 5px;
        padding: 10px;
        /* background-color: rgba(109, 12, 244, 1); */
        color: #9b9b9b;
        font-size: 1rem;
        transition: 0.3s ease-in-out;
    }

    li:hover {
        background-color: rgba(109, 12, 244, 1);
        color: #fff;
    }
    .click-icon {
        background-color: rgba(109, 12, 244, 1);
        color: #fff;
    }
`;
