package com.codestates.mainProject.playListLike.mapper;

import com.codestates.mainProject.playListLike.dto.PlayListLikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlayListLikeMapper {
    PlayListLike postToPlayListLike(PlayListLikeDto.PostDto postDto);
    PlayListLike patchToPlayListLike(PlayListLikeDto.PatchDto patchDto);
    PlayListLikeDto.ResponseDto playListLikeToResponse(PlayListLike playListLike);
    List<PlayListLikeDto.ResponseDto> playListLikesToResponses(List<PlayListLike> playListLikes);
}
