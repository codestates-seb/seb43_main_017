package com.codestates.mainProject.musicComment.controller;

import com.codestates.mainProject.musicComment.dto.MusicCommentDto;
import com.codestates.mainProject.musicComment.entity.MusicComment;
import com.codestates.mainProject.musicComment.mapper.MusicCommentMapper;
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
    private final MusicCommentMapper musicCommentMapper;

    // 댓글 생성
    @PostMapping("/musics/{music-id}")
    public ResponseEntity<MusicCommentDto> createComment(@LoginMemberId Long memberId,
                                                         @PathVariable("music-id") long musicId,
                                                         @RequestBody MusicCommentDto.PostDto postDto) {
        MusicComment comment = musicCommentService.createComment(memberId, musicId, postDto.getContent());
        MusicCommentDto commentDto = musicCommentMapper.commentToResponse(comment);

        return new ResponseEntity<>(commentDto, HttpStatus.CREATED);
    }

    // 특정 음악의 댓글 전체 조회
    @GetMapping("/musics/{music-id}")
    public ResponseEntity<List<MusicCommentDto>> getCommentsByMusicId(@PathVariable("music-id") long musicId) {
        List<MusicComment> comments = musicCommentService.getCommentsByMusicId(musicId);
        List<MusicCommentDto> commentDtos = musicCommentMapper.commentsToResponses(comments);

        return new ResponseEntity<>(commentDtos, HttpStatus.OK);
    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity<MusicCommentDto> updateComment(@LoginMemberId Long memberId,
                                                         @PathVariable("comment-id") long commentId,
                                                         @RequestBody MusicCommentDto.PatchDto patchDto) {
        MusicComment updatedComment = musicCommentService.updateComment(memberId, commentId, patchDto.getContent());
        MusicCommentDto updatedCommentDto = musicCommentMapper.commentToResponse(updatedComment);

        return new ResponseEntity<>(updatedCommentDto, HttpStatus.OK);
    }

    // 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Void> deleteComment(@LoginMemberId Long memberId,
                                              @PathVariable("comment-id") long commentId) {
        musicCommentService.deleteComment(memberId, commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

