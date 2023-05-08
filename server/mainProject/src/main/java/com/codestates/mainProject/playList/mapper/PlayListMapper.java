package com.codestates.mainProject.playList.mapper;

import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlayListMapper {
<<<<<<< HEAD

    @Mapping(source = "memberId", target = "member.memberId")
    PlayList postToPlayList(PlayListDto.PostDto postDto);
=======
    @Mapping(source = "memberId", target = "member.memberId")
    PlayList postToPlayList(PlayListDto.PostDto postDto);

>>>>>>> 557dd4b32be2a97a4798b3a896ec233a7c1efbd2
    PlayList patchToPlayList(PlayListDto.PatchDto patchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    PlayListDto.ResponseDto playListToResponse(PlayList playList);
<<<<<<< HEAD
=======

>>>>>>> 557dd4b32be2a97a4798b3a896ec233a7c1efbd2
    List<PlayListDto.ResponseDto> playListsToResponses(List<PlayList> playLists);
}
