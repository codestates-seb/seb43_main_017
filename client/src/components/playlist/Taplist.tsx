import styled from 'styled-components';
import { useState, useEffect } from 'react';

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
            <ul>
                {pldata.map((el) => (
                    <TapList key={el.index} bgImg={el.coverimg}>
                        {el.plname}
                    </TapList>
                ))}
            </ul>
        </TapGroup>
    );
}

export default Taplist;

const TapGroup = styled.div`
    width: 100%;
    display: flex;
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

interface bgimg {
    bgImg: string;
}

const TapList = styled.li<bgimg>`
    width: 150px;
    height: 150px;
    margin: 10px;
    border-radius: 10px;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${(props) => props.bgImg});
    background-size: cover;
    transition: 0.2s ease-in-out;
    opacity: 0;
    animation: opacity 1s forwards;

    :hover {
        transform: scale(1.1);
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
