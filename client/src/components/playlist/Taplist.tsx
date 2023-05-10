import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';

interface PlcardProps {
    index: number;
    treck: number;
    coverimg: string;
    plname: string;
    plcontent: string;
    like: string;
    user: string;
    tag: { tagname: string }[];
}

function Taplist() {
    const [pldata, setPldata] = useState<PlcardProps[]>([]); //플리데이터 저장 스테이트

    /**2023-05-07 플리 슬라이드 더미데이터 : 김주비 */
    const dummydata: PlcardProps[] = [
        {
            index: 1,
            treck: 8,
            coverimg: '/assets/background-playlist6.jpg',
            plname: '여름밤의 낭만 BGM',
            plcontent: '다가오는 여름, 여행계획은 세웠나요? 노래로 해변가 여행을 떠나보는건 어떨까요.',
            like: '2087',
            user: 'Uncover',
            tag: [{ tagname: '청량한' }, { tagname: '신나는' }, { tagname: '어쿠스틱' }],
        },
        {
            index: 0,
            treck: 20,
            coverimg: '/assets/background-playlist3.jpg',
            plname: 'PLAY LIST: 감성뿜뿜 시티팝',
            plcontent:
                '내 플레이 리스트를 봐 대박임. 지금까지 이런 플레이 리스트는 없었다. 플레이 리스트의 명가uncover 를 사용하세요.',
            like: '2087',
            user: 'Uncover',
            tag: [{ tagname: '감성' }, { tagname: '시티팝' }],
        },
        {
            index: 1,
            treck: 8,
            coverimg: '/assets/background-playlist.jpg',
            plname: 'PLAY LIST: 숲속느낌 BGM',
            plcontent:
                '집중이 잘 안되는날. 오늘은 가사가 없는 조용한 노래를 듣고싶다구요? 이게바로 당신을 위한 플리네요.',
            like: '2087',
            user: 'Uncover',
            tag: [{ tagname: '잔잔한' }, { tagname: '백색소음' }, { tagname: '차분한' }],
        },
        {
            index: 2,
            treck: 7,
            coverimg: '/assets/background-playlist1.jpg',
            plname: '❤ 사랑에 빠졌나봐 ❤',
            plcontent:
                '사랑에 빠진 기분을 느껴보고 싶으신가요? 오늘하루만큼은 달달하게. 당신을 위해 준비한 초콜렛같은 플리!',
            like: '2087',
            user: 'Uncover',
            tag: [{ tagname: '달달함' }, { tagname: '로맨스' }, { tagname: '어쿠스틱' }, { tagname: '발라드' }],
        },
        {
            index: 3,
            treck: 5,
            coverimg: '/assets/background-playlist2.jpg',
            plname: 'PLAY LIST: 환상의 나라 BGM',
            plcontent: '환상의 나라로 떠나보자!  ',
            like: '2087',
            user: 'Uncover',
            tag: [{ tagname: '몽환적인' }, { tagname: '신비한' }],
        },
        {
            index: 4,
            treck: 12,
            coverimg: '/assets/background-playlist5.jpg',
            plname: 'PLAY LIST: 오늘은 신나게! BGM',
            plcontent:
                '내 플레이 리스트를 봐 대박임. 지금까지 이런 플레이 리스트는 없었다. 플레이 리스트의 명가uncover 를 사용하세요.',
            like: '2087',
            user: 'Uncover',
            tag: [{ tagname: '클럽뮤직' }, { tagname: 'EDM' }, { tagname: '신나는' }],
        },
    ];

    useEffect(() => {
        setPldata(dummydata);
    }, []);

    return (
        <TapGroup>
            <Plsearch placeholder="제목을 검색해주세요" />
            <ul>
                {pldata.map((el) => (
                    <TapList key={el.index}>
                        <div>
                            <img src={el.coverimg} />
                        </div>
                        <span className="pl-title">{el.plname}</span>
                        <ul className="pl-tag">
                            {el.tag.slice(0, 2).map((tag, i) => (
                                <li key={`tag-${i}`}>{tag.tagname}</li>
                            ))}
                        </ul>
                        <span>{el.user}</span>
                        <span>
                            <Like />
                            {el.like}
                        </span>
                    </TapList>
                ))}
            </ul>
        </TapGroup>
    );
}

function Like() {
    const [like, setLike] = useState<boolean>(false);
    return (
        <>
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
        </>
    );
}

export default Taplist;

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
`;
/**2023-05-06 펼쳐지는 서치바 애니메이션 : 김주비*/
const Plsearch = styled.input`
    border-radius: 30px;
    width: 0%;
    background: rgb(255, 255, 255, 0.2);
    animation: showinput 1s forwards;
    opacity: 0;
    margin-top: -30px;

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
    width: 60%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    opacity: 0;
    animation: opacity 1s forwards;
    margin-top: 10px;

    > div img {
        margin: 10px;
        border-radius: 50px;
        transition: 0.2s ease-in-out;
        width: 40px;
        height: 40px;
        background-size: cover;
    }

    .pl-title {
        width: 100%;
    }

    .pl-tag {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        width: 300px;
    }
    .pl-tag li {
        margin: 0px 5px;
        border: 2px solid #ccc;
        padding: 5px 10px;
        border-radius: 50px;
        font-size: 12px;
        opacity: 0.6;
    }
    @keyframes opacity {
        50% {
            transform: scale(1.1);
        }
        100% {
            opacity: 1;
        }
    }
`;
