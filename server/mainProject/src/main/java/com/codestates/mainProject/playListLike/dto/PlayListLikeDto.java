package com.codestates.mainProject.playListLike.dto;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PlayListLikeDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDto {
        private boolean playListLike;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PatchDto {
        private boolean playListLike;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        private long playListLikeId;
        private long playListId;
        private long memberId;
        private boolean playListLike;
    }
}
