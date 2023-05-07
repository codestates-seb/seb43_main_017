package com.codestates.mainProject.playList.mapper;

import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlayListMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    PlayList postToPlayList(PlayListDto.PostDto postDto);

    PlayList patchToPlayList(PlayListDto.PatchDto patchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    PlayListDto.ResponseDto playListToResponse(PlayList playList);

    List<PlayListDto.ResponseDto> playListsToResponses(List<PlayList> playLists);
}
