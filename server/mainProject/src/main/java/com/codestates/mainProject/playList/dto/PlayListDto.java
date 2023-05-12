package com.codestates.mainProject.playList.dto;

import com.codestates.mainProject.member.entity.Member;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
public class PlayListDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDto {
        @NotBlank
        private String title;
        @NotBlank
        private String body;
        private int playListLikes;
        private String playListTags;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PatchDto {
        @Positive
        private long playListId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        public void setPlayListId(long playListId){this.playListId = playListId;}
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        // TODO: 주석 처리된 부분 추후에 작업
        private long playListId;
        private long memberId;
        private String create;
//        private MusicDto music;
//        private List<PlayListLikeDto> likes = new ArrayList<>();
        private String title;
        private String body;
        private int playListLikes;
        private String playListTags;
        private String createdAt;
        private String modifiedAt;

        public void setMember(Member member){this.memberId = member.getMemberId();}
    }

    @Data
    public static class DeleteSuccessDto {
        private String message;

        public DeleteSuccessDto(String message) {this.message = message;}
    }

}
