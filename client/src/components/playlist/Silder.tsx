import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PlcardProps, bgimg } from 'src/types/Slider';
import axios from 'axios';
import Loding from 'src/pages/Loding';

function Silder({ setBgSrc }: { setBgSrc: React.Dispatch<React.SetStateAction<string>> }) {
    const [pldata, setPldata] = useState<PlcardProps[]>([]); //플리데이터 저장 스테이트
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); //포커스된 슬라이드 인덱스
    const [silderPage, setSliderPage] = useState<number>(3); //슬라이더 페이지 갯수
    const [width, setWidth] = useState<number>(window.innerWidth); //현재 창의 width 길이
    const [loding, setLoding] = useState<boolean>(true);

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
        // 변화된 width 값을 이용하여 필요한 작업 수행
        if (width <= 1100) {
            setSliderPage(1);
        } else {
            setSliderPage(3);
        }
    });
    /**2023-05-07 새로고침시 width에 따라 페이징 변환 + axios : 김주비 */
    useEffect(() => {
        if (width <= 1100) {
            setSliderPage(1);
        } else {
            setSliderPage(3);
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/playlists/admin?page=1&size=10`)
            .then(function (response) {
                // 성공적으로 요청을 보낸 경우
                setPldata(response.data.data);
                setBgSrc(response.data.data[currentSlideIndex].coverImg);
                setLoding(false);
            })
            .catch(function (error) {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });
    }, [currentSlideIndex]);

    /**2023-05-07 플리 슬라이드 인덱스 : 김주비 */
    const handleAfterChange = (index: number) => {
        setCurrentSlideIndex(index);
    };
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
        return <div className={`${i === currentSlideIndex ? 'dots-paging dots-active' : 'dots-paging'}`}>{i + 1}</div>;
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
        dots: true,
        arrow: true,
        appendDots: appendDots,
        customPaging: customPaging,
    };

    return (
        <SilderGroup>
            {loding ? (
                <Loding />
            ) : (
                <Slider {...settings}>
                    {pldata.map((data) => (
                        <Plcard bgImg={data.coverImg} key={data.playListId}>
                            <div className="pl-treck">TRECK 10</div>
                            <Link to={`/playlsit/${data.playListId}`}>
                                <div className="pl-contents">
                                    <Pltag>
                                        {data.tags.map((tag, index) => (
                                            <li key={`tag-${index}`}>{tag}</li>
                                        ))}
                                    </Pltag>
                                    <Pluser>
                                        <span>WRITER</span>
                                        <span>{data.createMember}</span>
                                        <span>LIKE</span>
                                        <span>{data.likeCount}</span>
                                    </Pluser>
                                    <Pltext>
                                        <span>{data.title}</span>
                                        <span>{data.body}</span>
                                    </Pltext>
                                </div>
                            </Link>
                        </Plcard>
                    ))}
                </Slider>
            )}
        </SilderGroup>
    );
}

export default Silder;

/**2023-05-06 플리 슬라이드 카드 섹션 : 김주비 */
const Plcard = styled.div<bgimg>`
    position: relative;
    width: 500px;
    height: 350px;
    border-radius: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8) 80%), url(${(props) => props.bgImg});
    background-size: cover;
    transform: scale(0.85);
    color: #ddd;
    overflow: hidden;
    transition: 0.3s ease-in-out;
    box-sizing: border-box;
    /* border: 1px solid rgb(0, 0, 0, 1); */

    > a {
        color: #ddd;
    }
    .pl-treck {
        position: absolute;
        top: 30px;
        right: 30px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 600;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    .pl-contents {
        position: absolute;
        bottom: 30px;
        left: 30px;
    }
`;
/**2023-05-06 슬라이드 하단버튼 디자인 : 김주비 */
const SilderGroup = styled.div`
    width: 100%;
    opacity: 0;
    animation: opacity 2s forwards;
    .slick-center ${Plcard} {
        transform: scale(1);
        border: 2px solid #ccc;
    }
    .dots-paging {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: 3px solid #ccc;
        border-radius: 40px;
        transform: scale(0.2);
        transition: 0.2s ease-in-out;
        background: #ccc;
    }
    .dots-active {
        transform: scale(0.8);
        border: 3px solid rgba(199, 68, 68, 1);
        color: rgba(199, 68, 68, 1);
        background: none;
        font-weight: 700;
    }

    .dots-paging:hover {
        border: 3px solid rgba(199, 68, 68, 1);
        color: rgba(199, 68, 68, 1);
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
        font-family: 'Noto Sans KR', sans-serif;
        margin-right: 15px;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    }
    span:nth-child(2n + 1) {
        font-weight: 800;
        color: rgba(199, 68, 68, 1);
    }
`;
/**2023-05-06 슬라이드 텍스트 : 김주비 */
const Pltext = styled.div`
    display: flex;
    flex-direction: column;
    > span {
        margin-top: 10px;
        font-family: 'Noto Sans KR', sans-serif;
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
        width: 100%;
        font-size: 0.8rem;
        font-weight: 300;
    }
    @media (max-width: 600px) {
        span:nth-child(1) {
            font-size: 1rem;
        }
    }
`;
