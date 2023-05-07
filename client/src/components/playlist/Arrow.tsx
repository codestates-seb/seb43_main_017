import styled from 'styled-components';

type SampleArrowProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function SampleNextArrow(props: SampleArrowProps) {
    const { className, style, onClick } = props;
    return <Arrowbutton className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}

export function SamplePrevArrow(props: SampleArrowProps) {
    const { className, style, onClick } = props;
    return (
        <Arrowbutton
            className={className}
            style={{ ...style, display: 'flex', border: '1px solid red', background: 'none' }}
            onClick={onClick}
        />
    );
}

const Arrowbutton = styled.div`
    color: #000;
`;
