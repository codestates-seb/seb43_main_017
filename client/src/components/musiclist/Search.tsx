import styled from 'styled-components';

/* 2023.05.07 검색 컴포넌트 구현 - 홍혜란 */
const SearchContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin: 20px 0px 20px 0px;
`;

const SearchInput = styled.input`
    padding-left: 30px;
    background-image: url('./assets/search.png');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 5px center;
    background-color: #1f1f1f;
    border: 1px solid hsl(0, 0%, 34%);
    border-radius: 30px;
    outline: none;
    color: white;
    width: 200px;
    height: 40px;
    &:focus {
        box-shadow: 0px 0px 0px 2px hsl(0, 0%, 43%);
        border-color: hsl(0, 0%, 63%);
    }
`;

/* 2023.05.07 검색 컴포넌트 구현 - 홍혜란 */
function Search() {
    return (
        <SearchContainer>
            <SearchInput type="text" placeholder="검색어를 입력하세요" />
        </SearchContainer>
    );
}

export default Search;
