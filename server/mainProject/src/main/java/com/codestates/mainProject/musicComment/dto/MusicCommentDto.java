package com.codestates.mainProject.musicComment.dto;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.music.entity.Music;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class MusicCommentDto {
        private Long id;
        private String content;
        private Long memberId;
        private String name;
        private String image;
        private Long musicId;

        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        public static class PostDto {
            private String content;
        }

        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        public static class PatchDto {
            private String content;
        }
}
