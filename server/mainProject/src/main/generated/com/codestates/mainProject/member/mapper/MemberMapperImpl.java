package com.codestates.mainProject.member.mapper;

import com.codestates.mainProject.member.dto.AuthLoginDto;
import com.codestates.mainProject.member.dto.MemberDto.PatchDto;
import com.codestates.mainProject.member.dto.MemberDto.PostDto;
import com.codestates.mainProject.member.dto.MemberDto.ResponseDto;
import com.codestates.mainProject.member.dto.MemberDto.ResponseDto.ResponseDtoBuilder;
import com.codestates.mainProject.member.entity.Member;
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
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member postToMember(PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( postDto.getName() );
        member.setEmail( postDto.getEmail() );
        member.setPassword( postDto.getPassword() );

        return member;
    }

    @Override
    public Member patchToMember(PatchDto patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( patchDto.getMemberId() );
        member.setName( patchDto.getName() );
        member.setEmail( patchDto.getEmail() );

        return member;
    }

    @Override
    public ResponseDto memberToResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        ResponseDtoBuilder responseDto = ResponseDto.builder();

        if ( member.getMemberId() != null ) {
            responseDto.memberId( member.getMemberId() );
        }
        responseDto.name( member.getName() );
        responseDto.email( member.getEmail() );
        responseDto.image( member.getImage() );
        responseDto.status( member.getStatus() );
        responseDto.createdAt( member.getCreatedAt() );
        responseDto.modifiedAt( member.getModifiedAt() );

        return responseDto.build();
    }

    @Override
    public List<ResponseDto> membersToResponses(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<ResponseDto> list = new ArrayList<ResponseDto>( members.size() );
        for ( Member member : members ) {
            list.add( memberToResponse( member ) );
        }

        return list;
    }

    @Override
    public Member AuthLoginDtoMember(AuthLoginDto authLoginDto) {
        if ( authLoginDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( authLoginDto.getName() );
        member.setEmail( authLoginDto.getEmail() );

        return member;
    }
}
