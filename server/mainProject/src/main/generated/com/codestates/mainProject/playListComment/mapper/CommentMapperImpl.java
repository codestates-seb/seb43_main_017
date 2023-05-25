package com.codestates.mainProject.playListComment.mapper;

import com.codestates.mainProject.playListComment.dto.CommentDto.PatchDto;
import com.codestates.mainProject.playListComment.dto.CommentDto.PostDto;
import com.codestates.mainProject.playListComment.dto.CommentDto.ResponseDto;
import com.codestates.mainProject.playListComment.entity.PlayListComment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-15T21:30:16+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public PlayListComment postToPlayListComment(PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        PlayListComment playListComment = new PlayListComment();

        playListComment.setContent( postDto.getContent() );

        return playListComment;
    }

    @Override
    public PlayListComment patchToPlayListComment(PatchDto patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        PlayListComment playListComment = new PlayListComment();

        playListComment.setContent( patchDto.getContent() );

        return playListComment;
    }

    @Override
    public ResponseDto playListCommentToResponse(PlayListComment playListComment) {
        if ( playListComment == null ) {
            return null;
        }

        ResponseDto responseDto = new ResponseDto();

        if ( playListComment.getId() != null ) {
            responseDto.setId( playListComment.getId() );
        }
        responseDto.setContent( playListComment.getContent() );

        return responseDto;
    }

    @Override
    public List<ResponseDto> playListCommentsToResponses(List<PlayListComment> playListComments) {
        if ( playListComments == null ) {
            return null;
        }

        List<ResponseDto> list = new ArrayList<ResponseDto>( playListComments.size() );
        for ( PlayListComment playListComment : playListComments ) {
            list.add( playListCommentToResponse( playListComment ) );
        }

        return list;
    }
}
