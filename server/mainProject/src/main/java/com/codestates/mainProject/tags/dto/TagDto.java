package com.codestates.mainProject.tags.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class TagDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDto {
        @NotBlank
        private String name;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        private long id;
        private String name;
    }
}
