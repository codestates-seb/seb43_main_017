package com.codestates.mainProject.memberMusic.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.memberMusic.repository.MemberMusicRepository;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberMusicService {

    private final MemberService memberService;
    private final MusicService musicService;

    private final MemberMusicRepository memberMusicRepository;

    public MemberMusic createMemberMusic(long memberId, long musicId) {

        verifyExistMemberMusic(memberId, musicId);
        Member findMember = memberService.findVerifiedMember(memberId);
        Music findMusic = musicService.findMusicById(musicId);

        MemberMusic memberMusic = new MemberMusic();
        memberMusic.setMember(findMember);
        memberMusic.setMusic(findMusic);

        findMember.addMemberMusic(memberMusic);
        findMusic.addMemberMusic(memberMusic);

        return memberMusicRepository.save(memberMusic);
    }

    public void deleteMemberMusic(long memberId, long musicId ){
        MemberMusic findMemberMusic =findVerifiedMemberMusic(memberId, musicId);
        Member findMember = memberService.findVerifiedMember(memberId);
        Music findMusic = musicService.findMusicById(musicId);

        findMember.removeMemberMusic(findMemberMusic);
        findMusic.removeMemberMusic(findMemberMusic);

        memberMusicRepository.delete(findMemberMusic);

    }

    public MemberMusic findVerifiedMemberMusic(long memberId, long musicId) {
        Optional<MemberMusic> optionalMemberMusic = memberMusicRepository.findByMemberMemberIdAndMusicMusicId(memberId, musicId);
        MemberMusic findMemberMusic = optionalMemberMusic.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_MUSIC_NOT_FOUND));

        return findMemberMusic;
    }

    public void verifyExistMemberMusic(long memberId, long musicId) {
        Optional<MemberMusic> optionalMemberMusic = memberMusicRepository.findByMemberMemberIdAndMusicMusicId(memberId,musicId);
        if (optionalMemberMusic.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_MUSIC_EXISTS);
    }
}
