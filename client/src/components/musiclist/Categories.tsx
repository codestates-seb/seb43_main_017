import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { VscClose } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { selectedTagsState, showSearch, tagSreachState } from 'src/recoil/Atoms';
import { MdTransitEnterexit } from 'react-icons/md';
import axios from 'axios';
import Search from './Search';
import { useLocation } from 'react-router-dom';
import { TbMoodPlus } from 'react-icons/tb';
import { IoMdMusicalNote } from 'react-icons/io';
import { MdPiano } from 'react-icons/md';

interface CategoryProps {
    showSearchResult: (searchText: string) => void;
}

const Categories = ({ showSearchResult }: CategoryProps) => {
    const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
    const [tagSelectedTags, setTagSelectedTags] = useState<string[]>([]);
    const [, setShowSearch] = useRecoilState<boolean>(showSearch);
    const [feel, setFeel] = useState<tag[]>([]);
    const [genre, setGenre] = useState<tag[]>([]);
    const [instrument, setInstrument] = useState<tag[]>([]);
    const [showSubTags, setShowSubTags] = useState<string>('genre');
    const [tag, setTags] = useRecoilState(tagSreachState);

    const tagsString = tagSelectedTags.join('&');
    setTags(tagsString);

    interface tag {
        id: number;
        name: string;
        category: string;
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/tags`).then(function (res) {
            const tags = res.data;
            const filteredTags = tags.filter((tag: tag) => tag.category === 'FEEL');
            const filteredGenre = tags.filter((tag: tag) => tag.category === 'GENRE');
            const filteredInstrument = tags.filter((tag: tag) => tag.category === 'INSTRUMENT');
            setFeel(filteredTags);
            setGenre(filteredGenre);
            setInstrument(filteredInstrument);
        });
    }, []);

    const handleSubCategoryClick = (subCategory: string) => {
        // 이미 선택된 태그가 있는지 확인
        const tagAlreadySelected = selectedTags.includes(subCategory);

        // 선택된 태그가 없을 경우만 추가
        if (!tagAlreadySelected) {
            setSelectedTags([...selectedTags, subCategory]);
            setTagSelectedTags([...tagSelectedTags, `tags=${subCategory}`]);
        }
    };

    //태그 딜리트기능
    const handleTagDelete = (tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
        setTagSelectedTags(tagSelectedTags.filter((t) => t !== `tags=${tag}`));
    };

    /** 2023.05.24 태그 선택된 채로 다른 페이지 이동한 후 돌아왔을 때 태그 초기화 */
    const location = useLocation();

    useEffect(() => {
        setSelectedTags([]);
        setTagSelectedTags([]);
    }, [location.pathname]); //경로(location.pathname)가 변경될 때마다 선택된 태그를 초기화

    return (
        <CateTagContainer>
            <CategoryContainer>
                <Search showSearchResult={showSearchResult} />
                <TagGroup>
                    <ul>
                        <li
                            className="Category-title"
                            onClick={() => {
                                setShowSubTags('feel');
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <TbMoodPlus />
                            FEELING
                        </li>
                        {feel.map((tag) => (
                            <li
                                className={`Sub-tags ${showSubTags === 'feel' ? 'Show-subtag' : null}`}
                                key={tag.id}
                                onClick={() => {
                                    handleSubCategoryClick(tag.name);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li
                            className="Category-title"
                            onClick={() => {
                                setShowSubTags('genre');
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <IoMdMusicalNote />
                            GENRE
                        </li>
                        {genre.map((tag) => (
                            <li
                                className={`Sub-tags ${showSubTags === 'genre' ? 'Show-subtag' : null}`}
                                key={tag.id}
                                onClick={() => {
                                    handleSubCategoryClick(tag.name);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li
                            className="Category-title"
                            onClick={() => {
                                setShowSubTags('instrument');
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <MdPiano />
                            INSTRUMENT
                        </li>
                        {instrument.map((tag) => (
                            <li
                                className={`Sub-tags ${showSubTags === 'instrument' ? 'Show-subtag' : null}`}
                                key={tag.id}
                                onClick={() => {
                                    handleSubCategoryClick(tag.name);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                </TagGroup>
            </CategoryContainer>
            <TagBox>
                {selectedTags.map((tag) => (
                    <TagContainer key={tag}>
                        <div className="tagText">{tag}</div>
                        <div
                            className="tagIcon"
                            onClick={() => {
                                handleTagDelete(tag);
                            }}
                        >
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
    /* overflow-x: hidden; */
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
const TagGroup = styled.div`
    width: 100%;

    ul {
        font-size: 0.8rem;
    }
    ul > li {
        margin: 0px 30px;
        color: #999999;
        font-family: 'Noto Sans KR', sans-serif;
    }
    .Category-title {
        display: flex;
        align-items: center;
        font-family: 'Rajdhani', sans-serif;
        letter-spacing: 3px;
        margin: 10px 0px;
        font-size: 1rem;
        font-weight: 700;
        color: #ccc;

        > * {
            margin-right: 10px;
        }
    }
    .Sub-tags {
        overflow: hidden;
        height: 0px;
        margin: 0px;
    }
    .Sub-tags:hover {
        color: hsl(0, 75%, 61%);
    }

    .Show-subtag {
        opacity: 0;
        animation: showfeel 1s forwards;
    }

    @keyframes showfeel {
        0% {
            margin: 0px 30px;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            height: auto;
            margin: 20px 30px;
        }
    }
`;
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
