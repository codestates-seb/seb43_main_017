package com.codestates.mainProject.playListComment.controller;

import com.codestates.mainProject.playListComment.entity.PlayListComment;
import com.codestates.mainProject.playListComment.service.CommentService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/playlist-comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<PlayListComment> createComment(@LoginMemberId Long memberId,
                                                         @PathVariable("playlist-id") Long playListId,
                                                         @RequestBody String content) {
        PlayListComment comment = commentService.createComment(memberId, playListId, content);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    //{playlist-id} 댓글 전체 조회
    @GetMapping("/{comment-id}")
    public ResponseEntity<List<PlayListComment>> getCommentsByPlayListId(@PathVariable("playlist-id") Long playListId){
        List<PlayListComment> comments = commentService.getCommentsByPlaylistId(playListId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity<PlayListComment> updateComment(@LoginMemberId Long memberId,
                                                         @PathVariable("comment-id") Long commentId,
                                                         @RequestBody String content) {
        PlayListComment updatedComment = commentService.updateComment(memberId, commentId, content);
        return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    }

    //삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Void> deleteComment(@LoginMemberId Long memberId,
                                              @PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(memberId, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
