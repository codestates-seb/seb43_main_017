package com.codestates.mainProject.musicTag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MusicTagDto {

    private long musicTagId;
    private long musicId;
    private long tagId;
    private String tagName;
}
