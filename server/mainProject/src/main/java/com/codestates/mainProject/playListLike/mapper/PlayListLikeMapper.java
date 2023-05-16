package com.codestates.mainProject.playListLike.mapper;

import com.codestates.mainProject.playListLike.dto.LikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlayListLikeMapper {
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "playList.playListId", target = "playListId")
    LikeDto playListLikeToResponse(PlayListLike playListLike);
    List<LikeDto> playListLikesToResponses(List<PlayListLike> playListLikes);
}
