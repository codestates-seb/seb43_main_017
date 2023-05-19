package com.codestates.mainProject.musicLike.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MusicLikeDto {
    private Long id;
    private Long memberId;
    private Long musicId;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MusicLikePostDto {
        private Long memberId;
        private Long musicId;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MusicLikeResponseDto {
        private Long id;
        private Long memberId;
        private Long musicId;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MusicLikeToggleResponseDto {
        private Long musicLikeId;
        private Long memberId;
        private Long musicId;
        private String message;
    }
}

