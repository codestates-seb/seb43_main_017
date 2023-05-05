package com.codestates.mainProject.playList.mapper;

import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlayListMapper {
    PlayList postToPlayList(PlayListDto.PostDto postDto);
    PlayList patchToPlayList(PlayListDto.PatchDto patchDto);
    PlayListDto.ResponseDto playListToResponse(PlayList playList);
    List<PlayListDto.ResponseDto> playListsToResponses(List<PlayList> playLists);
}
