import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchItemState, searchResultState } from 'src/recoil/Atoms';

/* 2023.05.07 검색 컴포넌트 구현 - 홍혜란 */
function Search() {
    /* 2023.05.11 서치 상태 관리 - 홍혜란 */
    const [searchItem, setSearchItem] = useRecoilState(searchItemState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value);
    };

    const handleSearch = async () => {
        const response = await fetch(``);
        const result = await response.json();
        // 검색 결과를 전역 recoil 상태에 저장
        useSetRecoilState(searchResultState)(result);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchItem}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
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
    margin: 20px 20px 20px 150px;
    @media screen and (max-width: 768px) {
        flex-direction: row;
        margin-left: 0;
        margin-top: 100px;
    }
`;

/* 2023.05.07 검색 input 컴포넌트 구현 - 홍혜란 */
const SearchInput = styled.input`
    padding-left: 30px;
    background-image: url('./assets/search.png');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 5px center;
    background-color: transparent;
    border: 1px solid hsl(0, 0%, 34%);
    border-radius: 30px;
    outline: none;
    color: white;
    width: 100%;
    height: 30px;
    &:focus {
        box-shadow: 0px 0px 0px 2px hsl(0, 0%, 43%);
        border-color: hsl(0, 0%, 63%);
    }
`;
