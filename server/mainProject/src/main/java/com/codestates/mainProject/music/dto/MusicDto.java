package com.codestates.mainProject.music.dto;

import lombok.*;

public class MusicDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDto {
        private String musicName;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumCoverImg;
        private String musicUri;
        // 태그
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchDto {
        private long musicId;
        private String musicName;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumCoverImg;
        private String musicUri;
        // 태그
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseDto {
        private long musicId;
        private String musicName;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumCoverImg;
        private String musicUri;
        private String createdAt;
        private String modifiedAt;
        // 태그
    }

    @Data
    public static class DeleteSuccessDto {
        private String message;

        public DeleteSuccessDto(String message) {
            this.message = message;
        }
    }

    @Getter
    @Setter
    public static class MessageResponseDto {
        private String message;

        public MessageResponseDto(String message) {
            this.message = message;
        }
    }
}
