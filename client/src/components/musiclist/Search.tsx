import styled from 'styled-components';
import { useState } from 'react';

interface SearchProps {
    showSearchResult: (searchText: string) => void;
}

/* 2023.05.07 검색 컴포넌트 구현 - 홍혜란 */
function Search({ showSearchResult }: SearchProps) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchText.length > 0) {
            showSearchResult(searchText);
            setSearchText('');
        }
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                onKeyDown={handleSearch}
            />
        </SearchContainer>
    );
}

export default Search;

/* 2023.05.07 검색 컴포넌트 구현 - 홍혜란 */
const SearchContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin: 30px 10px 30px 0px;
`;

/* 2023.05.07 검색 input 컴포넌트 구현 - 홍혜란 */
const SearchInput = styled.input`
    padding-left: 30px;
    background-image: url('./assets/search.png');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: 10px center;
    background-color: transparent;
    border: 2px solid hsl(0, 0%, 34%);
    border-radius: 30px;
    outline: none;
    color: #ccc;
    width: 100%;
    height: 30px;
    &:focus {
        /* box-shadow: 0px 0px 0px 2px hsl(0, 0%, 43%); */
        border: 2px solid hsl(0, 0%, 63%);
    }

    &::placeholder {
        color: #666;
    }
`;
