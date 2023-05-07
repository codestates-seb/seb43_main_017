import styled from 'styled-components';
import Search from './Search';

function Musiclist() {
    return (
        <div>
            <MusiclistContainer>
                <TagContainer>
                    <Search />
                </TagContainer>
            </MusiclistContainer>
        </div>
    );
}

export default Musiclist;

const MusiclistContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TagContainer = styled.div`
    align-content: flex-start;
    width: 250px;
    height: 100vh;
    background-color: #1f1f1f;
    margin-left: 150px;
`;
