import styled from 'styled-components';
import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRecoilState } from 'recoil';
import { selectedTagsState } from 'src/recoil/Atoms';

/* 2023.05.07 카테고리 타입, 종류 선언 - 홍혜란 */
type Category = {
    index: number;
    name: string;
    subCategories: string[];
};

const categories: Category[] = [
    {
        index: 0,
        name: 'FEEL',
        subCategories: ['잔잔한', '우울한', '신나는', '로맨틱한', '희망적인'],
    },
    {
        index: 1,
        name: 'GENRE',
        subCategories: ['EDM', '발라드', '어쿠스틱', '인디', '댄스'],
    },
    {
        index: 2,
        name: 'INSTRUMENT',
        subCategories: ['피아노', '드럼', '기타', '베이스', '현악기'],
    },
];

const Categories = () => {
    /* 2023.05.07 Category 클릭 시  subCategories 오픈 - 홍혜란 */
    const [openCategory, setOpenCategory] = useState('');
    const [index, setIndex] = useState(0);

    const handleCategoryClick = (name: string, i: number) => {
        if (openCategory === name) {
            setOpenCategory('');
        } else {
            setOpenCategory(name);
        }
        setIndex(i);
    };

    /* 2023.05.10 subCategory 클릭 시 태그 생성 - 홍혜란 */
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

    const handleSubCategoryClick = (subCategory: string) => {
        setSelectedTags([...selectedTags, subCategory]);
    };

    return (
        <div>
            <CategoryContainer>
                {/* 2023.05.07 큰 카테고리에서 작은 카테고리를 보여주는 CategoryContainer - 홍혜란 */}
                {categories.map((category, i) => (
                    <div key={category.name}>
                        <CategoryButton onClick={() => handleCategoryClick(category.name, category.index)}>
                            {category.name}
                        </CategoryButton>
                        <SubCategoryList
                            className={index === i ? 'ani' : 'null'}
                            isOpen={openCategory === category.name}
                        >
                            {category.subCategories.map((subCategory) => (
                                <SubCategoryItem key={subCategory} onClick={() => handleSubCategoryClick(subCategory)}>
                                    {subCategory}
                                </SubCategoryItem>
                            ))}
                        </SubCategoryList>
                    </div>
                ))}
            </CategoryContainer>

            {/* 2023.05.10 선택된 태그들을 나타내는 TagContainer - 홍혜란 */}
            {selectedTags.map((tag) => (
                <TagContainer key={tag}>
                    <div className="tagText">{tag}</div>
                    <div className="tagIcon" onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}>
                        <TiDeleteOutline />
                    </div>
                </TagContainer>
            ))}
        </div>
    );
};

export default Categories;

/* 2023.05.07 카테고리 컴포넌트 구현 - 홍혜란 */
const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid white;
`;

/* 2023.05.07 큰 카테고리를 버튼으로 컴포넌틑 구현 - 홍혜란 */
const CategoryButton = styled.button`
    font-size: 20px;
    font-weight: bold;
    color: hsl(0, 0%, 100%);
    background-color: #1f1f1f;
    border: none;
    padding: 10px;
    cursor: pointer;
`;

/* 2023.05.07 "isOpen"이라는 이름의 boolean 타입의 prop을 가진 <ul> 요소를 스타일링 - 홍혜란 */
const SubCategoryList = styled.ul<{ isOpen: boolean }>`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
    height: ${({ isOpen }) => (isOpen ? 'auto' : '0')}; // isOpen 상태면 auto, 아니면 0
    overflow: hidden;
    height: 0px;

    &.ani {
        animation: name 1s forwards;
    }
    @keyframes name {
        100% {
            height: 200px;
        }
    }
`;

/* 2023.05.07 서브카테고리 컴포넌트 구현 - 홍혜란 */
const SubCategoryItem = styled.li`
    font-size: 16px;
    color: hsl(0, 0%, 100%);
    padding: 10px;
    cursor: pointer;
`;

/* 2023.05.10 태그 컴포넌트 구현 - 홍혜란 */
const TagContainer = styled.div`
    border: 1px solid white;
    border-radius: 50px;
    width: 80px;
    height: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;

    .tagText {
        font-size: 15px;
        color: white;
        text-align: center;
        flex: 1;
    }

    .tagIcon {
        display: flex;
        align-items: center;
        color: white;
    }
`;
