package com.codestates.mainProject.playListLike.controller;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playListLike.service.PlayListLikeService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PlayListLikeApiController {
    private final PlayListLikeService playListLikeService;

    // 좋아요 등록
    @PostMapping("/playlist/{playlist-id}/like")
    public ResponseEntity<String> addLike(@LoginMemberId Member memberId,
                                          @PathVariable long playListId){
        boolean result = false;

        if (Objects.nonNull(memberId)) result = playListLikeService.addLike(memberId,playListId);

        return result ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 좋아요 취소
    @DeleteMapping("/playlist/{playlist-id}/like")
    public ResponseEntity<String> cancelLike(@LoginMemberId Member memberId,
                                             @PathVariable long playListId){
        if (memberId != null) playListLikeService.cancelLike(memberId, playListId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 좋아요 카운트
    @GetMapping("/playlist/{playlist-id}/like")
    public ResponseEntity<List<String>> getLikeCount(@PathVariable long playListId,
                                                     @LoginMemberId Member memberId){
        log.info("playlist-id : {} ", playListId);
        log.info("loginMember : {} ", memberId);

        List<String> resultData = playListLikeService.count(playListId, memberId);

        log.info("likeCount : {} ", resultData);

        return new ResponseEntity<>(resultData, HttpStatus.OK);
    }
}
