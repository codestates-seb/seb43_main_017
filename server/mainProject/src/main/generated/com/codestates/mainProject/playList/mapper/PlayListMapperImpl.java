package com.codestates.mainProject.playList.mapper;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.dto.PlayListDto.PatchDto;
import com.codestates.mainProject.playList.dto.PlayListDto.PostDto;
import com.codestates.mainProject.playList.dto.PlayListDto.ResponseDto;
import com.codestates.mainProject.playList.entity.PlayList;
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
public class PlayListMapperImpl implements PlayListMapper {

    @Override
    public PlayList postToPlayList(PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        PlayList playList = new PlayList();

        playList.setTitle( postDto.getTitle() );
        playList.setBody( postDto.getBody() );

        return playList;
    }

    @Override
    public PlayList patchToPlayList(PatchDto patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        PlayList playList = new PlayList();

        playList.setPlayListId( patchDto.getPlayListId() );
        playList.setTitle( patchDto.getTitle() );
        playList.setBody( patchDto.getBody() );

        return playList;
    }

    @Override
    public ResponseDto playListToResponse(PlayList playList) {
        if ( playList == null ) {
            return null;
        }

        ResponseDto responseDto = new ResponseDto();

        Long memberId = playListMemberMemberId( playList );
        if ( memberId != null ) {
            responseDto.setMemberId( memberId );
        }
        responseDto.setMember( playList.getMember() );
        if ( playList.getPlayListId() != null ) {
            responseDto.setPlayListId( playList.getPlayListId() );
        }
        responseDto.setCreateMember( playList.getCreateMember() );
        responseDto.setTitle( playList.getTitle() );
        responseDto.setBody( playList.getBody() );
        responseDto.setCreatedAt( playList.getCreatedAt() );
        responseDto.setModifiedAt( playList.getModifiedAt() );

        return responseDto;
    }

    @Override
    public List<ResponseDto> playListsToResponses(List<PlayList> playLists) {
        if ( playLists == null ) {
            return null;
        }

        List<ResponseDto> list = new ArrayList<ResponseDto>( playLists.size() );
        for ( PlayList playList : playLists ) {
            list.add( playListToResponse( playList ) );
        }

        return list;
    }

    private Long playListMemberMemberId(PlayList playList) {
        if ( playList == null ) {
            return null;
        }
        Member member = playList.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }
}
