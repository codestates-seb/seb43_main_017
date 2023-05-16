package com.codestates.mainProject.musicComment.controller;

import com.codestates.mainProject.musicComment.entity.MusicComment;
import com.codestates.mainProject.musicComment.service.MusicCommentService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/music-comments")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MusicCommentController {
    private final static String MUSIC_DEFAULT_URL = "/music-comments";
    private final MusicCommentService musicCommentService;

    // 댓글 생성
    @PostMapping("/music-id")
    public ResponseEntity<MusicComment> createComment(@LoginMemberId Long memberId,
                                                      @PathVariable("music-id") long musicId,
                                                      @RequestBody String content) {
        MusicComment comment = musicCommentService.createComment(memberId, musicId, content);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    // 특정 음악의 댓글 전체 조회
    @GetMapping("/{music-id}")
    public ResponseEntity<List<MusicComment>> getCommentsByMusicId(@PathVariable long musicId) {
        List<MusicComment> comments = musicCommentService.getCommentsByMusicId(musicId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity<MusicComment> updateComment(@LoginMemberId Long memberId,
                                                      @PathVariable("comment-id") long commentId,
                                                      @RequestBody String content) {
        MusicComment updatedComment = musicCommentService.updateComment(memberId, commentId, content);
        return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    }

    // 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Void> deleteComment(@LoginMemberId Long memberId,
                                              @PathVariable("comment-id") long commentId) {
        musicCommentService.deleteComment(memberId, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

