package com.codestates.mainProject.music.controller;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.music.service.MusicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/musics")
public class MusicController {
    private MusicService musicService;
    private MemberRepository memberRepository;

    public MusicController(MusicService musicService, MemberRepository memberRepository) {
        this.musicService = musicService;
        this.memberRepository = memberRepository;
    }

    // 음악 삭제
    @DeleteMapping("/{musicID}")
    public ResponseEntity<Void> deleteMusic(@PathVariable long musicId,
                                            @AuthenticationPrincipal UserDetails userDetails) {
                // MemberRepository를 사용하여 userDetails로부터 email을 기반으로 사용자 ID를 가져옴
        Member member = memberRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        long currentUserId = member.getMemberId();

        musicService.deleteMusic(musicId, currentUserId);

        // mapper 활용해서 아래 수정 필요함
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
