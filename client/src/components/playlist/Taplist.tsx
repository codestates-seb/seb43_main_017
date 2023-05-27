import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { PlcardProps } from 'src/types/Slider';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Taplist() {
    const [pldata, setPldata] = useState<PlcardProps[]>([]); //플리데이터 저장 스테이트
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
    const [searchText, setSearchText] = useState<string>(''); //서치 텍스트
    const buttonArray = [];

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/playlists?page=${currentPage}&size=5`)
            .then(function (response) {
                // 성공적으로 요청을 보낸 경우
                setPldata(response.data.data);
                setTotalPages(response.data.pageInfo.totalPages);
            })
            .catch(function (error) {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });
    }, [currentPage]);

    const handelPlSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            axios
                .get(
                    `${process.env.REACT_APP_API_URL}/playlists/search-by-title?title=${searchText}&page=${currentPage}&size=5`,
                )
                .then(function (response) {
                    // 성공적으로 요청을 보낸 경우
                    setPldata(response.data.content);
                    setTotalPages(response.data.pageInfo.totalPages);
                })
                .catch(function (error) {
                    // 요청 중에 오류가 발생한 경우
                    console.error(error);
                });
        }
    };

    /** 2023.05.17 전체 페이지 수 만큼 버튼 생성 - 김주비*/
    for (let i = 1; i <= totalPages; i++) {
        buttonArray.push(
            <button
                key={i}
                className={i === currentPage ? 'page-focused' : ''}
                onClick={() => {
                    setCurrentPage(i);
                }}
            >
                {i}
            </button>,
        );
    }
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <TapGroup>
            <Plsearch
                placeholder="제목을 검색해주세요"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                onKeyDown={handelPlSearch}
            />
            <ul>
                {pldata.map((data) => (
                    <TapList key={data.playListId}>
                        <div>
                            <img src={data.coverImg} alt="playlist cover image" />
                        </div>
                        <div className="pl-title">
                            <p>
                                <Link to={`/playlsit/${data.playListId}`}>{data.title.slice(0, 20)}</Link>
                            </p>
                            <p className="pl-createMember">{data.createMember}</p>
                        </div>
                        <ul className="pl-tag">
                            {data.tags.slice(0, 2).map((tag, i) => (
                                <li key={`tag-${i}`}>{tag}</li>
                            ))}
                        </ul>
                        <div className="pl-like">
                            <Like plId={data.playListId} />
                        </div>
                    </TapList>
                ))}
            </ul>
            <Pagination>
                <button disabled={currentPage === 1} onClick={handlePrevPage}>
                    Prev
                </button>
                {buttonArray}
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                    Next
                </button>
            </Pagination>
        </TapGroup>
    );
}

function Like({ plId }: { plId: number }) {
    const [like, setLike] = useState<boolean>(false);
    const token = localStorage.getItem('access_token');
    const memberId = localStorage.getItem('memberId');

    useEffect(() => {
        if (token) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/playlists/members/${memberId}/like`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(function (res) {
                    const data = res.data;
                    const likedMusicIds = data.map((item: { playListId: number }) => item.playListId);
                    setLike(likedMusicIds.includes(plId));
                });
        }
    }, []);

    const haldleLiketoggle = () => {
        if (token) {
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/playlists/${plId}/like`,
                    {},
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then(function (res) {
                    setLike(res.data.playListId === plId);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else {
            alert('로그인을 진행해주세요');
        }
    };

    return <LikeGroup onClick={haldleLiketoggle}>{like ? <HiHeart /> : <HiOutlineHeart />}</LikeGroup>;
}

export default Taplist;

const LikeGroup = styled.div`
    padding: 10px;
    > * {
        animation: bounceHeart 0.5s forwards;
    }
    @keyframes bounceHeart {
        50% {
            transform: scale(1.4);
            color: #ffa3a3;
        }
    }
`;

const TapGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul {
        width: 60%;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
    }
    @media (max-width: 700px) {
        ul {
            width: 90%;
        }
    }
`;
/**2023-05-06 펼쳐지는 서치바 애니메이션 : 김주비*/
const Plsearch = styled.input`
    border-radius: 30px;
    width: 0%;
    background: rgb(255, 255, 255, 0.2);
    animation: showinput 1s forwards;
    opacity: 0;
    margin-top: -30px;
    font-family: 'Noto Sans KR', sans-serif;
    ::placeholder {
        color: #969696;
        font-family: 'Rajdhani', sans-serif;
    }
    @keyframes showinput {
        100% {
            opacity: 1;
            width: 300px;
            padding: 10px 30px;
            border: 2px solid #b1b1b1;
            color: #dddddd;
            outline: none;
            border-radius: 30px;
            margin-bottom: 30px;
        }
    }
    @media (max-width: 700px) {
        transform: scale(0.8);
    }
`;
const TapList = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #494949;
    border-radius: 10px;
    opacity: 0;
    animation: opacity 1s forwards;
    margin-top: 10px;
    transition: 0.3s ease-in-out;
    padding: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    :hover {
        transform: scale(1.05);
        background-color: rgba(20, 20, 20, 0.5);
    }

    > div img {
        border-radius: 5px;
        margin-right: 20px;
        transition: 0.2s ease-in-out;
        width: 40px;
        height: 40px;
        background-size: cover;
    }

    .pl-title {
        display: flex;
        width: 100%;
    }
    .pl-title p:nth-child(1) {
        font-weight: 600;
    }
    .pl-title p:nth-child(2) {
        color: #666;
        margin: 0px 10px;
    }
    .pl-title a {
        color: #ccc;
        text-decoration: none;
    }
    .pl-createMember {
        transform: scale(0.6);
    }

    .pl-tag {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
    }
    .pl-tag li {
        border: 2px solid #ccc;
        padding: 5px 10px;
        border-radius: 50px;
        font-size: 12px;
        opacity: 0.5;
        transform: scale(0.8);
    }
    .pl-like {
        display: flex;
        justify-content: center;
        align-items: center;

        color: rgba(199, 68, 68, 1);
    }
    @keyframes opacity {
        100% {
            opacity: 1;
        }
    }

    @media (max-width: 1350px) {
        .pl-title p:nth-child(2) {
            display: none;
        }
        .pl-like {
            min-width: 50px;
            font-size: 20px;
        }
        .pl-like span {
            display: none;
        }
    }
    @media (max-width: 1100px) {
        .pl-tag {
            display: none;
        }
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const Pagination = styled.div`
    button {
        color: #ccc;
        background: none;
        border: 1px solid #5a5a5a;
        border-radius: 3px;
        margin: 40px 3px;
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }
    button:hover {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }

    button:disabled {
        border: 1px solid #5a5a5a;
        color: #5a5a5a;
    }
    button:disabled:hover {
        background: none;
        cursor: default;
    }

    .page-focused {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }
`;
