package com.codestates.mainProject.memberMusicTag.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.memberMusicTag.entity.MemberMusicTag;
import com.codestates.mainProject.memberMusicTag.repository.MemberMusicTagRepository;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.musicTag.entity.MusicTag;
import com.codestates.mainProject.musicTag.repository.MusicTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberMusicTagService {

    private final MemberMusicTagRepository memberMusicTagRepository;
    private final MemberRepository memberRepository;
    private final MusicTagRepository musicTagRepository;

    public MemberMusicTag createMemberMusicTag(Long loginId, long musicTagId){
        verifyExistMemberMusicTag(loginId,musicTagId);
        Member member = memberRepository.findById(loginId).get();
        MusicTag musicTag = musicTagRepository.findById(musicTagId).get();

        MemberMusicTag memberMusicTag = new MemberMusicTag();
        memberMusicTag.setMember(member);
        memberMusicTag.setMusicTag(musicTag);

        member.addMemberMusicTag(memberMusicTag);

        return memberMusicTag;
    }

    public void deleteMemberMusicTag(long loginId, long musicTagId ){
        MemberMusicTag findMemberMusicTag =findVerifiedMemberMusicTag(loginId, musicTagId);

        Member member = memberRepository.findById(loginId).get();


        member.removeMemberMusicTag(findMemberMusicTag);


        memberMusicTagRepository.delete(findMemberMusicTag);
    }


    public MemberMusicTag findVerifiedMemberMusicTag (long loginId, long musicTagId) {
        Optional<MemberMusicTag> optionalMemberMusicTag = memberMusicTagRepository.findByMemberMemberIdAndMusicTagMusicTagId(loginId, musicTagId);
        MemberMusicTag findMemberMusicTag = optionalMemberMusicTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_MUSIC_TAG_NOT_FOUND));

        return findMemberMusicTag;
    }



    public void verifyExistMemberMusicTag(long loginId, long musicTagId) {
        Optional<MemberMusicTag> optionalMemberMusicTag = memberMusicTagRepository.findByMemberMemberIdAndMusicTagMusicTagId(loginId,musicTagId);
        if (optionalMemberMusicTag.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_MUSIC_TAG_EXISTS);
    }
}
