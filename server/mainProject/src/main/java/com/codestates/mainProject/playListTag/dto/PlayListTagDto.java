package com.codestates.mainProject.playListTag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlayListTagDto {
    private long playListTagId;
    private long playListId;
    private long tagId;
    private String name;
}
