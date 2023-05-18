package com.codestates.mainProject.musicLike.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.memberMusic.service.MemberMusicService;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.musicLike.repository.MusicLikeRepository;
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
    private final MemberService memberService;
    private final MusicService musicService;
    private final MemberRepository memberRepository;
    private final MemberMusicService memberMusicService;

    // 음악 좋아요 생성
    public MusicLike createMusicLike(long memberId, long musicId) {
        MemberMusic memberMusic =memberMusicService.createMemberMusic(memberId, musicId);
        Member member = memberMusic.getMember();
        Music music = memberMusic.getMusic();


        MusicLike musicLike = new MusicLike(member, music);
        music.addMusicLike(musicLike);
        return musicLikeRepository.save(musicLike);
    }

//     음악 좋아요 취소(삭제)
    public void deleteMusicLike(long musicLikeId, Long memberId) {


        MusicLike musicLike = findVerifiedMusicLike(musicLikeId);
        Music music = musicLike.getMusic();
        long musicId =music.getMusicId();


        List<MusicLike> musicLikes = musicLike.getMusic().getMusicLikes();

        Optional<MusicLike> optionalMusicLike = musicLikes.stream()
                .filter(musiclike -> musiclike.getMember().getMemberId().equals(memberId))
                .findFirst();
        if(optionalMusicLike.isPresent()){
            music.removeMusicLike(optionalMusicLike.orElse(null));

            memberMusicService.deleteMemberMusic(memberId,musicId);
        }

        validateMusicLikeAuthorOrAdmin(memberId, musicLike);

        musicLikeRepository.delete(musicLike);
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

