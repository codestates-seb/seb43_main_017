package com.codestates.mainProject.tags.dto;

import com.codestates.mainProject.tags.entity.Tag;
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

        @NotBlank
        private String category;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        private long id;
        private String name;
        private String category;
    }
}
