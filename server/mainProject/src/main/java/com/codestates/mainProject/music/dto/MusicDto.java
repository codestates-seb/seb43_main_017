package com.codestates.mainProject.music.dto;

import lombok.*;

public class MusicDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDto {
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumImg;
        private String backgroundImg;
        private String musicUri;
        // 태그
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchDto {
        private long musicId;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumImg;
        private String backgroundImg;
        private String musicUri;
        // 태그
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseDto {
        private long musicId;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumImg;
        private String backgroundImg;
        private String musicUri;
        // 태그
    }

    @Data
    public static class DeleteSuccessDto {
        private String message;

        public DeleteSuccessDto(String message) {
            this.message = message;
        }
    }
}
