// import AudioSpectrum from 'react-audio-spectrum';
import ReactAudioSpectrum from 'react-audio-spectrum';
import styled from 'styled-components';

function MusicSpectrum() {
    return (
        <Group>
            <audio
                id="audio-element"
                src="https://mainproject-uncover.s3.ap-northeast-2.amazonaws.com/assets/music/Achievement+-+Philip+Anderson.mp3"
                controls
            />
            <div>
                <ReactAudioSpectrum
                    id="audio-canvas"
                    height={500}
                    width={900}
                    audioId={'audio-element'}
                    capColor={'#E4E4E4'}
                    capHeight={0}
                    meterWidth={10}
                    meterCount={512}
                    meterColor={[
                        { stop: 0.3, color: '#ffe574' },
                        { stop: 0.8, color: 'rgba(199, 68, 68, 1)' },
                        { stop: 1, color: '#a748ff' },
                    ]}
                    gap={5}
                />
            </div>
        </Group>
    );
}

export default MusicSpectrum;

const Group = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;

    audio {
        position: absolute;
        right: 300px;
    }
`;
