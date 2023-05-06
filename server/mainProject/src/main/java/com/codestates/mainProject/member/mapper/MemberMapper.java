package com.codestates.mainProject.member.mapper;

import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member postToMember(MemberDto.PostDto postDto);


    Member patchToMember(MemberDto.PatchDto patchDto);

    MemberDto.ResponseDto memberToResponse(Member member);

    List<MemberDto.ResponseDto> membersToResponses(List<Member> members);
}
