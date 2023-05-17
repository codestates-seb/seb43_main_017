package com.codestates.mainProject.playListLike.controller;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playListLike.dto.LikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.mapper.PlayListLikeMapper;
import com.codestates.mainProject.playListLike.service.PlayListLikeService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/playlists")
public class PlayListLikeController {
    private final PlayListLikeService playListLikeService;
    private final PlayListLikeMapper playListLikeMapper;

    // 좋아요 누르기
    @PostMapping("/{playlist-id}/like")
    public ResponseEntity<LikeDto> addLike(@LoginMemberId Long memberId,
                                           @PathVariable("playlist-id") Long playListId) {

        List<PlayListLike> isAlreadyLiked = playListLikeService.isAlreadyLiked(memberId);
        if (isAlreadyLiked.isEmpty()) {
            PlayListLike like = playListLikeService.addLike(memberId, playListId);
            LikeDto responseDto = playListLikeMapper.playListLikeToResponse(like);

            // 플레이리스트의 likeCount 증가
            PlayListDto.ResponseDto playListResponseDto = playListLikeService.increaseLikeCount(playListId);

            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

    }

    // 좋아요 삭제
    @DeleteMapping("/{playlist-id}/like")
    public ResponseEntity<Void> cancelLike(@LoginMemberId Long memberId,
                                           @PathVariable("playlist-id") Long playListId) {

        List<PlayListLike> isAlreadyLiked = playListLikeService.isAlreadyLiked(memberId);
        if (isAlreadyLiked.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            playListLikeService.cancelLike(memberId, playListId);

            // 플레이리스트의 likeCount 감소
            PlayListDto.ResponseDto updatedPlayList = playListLikeService.declineLikeCount(playListId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // 특정 좋아요 조회
    @GetMapping("/likes/{like-id}")
    public ResponseEntity<PlayListLike> getLike(@PathVariable("like-id") Long likeId) {
        PlayListLike like = playListLikeService.getLike(likeId);
        return new ResponseEntity<>(like, HttpStatus.OK);
    }

    // {playlist-id} 좋아요 전체 조회
    @GetMapping("/{playlist-id}/likes")
    public ResponseEntity<List<LikeDto>> getLikesByPlayListId(@PathVariable("playlist-id") Long playListId) {
        List<PlayListLike> likes = playListLikeService.getLikesByPlayListId(playListId);
        List<LikeDto> responseDtoList = playListLikeMapper.playListLikesToResponses(likes);
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
}
