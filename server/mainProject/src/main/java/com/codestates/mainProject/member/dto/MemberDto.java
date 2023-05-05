package com.codestates.mainProject.member.dto;


import com.codestates.mainProject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDto{
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
        private long MemberId;
        private String name;
        private String email;
        private String image;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {

        private long MemberId;
        private String name;
        private String email;
        private String image;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
