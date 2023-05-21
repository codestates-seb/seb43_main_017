import React, { useCallback, useRef, useState, LegacyRef } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';
import { videouploadState } from 'src/recoil/Atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface LikedListProps {
    videoRef: LegacyRef<HTMLVideoElement>;
}
const VideoUploader = ({ videoRef }: LikedListProps) => {
    const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
    const [videoState, setvideouploadState] = useRecoilState(videouploadState);

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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            {!uploadedVideo || !videoState ? (
                <DropzoneStyle {...getRootProps()} onClick={handleInputClick}>
                    <input {...getInputProps({ accept: 'video/*' })} ref={fileInputRef} />
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
    cursor: pointer;
    > p {
        color: gray;
    }
`;

export default VideoUploader;
