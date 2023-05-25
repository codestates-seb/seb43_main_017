package com.codestates.mainProject.playListComment.controller;

import com.codestates.mainProject.playListComment.dto.CommentDto;
import com.codestates.mainProject.playListComment.entity.PlayListComment;
import com.codestates.mainProject.playListComment.mapper.CommentMapper;
import com.codestates.mainProject.playListComment.service.CommentService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/playlist-comments")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    @PostMapping("/{playlist-id}")
    public ResponseEntity<CommentDto.ResponseDto> createComment(@LoginMemberId Long memberId,
                                                                @PathVariable("playlist-id") Long playListId,
                                                                @Valid @RequestBody CommentDto.PostDto content) {
        String postComment = content.getContent();

        PlayListComment comment = commentService.createComment(memberId, playListId, postComment);
        CommentDto.ResponseDto responseDto = commentMapper.playListCommentToResponse(comment);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    //{playlist-id} 댓글 전체 조회
    @GetMapping("/{playlist-id}")
    public ResponseEntity<List<CommentDto.ResponseDto>> getCommentsByPlayListId(@PathVariable("playlist-id") Long playListId){
        List<PlayListComment> comments = commentService.getCommentsByPlaylistId(playListId);
        List<CommentDto.ResponseDto> responseDtoList = commentMapper.playListCommentsToResponses(comments);
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

    // 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity<CommentDto.ResponseDto> updateComment(@LoginMemberId Long memberId,
                                                         @PathVariable("comment-id") Long commentId,
                                                         @Valid @RequestBody CommentDto.PostDto content) {
        String patchComment = content.getContent();

        PlayListComment updatedComment = commentService.updateComment(memberId, commentId, patchComment);
        CommentDto.ResponseDto responseDto = commentMapper.playListCommentToResponse(updatedComment);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Void> deleteComment(@LoginMemberId Long memberId,
                                              @PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(memberId, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}