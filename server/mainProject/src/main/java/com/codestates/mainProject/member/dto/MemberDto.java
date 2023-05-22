package com.codestates.mainProject.member.dto;


import com.codestates.mainProject.member.entity.Member;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class PostDto{
        @NotBlank
        private String name;
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String password;


    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchDto{
        private String name;

    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {

        private long memberId;
        private String name;
        private String email;
        private String image;
        private Member.Status status;

        private String createdAt;
        private String modifiedAt;
    }
}
