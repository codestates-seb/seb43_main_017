import styled from 'styled-components';

function SoundBar() {
    return <Soundbarsection></Soundbarsection>;
}

export default SoundBar;

const Soundbarsection = styled.div`
    position: fixed;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(20, 20, 20, 1);
    z-index: 99;
    width: 800px;
    height: 60px;
    border-radius: 30px 30px 0px 0px;
    animation: showbar 0.5s forwards;

    @keyframes showbar {
        100% {
            bottom: 0px;
        }
    }
`;
