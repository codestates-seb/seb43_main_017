import AudioSpectrum from 'react-audio-spectrum';
import styled from 'styled-components';

function MusicSpectrum() {
    return (
        <Group>
            <audio id="audio-element" src="./assets/music/Happy Feet - Soundroll.mp3" controls />
            <div>
                <AudioSpectrum
                    id="audio-canvas"
                    height={200}
                    width={500}
                    audioId={'audio-element'}
                    capColor={'#E4E4E4'}
                    capHeight={2}
                    meterWidth={2}
                    meterCount={512}
                    meterColor={[
                        { stop: 0, color: '#ffe574' },
                        { stop: 0.5, color: 'rgba(199, 68, 68, 1)' },
                        { stop: 1, color: '#c485ff' },
                    ]}
                    gap={4}
                />
            </div>
        </Group>
    );
}

export default MusicSpectrum;

const Group = styled.div`
    position: relative;
    display: flex;
    audio {
        position: absolute;
        bottom: 0px;
    }
    > div {
        display: flex;
        justify-content: center;
        width: 100%;
    }
`;
