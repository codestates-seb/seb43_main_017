package com.codestates.mainProject.playListComment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CommentDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDto {
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        private long id;
        private long memberId;
        private long playListId;
        private String name;
        private String image;
        private String content;
    }
}

