package com.codestates.mainProject.musicComment.mapper;


import com.codestates.mainProject.musicComment.dto.MusicCommentDto;
import com.codestates.mainProject.musicComment.entity.MusicComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MusicCommentMapper {
    @Mapping(source = "member.name", target = "name")
    @Mapping(source = "member.image", target = "image")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "music.musicId", target = "musicId")
    MusicCommentDto commentToResponse(MusicComment musicComment);
    List<MusicCommentDto> commentsToResponses(List<MusicComment> musicComments);
}
