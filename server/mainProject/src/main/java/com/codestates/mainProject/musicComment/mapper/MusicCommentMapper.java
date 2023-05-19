package com.codestates.mainProject.musicComment.mapper;


import com.codestates.mainProject.musicComment.dto.MusicCommentDto;
import com.codestates.mainProject.musicComment.entity.MusicComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MusicCommentMapper {
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "music.musicId", target = "musicId")
    MusicCommentDto commentToResponse(MusicComment musicComment);
    MusicComment postCommentToMusic(MusicCommentDto.PostDto postDto);
    MusicComment patchCommentToMusic(MusicCommentDto.PatchDto patchDto);
    List<MusicCommentDto> commentsToResponses(List<MusicComment> musicComments);
}
