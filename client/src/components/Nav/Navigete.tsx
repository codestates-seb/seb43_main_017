import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdOutlineQueueMusic, MdOutlineVideoSettings } from 'react-icons/md';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectIndexState, localIndexState } from 'src/recoil/Atoms';

function Navigate({ setShowSignIn }: { setShowSignIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const token = window.localStorage.getItem('access_token');
    const userimg = window.localStorage.getItem('userimg');
    /**2023-05-05 선택된 아이콘 인덱스 스테이트 : 김주비*/
    const [selectIndex, setSelectIndex] = useRecoilState<number>(selectIndexState);
    const [localIndex, setLocalIndex] = useRecoilState<string | null>(localIndexState);
    /**2023-05-05 프로필 아이콘 클릭시 이벤트실행 스테이트 : 김주비*/
    const [click, setClick] = useState<boolean>(false);

    /**2023-05-08 선택된 아이콘 인덱스 로컬스토리지에 삽입 : 김주비*/
    // let localIndex = '1';
    useEffect(() => {
        sessionStorage.setItem('index', selectIndex.toString());
        setLocalIndex(sessionStorage.getItem('index'));
    }, [localIndex, selectIndex]);

    /**2023-05-05 주 메뉴리스트 및 경로 : 김주비
     * - 메뉴에 경로 지정하고싶을시 link 엔드포인트로 기입
     */
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
            link: '/fittingroom',
        },
    ];

    return (
        <NavigateBox>
            <div className="icon-group">
                <LogoIcon>
                    <Link
                        to="/"
                        onClick={() => {
                            setSelectIndex(0);
                        }}
                    >
                        <img src="/assets/logo_icon_012.png" alt="uncover logo image" />
                    </Link>
                </LogoIcon>
                <Dotsstyle>
                    {[...Array(5)].map((_, index) => (
                        <span key={`dots-${index}`}></span>
                    ))}
                </Dotsstyle>
                <MenuIcon>
                    {token
                        ? menuIconlist.map((el, index) => (
                              <Link
                                  to={el.link}
                                  key={el.index}
                                  onClick={() => {
                                      setSelectIndex(el.index);
                                  }}
                              >
                                  <li className={localIndex === String(index) ? 'click-icon' : 'null'}>{el.name}</li>
                              </Link>
                          ))
                        : menuIconlist.map((el, index) =>
                              el.index !== 3 ? (
                                  <Link
                                      to={el.link}
                                      key={el.index}
                                      onClick={() => {
                                          setSelectIndex(el.index);
                                      }}
                                  >
                                      <li className={localIndex === String(index) ? 'click-icon' : 'null'}>
                                          {el.name}
                                      </li>
                                  </Link>
                              ) : (
                                  <li
                                      key={el.index}
                                      onClick={() => {
                                          setShowSignIn(true);
                                      }}
                                      className={localIndex === String(index) ? 'click-icon' : 'null'}
                                  >
                                      {el.name}
                                  </li>
                              ),
                          )}
                </MenuIcon>
                <Dotsstyle>
                    {[...Array(5)].map((_, index) => (
                        <span key={index}></span>
                    ))}
                </Dotsstyle>
                {token ? (
                    <ProfileIcon>
                        <Link
                            to="/mypage"
                            onClick={() => {
                                setClick(!click);
                                setSelectIndex(4);
                            }}
                        >
                            <span>
                                {userimg ? (
                                    <img src={userimg} alt="profile icon" className={click ? 'img-active' : 'null'} />
                                ) : (
                                    <img
                                        src="/assets/profile-icon.png"
                                        alt="profile icon"
                                        className={click ? 'img-active' : 'null'}
                                    />
                                )}
                            </span>
                        </Link>
                    </ProfileIcon>
                ) : (
                    <ProfileIcon onClick={() => setShowSignIn(true)}>
                        <span
                            onClick={() => {
                                setClick(!click);
                                setSelectIndex(4);
                            }}
                        >
                            <img
                                src="/assets/profile-icon.png"
                                alt="profile icon"
                                className={click ? 'img-active' : 'null'}
                            />
                        </span>
                    </ProfileIcon>
                )}
            </div>
        </NavigateBox>
    );
}

export default Navigate;

/**2023-05-05 전체섹션 : 김주비*/
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
        height: 100px;
        .icon-group {
            box-sizing: border-box;
            min-height: 100px;
            flex-direction: row;
            padding: 20px;
        }
    }
`;
/**2023-05-05 로고아이콘 : 김주비*/
const LogoIcon = styled.div`
    width: 50px;
    height: 50px;
    img {
        width: 100%;
    }
`;
/**2023-05-05 메뉴아이콘 : 김주비*/
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
        transition: 0.2s ease-in-out;
    }
    li:hover {
        background-color: #333;
        color: #fff;
        transform: scale(1.2);
    }
    li:active {
        background-color: #fff;
    }
    .click-icon {
        background-color: rgba(199, 68, 68, 1);
        color: #fff;
        animation: scale 2s infinite;
    }
    a {
        color: #9b9b9b;
        transition: 0.3s ease-in-out;
        border-radius: 40px;
    }
    a:hover {
        color: #fff;
    }
    @media (max-width: 700px) {
        flex-direction: row;
        width: 180px;
        height: 100%;
    }
    @keyframes scale {
        50% {
            transform: scale(1.2);
            background-color: #333;
        }
    }
`;
/**2023-05-05 프로필아이콘 : 김주비*/
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
        height: 100%;
        transition: 0.5s ease-in-out;
        object-fit: cover;
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
/**2023-05-05 도트디자인 : 김주비*/
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
