import styled from 'styled-components';

const Loding = () => {
    return (
        <LodingBox>
            <Lodingbar>
                <li className="sec-1"></li>
                <li className="sec-2"></li>
                <li className="sec-3"></li>
                <li className="sec-4"></li>
                <li className="sec-5"></li>
            </Lodingbar>
            <span>LOADING</span>
        </LodingBox>
    );
};

export default Loding;

const LodingBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 150px;
    span {
        color: #ccc;
        font-size: 1rem;
        letter-spacing: 1px;
        font-weight: 700;
    }
`;

const Lodingbar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 20px;

    li {
        width: 10px;
        height: 8px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.3);
        margin: 3px;
    }
    .sec-1 {
        animation: waveDots 2s infinite 0s;
    }
    .sec-2 {
        animation: waveDots 2s infinite 0.3s;
    }
    .sec-3 {
        animation: waveDots 2s infinite 0.5s;
    }
    .sec-4 {
        animation: waveDots 2s infinite 0.8s;
    }
    .sec-5 {
        animation: waveDots 2s infinite 1s;
    }

    @keyframes waveDots {
        50% {
            height: 50px;
        }
    }
`;
