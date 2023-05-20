package com.codestates.mainProject.playList.dto;

import com.codestates.mainProject.member.entity.Member;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

public class PlayListDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDto {
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        private String coverImg;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PatchDto {
        @NotBlank
        private String title;
        @NotBlank
        private String body;
        private String coverImg;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        private long playListId;
        private long memberId;
        private String createMember;
        private String title;
        private String body;
        private String coverImg;
        private List<String> tags;
        private int likeCount;
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
