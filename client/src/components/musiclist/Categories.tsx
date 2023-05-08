import styled from 'styled-components';
import { useState } from 'react';

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
        name: 'WEATHER',
        subCategories: ['맑은 날', '흐린 날', '비 오는 날', '눈 오는 날', '바람 부는 날'],
    },
    {
        index: 2,
        name: 'SITUATION',
        subCategories: ['집에서', '잠들기 전', '드라이브', '운동하며', '밥먹다가'],
    },
];

const Categories = () => {
    /* 2023.05.07 카테고리 클릭 이벤트 - 홍혜란 */
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

    return (
        <div>
            <CategoryContainer>
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
                                <SubCategoryItem key={subCategory}>{subCategory}</SubCategoryItem>
                            ))}
                        </SubCategoryList>
                    </div>
                ))}
            </CategoryContainer>
        </div>
    );
};

export default Categories;

/* 2023.05.07 카테고리 컴포넌트 구현 - 홍혜란 */
const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
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
