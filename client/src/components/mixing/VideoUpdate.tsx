import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const VideoUploader: React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('실행되니?');
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result; // 드롭된 파일의 데이터
                console.log('업로드된 파일:', file.name);
                console.log('파일 데이터:', fileData);
            };
            reader.readAsDataURL(file); // 파일 데이터 읽기
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <DropzoneStyle {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>비디오 파일을 이곳에 드래그해주세요.</p>
            ) : (
                <p>비디오 파일을 드래그 앤 드랍하여 업로드하거나, 클릭하여 파일을 선택하세요.</p>
            )}
        </DropzoneStyle>
    );
};

const DropzoneStyle = styled.div`
    width: 500px;
    height: 200px;
    border: 2px dashed gray;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
`;

export default VideoUploader;
