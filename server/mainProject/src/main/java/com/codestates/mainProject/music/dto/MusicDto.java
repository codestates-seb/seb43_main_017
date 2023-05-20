package com.codestates.mainProject.music.dto;

import com.codestates.mainProject.music.entity.Music;
import lombok.*;

import java.util.List;

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
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchDto {
        private String musicName;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumCoverImg;
        private String musicUri;
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
        private int musicLikeCount;
        private String createdAt;
        private String modifiedAt;
        private List<String> musicTagName;
        private long memberId;
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderResponseDto {
        private long musicId;
        private String musicName;
        private String artistName;
        private String albumName;
        private long musicTime;
        private String albumCoverImg;
        private String musicUri;
        private int musicLikeCount;
        private String createdAt;
        private String modifiedAt;
        private List<String> musicTagName;

        public OrderResponseDto(Music music) {
            this.musicId = music.getMusicId();
            this.musicName = music.getMusicName();
            this.artistName = music.getArtistName();
            this.albumName = music.getAlbumName();
            this.musicTime = music.getMusicTime();
            this.albumCoverImg = music.getAlbumCoverImg();
            this.musicUri = music.getMusicUri();
            this.musicLikeCount = music.getMusicLikeCount();
            this.createdAt = music.getCreatedAt();
            this.modifiedAt = music.getModifiedAt();
            this.musicTagName = music.getTagsName();
        }
    }
}
