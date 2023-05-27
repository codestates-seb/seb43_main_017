import { useCallback, useState, Ref } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';
import { videouploadState } from 'src/recoil/Atoms';
import { useRecoilState } from 'recoil';
/** 2022/05/22 - Video Ref 타입 선언 - 박수범 */
interface LikedListProps {
    videoRef: Ref<HTMLVideoElement>;
}
const VideoUploader = ({ videoRef }: LikedListProps) => {
    const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
    const [videoState, setvideouploadState] = useRecoilState(videouploadState);

    /** 2022/05/22 - 드래그앤 드랍을 통해 드랍존에 비디오 데이터가 들어왔을때 비디오플레이어가 나타나게 해주고 파일데이터를 저장하는 로직 -박수범 */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedVideo(file);
                setvideouploadState(true);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);
    /**2023/05/23 - getRootProps:드래그 앤 드랍을 구성하는데에 필요한 이벤트들이 들어가있다. ex.onBlur,onClick 등등..
     * @사용법 : {...getRootProps} 이런식으로 스프레드 문법으로 안에 이벤트들을 풀어놓고 태그안에서 사용한다. 다른
     * 이벤트를 추가하고싶으면 getRootProps({이벤트}) 이렇게 추가하면 된다.
     * getInputProps: 드래그 앤 드랍 존을 구성하는 input창 안에 들어갈 input속성들이 들어가있다.
     * @사용법 : 마찬가지로 {...getInputProps} 이렇게 스프레드 문법으로 풀어서 사용하면 된다.
     */
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            {/*  URL.createObjectURL을 활용하면 아래와 같이 blob객체의 url주소값으로 이미지를 불러 올 수 있다. */}
            {!uploadedVideo || !videoState ? (
                <DropzoneStyle {...getRootProps()}>
                    <input {...getInputProps({ accept: 'video/*' })} />
                    <p>Drag and drop your video file to upload, or click to select a file.</p>
                </DropzoneStyle>
            ) : (
                <VideoPlayer videoUrl={URL.createObjectURL(uploadedVideo)} videoRef={videoRef} />
            )}
        </div>
    );
};
/**2023/05/18 - 드래그 앤 드랍존 컴포넌트 - 박수범 */
const DropzoneStyle = styled.div`
    margin-top: 30px;
    width: 500px;
    height: 200px;
    border: 2px dashed gray;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    @media (max-width: 722px) {
        width: 300px;
        height: 120px;
    }
    cursor: pointer;
    > p {
        color: gray;
    }
`;

export default VideoUploader;
