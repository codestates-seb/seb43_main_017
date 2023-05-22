import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { VscClose } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { selectedTagsState, showSearch } from 'src/recoil/Atoms';
import { MdTransitEnterexit } from 'react-icons/md';
import axios from 'axios';
import Search from './Search';

interface CategoryProps {
    showSearchResult: (searchText: string) => void;
}

// /* 2023.05.07 카테고리 타입, 종류 선언 - 홍혜란 */
// export type Category = {
//     index: number;
//     name: string;
//     subCategories: string[];
// };

// export const categories: Category[] = [
//     {
//         index: 0,
//         name: 'FEEL',
//         subCategories: ['잔잔한', '우울한', '신나는', '로맨틱한', '희망적인'],
//     },
//     {
//         index: 1,
//         name: 'GENRE',
//         subCategories: ['EDM', '발라드', '어쿠스틱', '인디', '댄스'],
//     },
//     {
//         index: 2,
//         name: 'INSTRUMENT',
//         subCategories: ['피아노', '드럼', '기타', '베이스', '현악기'],
//     },
// ];

const Categories = ({ showSearchResult }: CategoryProps) => {
    /* 2023.05.07 Category 클릭 시  subCategories 오픈 - 홍혜란 */
    const [openCategory, setOpenCategory] = useState('');
    const [index, setIndex] = useState(0);
    /* 2023.05.10 subCategory 클릭 시 태그 생성 - 홍혜란 */
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
    const [, setShowSearch] = useRecoilState<boolean>(showSearch);
    const [feel, setFeel] = useState([]);
    const [genre, setGenre] = useState([]);
    const [instrument, setInstrument] = useState([]);

    interface tag {
        id: number;
        name: string;
        category: string;
    }

    useEffect(() => {
        axios.get(`http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/tags`).then(function (res) {
            const tags = res.data;
            const filteredTags = tags.filter((tag: tag) => tag.category === 'FEEL');
            const filteredGenre = tags.filter((tag: tag) => tag.category === 'GENRE');
            const filteredInstrument = tags.filter((tag: tag) => tag.category === 'INSTRUMENT');
            setFeel(filteredTags);
            setGenre(filteredGenre);
            setInstrument(filteredInstrument);
        });
    }, []);

    const handleCategoryClick = (name: string, i: number) => {
        if (openCategory === name) {
            setOpenCategory('');
        } else {
            setOpenCategory(name);
        }
        setIndex(i);
    };

    const handleSubCategoryClick = (subCategory: string) => {
        // 이미 선택된 태그가 있는지 확인
        const tagAlreadySelected = selectedTags.includes(subCategory);

        // 선택된 태그가 없을 경우만 추가
        if (!tagAlreadySelected) {
            setSelectedTags([...selectedTags, subCategory]);
        }
    };

    return (
        <CateTagContainer>
            <CategoryContainer>
                <Search showSearchResult={showSearchResult} />
                <TagGroup>
                    <ul>
                        <li className="Category-title"></li>
                        <li></li>
                    </ul>
                </TagGroup>
            </CategoryContainer>
            <TagBox>
                {selectedTags.map((tag) => (
                    <TagContainer key={tag}>
                        <div className="tagText">{tag}</div>
                        <div className="tagIcon" onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}>
                            <VscClose />
                        </div>
                    </TagContainer>
                ))}
            </TagBox>
            <Xbox
                onClick={() => {
                    setShowSearch(false);
                }}
            >
                <MdTransitEnterexit />
            </Xbox>
        </CateTagContainer>
    );
};

export default Categories;

/* 2023.05.07 전체박스 컴포넌트 구현 - 홍헤란 */
const CateTagContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    @media screen and (max-width: 700px) {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
    }
`;

/* 2023.05.07 카테고리 컴포넌트 구현 - 홍혜란 */
const CategoryContainer = styled.div`
    position: absolute;
    right: 0px;
    display: flex;
    flex-direction: column;
    width: 200px;
    @media screen and (max-width: 700px) {
        position: relative;
        width: 80%;
        left: 50%;
        transform: translateX(-50%);
    }
`;

// /* 2023.05.07 큰 카테고리를 버튼으로 컴포넌틑 구현 - 홍혜란 */
// const CategoryButton = styled.button`
//     font-size: 16px;
//     font-weight: bold;
//     color: hsl(0, 0%, 100%);
//     background-color: transparent;
//     border: none;
//     padding: 10px;
//     cursor: pointer;
// `;

// /* 2023.05.07 "isOpen"이라는 이름의 boolean 타입의 prop을 가진 <ul> 요소를 스타일링 - 홍혜란 */
// const SubCategoryList = styled.ul<{ isOpen: boolean }>`
//     list-style: none;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
//     transition: height 0.3s ease-in-out;
//     height: ${({ isOpen }) => (isOpen ? 'auto' : '0')}; // isOpen 상태면 auto, 아니면 0
//     overflow: hidden;
//     height: 0px;

//     &.ani {
//         animation: name 1s forwards;
//     }
//     @keyframes name {
//         100% {
//             height: 200px;
//         }
//     }
// `;

// /* 2023.05.07 서브카테고리 컴포넌트 구현 - 홍혜란 */
// const SubCategoryItem = styled.li`
//     font-size: 12px;
//     color: hsl(0, 0%, 100%);
//     padding: 10px;
//     cursor: pointer;
// `;

/* 2023.05.10 태그 박스 컴포넌트 구현 - 홍혜란 */
const TagBox = styled.div`
    position: absolute;
    right: -35px;
    top: 100px;
    @media screen and (max-width: 700px) {
        right: 35px;
    }
`;

/* 2023.05.10 태그 컴포넌트 구현 - 홍혜란 */
const TagContainer = styled.div`
    border: 1px solid white;
    border-radius: 50px;
    width: 70px;
    height: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    border: none;
    background: hsl(0, 75%, 61%);
    opacity: 0;
    transform: translateX(-20px);
    animation: slideIn 0.2s ease-in-out forwards;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .tagText {
        font-size: 12px;
        color: white;
        text-align: center;
        flex: 1;
    }

    .tagIcon {
        font-size: 15px;
        display: flex;
        align-items: center;
        color: white;
    }
`;

const Xbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    color: #666;
    text-align: center;
    border: 2px solid #666;
    :hover {
        color: #ccc;
        border-color: #ccc;
    }
    @media screen and (min-width: 700px) {
        display: none;
    }
`;
