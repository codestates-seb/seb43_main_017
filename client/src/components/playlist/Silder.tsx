import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
import { ReactNode } from 'react';

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

function Silder({ setBgSrc }: { setBgSrc: React.Dispatch<React.SetStateAction<string>> }) {
    const [pldata, setPldata] = useState<PlcardProps[]>([]); //플리데이터 저장 스테이트
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); //포커스된 슬라이드 인덱스
    const [silderPage, setSliderPage] = useState<number>(3); //슬라이더 페이지 갯수

    /**2023-05-07 window width 값 가져오기 : 김주비 */
    let width = window.innerWidth;
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        // 변화된 width 값을 이용하여 필요한 작업 수행

        if (width <= 1100) {
            setSliderPage(1);
        } else {
            setSliderPage(3);
        }
    });
    /**2023-05-07 새로고침시 width에 따라 페이징 변환 : 김주비 */
    useEffect(() => {
        if (width <= 1100) {
            setSliderPage(1);
        } else {
            setSliderPage(3);
        }
    }, []);
    /**2023-05-07 플리 슬라이드 인덱스 : 김주비 */
    const handleAfterChange = (index: number) => {
        setCurrentSlideIndex(index);
    };
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
    /**2023-05-07 커버이미지 데이터 전달 : 김주비 */
    useEffect(() => {
        setPldata(dummydata);
        setBgSrc(dummydata[currentSlideIndex].coverimg);
    }, [currentSlideIndex]);

    /**2023-05-07 슬라이드 버튼 appen : 김주비 */
    const appendDots = (dots: ReactNode) => {
        return (
            <div style={{ height: '0px' }}>
                <ul style={{ margin: '10px' }}> {dots} </ul>
            </div>
        );
    };
    /**2023-05-07 슬라이드 버튼 custom : 김주비 */
    const customPaging = (i: number) => {
        return <div className="dots-paging">{i + 1}</div>;
    };

    /**2023-05-07 슬라이드 설정옵션 : 김주비 */
    const settings = {
        afterChange: handleAfterChange,
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '80px',
        slidesToShow: silderPage,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrow: true,
        appendDots: appendDots,
        customPaging: customPaging,
    };

    return (
        <SilderGroup>
            <Slider {...settings}>
                {pldata.map((data) => (
                    <Plcard key={data.index} bgImg={data.coverimg}>
                        <div className="pl-treck">TRECK {data.treck}</div>
                        <div className="pl-contents">
                            <Pltag>
                                {data.tag.map((tag, index) => (
                                    <li key={`tag-${index}`}>{tag.tagname}</li>
                                ))}
                            </Pltag>
                            <Pluser>
                                <span>WTITER</span>
                                <span>{data.user}</span>
                                <span>LIKE</span>
                                <span>{data.like}</span>
                            </Pluser>
                            <Pltext>
                                <span>{data.plname}</span>
                                <span>{data.plcontent}</span>
                            </Pltext>
                        </div>
                    </Plcard>
                ))}
            </Slider>
        </SilderGroup>
    );
}

export default Silder;

interface bgimg {
    bgImg: string;
}

/**2023-05-06 플리 슬라이드 카드 섹션 : 김주비 */
const Plcard = styled.div<bgimg>`
    position: relative;
    width: 500px;
    height: 350px;
    border-radius: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${(props) => props.bgImg});
    background-size: cover;
    transform: scale(0.85);
    color: #ddd;
    overflow: hidden;
    transition: 0.3s ease-in-out;
    .pl-treck {
        position: absolute;
        top: 30px;
        right: 30px;
        font-weight: 600;
    }
    .pl-contents {
        position: absolute;
        bottom: 30px;
        left: 30px;
    }
`;
const SilderGroup = styled.div`
    width: 100%;
    opacity: 0;
    animation: opacity 2s forwards;
    .slick-center ${Plcard} {
        transform: scale(1);
    }
    .dots-paging {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: 3px solid #ccc;
        border-radius: 40px;
        transform: scale(0.6);
        transition: 0.2s ease-in-out;
    }
    .dots-paging:hover {
        transform: scale(0.8);
        border-color: #ff8716;
        color: #ff8716;
    }
    @keyframes opacity {
        100% {
            opacity: 1;
        }
    }
`;
/**2023-05-06 슬라이드 태그 : 김주비 */
const Pltag = styled.ul`
    display: flex;
    li {
        word-break: keep-all;
        border: 2px solid #ccc;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
    }
`;
/**2023-05-06 슬라이드 유저정보 : 김주비 */
const Pluser = styled.div`
    margin-top: 20px;
    font-size: 0.8rem;
    > span {
        margin-right: 15px;
    }
    span:nth-child(2n + 1) {
        font-weight: 800;
        color: #ff8716;
    }
`;
/**2023-05-06 슬라이드 텍스트 : 김주비 */
const Pltext = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    > span {
        margin-top: 10px;
    }
    span:nth-child(1) {
        color: #fff;
        letter-spacing: -0.5px;
        font-size: 1.6rem;
        min-width: 103%;
        word-break: break-all;
        font-weight: 600;
    }
    span:nth-child(2) {
        margin-top: 20px;
        line-height: 140%;
        opacity: 0.5;
        width: 80%;
        font-size: 0.7rem;
    }
    @media (max-width: 600px) {
        span:nth-child(1) {
            font-size: 1rem;
        }
    }
`;
