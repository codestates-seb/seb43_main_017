package com.codestates.mainProject.playListLike.dto;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlayListLikeDto {
    private long memberId;
    private long playListId;

    public PlayListLikeDto(long memberId, long playListId){
        this.memberId = memberId;
        this.playListId = playListId;
    }
}
