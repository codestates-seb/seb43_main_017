package com.codestates.mainProject.playListComment.mapper;

import com.codestates.mainProject.playListComment.dto.CommentDto;
import com.codestates.mainProject.playListComment.entity.PlayListComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "playList.playListId", target = "playListId")
    CommentDto.ResponseDto playListCommentToResponse(PlayListComment playListComment);
    List<CommentDto.ResponseDto> playListCommentsToResponses(List<PlayListComment> playListComments);
}
