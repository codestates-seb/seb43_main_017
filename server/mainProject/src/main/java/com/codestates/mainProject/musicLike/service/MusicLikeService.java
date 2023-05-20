package com.codestates.mainProject.musicLike.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.memberMusic.service.MemberMusicService;
import com.codestates.mainProject.memberMusicTag.entity.MemberMusicTag;
import com.codestates.mainProject.memberMusicTag.service.MemberMusicTagService;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.musicLike.dto.MusicLikeDto;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.musicLike.repository.MusicLikeRepository;
import com.codestates.mainProject.musicTag.entity.MusicTag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MusicLikeService {

    private final MusicLikeRepository musicLikeRepository;
    private final MusicRepository musicRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final MemberMusicTagService memberMusicTagService;

    // 음악 좋아요 생성/취소
    public MusicLikeDto.MusicLikeToggleResponseDto toggleMusicLike(Long memberId, long musicId) {

        Member member = memberService.findVerifiedMember(memberId);
        Music music = musicRepository.findById(musicId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MUSIC_NOT_FOUND));

        List<MusicLike> musicLikes = music.getMusicLikes();
        List<MusicTag> musicTags = music.getMusicTags();


        Optional<MusicLike> optionalMusicLike = musicLikes.stream()
                .filter(musiclike -> musiclike.getMember().getMemberId().equals(memberId))
                .findFirst();


        MusicLikeDto.MusicLikeToggleResponseDto responseDto = new MusicLikeDto.MusicLikeToggleResponseDto();
        responseDto.setMemberId(memberId);
        responseDto.setMusicId(musicId);

        if (optionalMusicLike.isPresent()) {
            MusicLike musicLike = optionalMusicLike.get();

            validateMusicLikeAuthorOrAdmin(memberId, musicLike);
            music.removeMusicLike(musicLike);


            for(MusicTag musicTag : musicTags ){
                memberMusicTagService.deleteMemberMusicTag(memberId,musicTag.getMusicTagId());  //music에 있는 musicTag들을 memberMusicTag에서 모두지움
            }
            musicLikeRepository.delete(musicLike);
//            music.removeMusicLike(musicLike);   // 좋아요 취소 후 Music 엔티티와의 관계를 삭제

            responseDto.setMessage("좋아요가 취소되었습니다.");
        } else {
            MusicLike musicLike = new MusicLike(member, music);
            music.addMusicLike(musicLike);
            MusicLike savedMusicLike = musicLikeRepository.save(musicLike);

            for(MusicTag musicTag : musicTags ){
                memberMusicTagService.createMemberMusicTag(memberId,musicTag.getMusicTagId()); //music에 있는 musicTag들을 memberMusicTag에서 모두생성
            }

            responseDto.setMusicLikeId(savedMusicLike.getMusicLikeId());
            responseDto.setMessage("좋아요가 생성되었습니다.");
        }

            return responseDto;
    }

    // 음악 좋아요 조회
    public MusicLike findVerifiedMusicLike(long musicLikeId) {
        return musicLikeRepository.findById(musicLikeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MUSIC_LIKE_NOT_FOUND));
    }

    // 특정 회원이 좋아하는 음악 전체 조회
    public Page<MusicLike> findMusicLikesByMember(long memberId, Pageable pageable) {
        Member member = memberService.findVerifiedMember(memberId);
        return musicLikeRepository.findAllByMember(member, pageable);
    }

    // 현재 접속한 유저가 해당 음악 좋아요를 생성한 유저인지, 혹은 admin인지 분류하여 예외 발생
    private void validateMusicLikeAuthorOrAdmin(long memberId, MusicLike musicLike) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (!findMember.getMemberId().equals(musicLike.getMember().getMemberId()) && !findMember.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_MUSIC_LIKE);
        }
    }
}

