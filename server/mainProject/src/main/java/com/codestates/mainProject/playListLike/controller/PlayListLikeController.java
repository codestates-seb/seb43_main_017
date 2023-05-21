package com.codestates.mainProject.playListLike.controller;

import com.codestates.mainProject.playListLike.dto.LikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.mapper.PlayListLikeMapper;
import com.codestates.mainProject.playListLike.service.PlayListLikeService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/playlists")
public class PlayListLikeController {
    private final PlayListLikeService playListLikeService;
    private final PlayListLikeMapper playListLikeMapper;

    // 좋아요 누르기 / 취소
    @PostMapping("/{playlist-id}/like")
    public ResponseEntity<LikeDto> addLike(@LoginMemberId Long memberId,
                                           @PathVariable("playlist-id") Long playListId) {

        List<PlayListLike> isAlreadyLiked = playListLikeService.getAllLikesForMemberAndPlayList(memberId, playListId);
        if (isAlreadyLiked.isEmpty()) {
            PlayListLike like = playListLikeService.addLike(memberId, playListId);
            LikeDto responseDto = playListLikeMapper.playListLikeToResponse(like);

            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        } else {
            playListLikeService.cancelLike(memberId, playListId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // 특정 좋아요 조회
    @GetMapping("/likes/{like-id}")
    public ResponseEntity<PlayListLike> getLike(@PathVariable("like-id") Long likeId) {
        PlayListLike like = playListLikeService.getLike(likeId);
        return new ResponseEntity<>(like, HttpStatus.OK);
    }

//    // {playlist-id} 좋아요 전체 조회
//    @GetMapping("/{playlist-id}/likes")
//    public ResponseEntity<List<LikeDto>> getLikesByPlayListId(@PathVariable("playlist-id") Long playListId) {
//        List<PlayListLike> likes = playListLikeService.getLikesByPlayListId(playListId);
//        List<LikeDto> responseDtoList = playListLikeMapper.playListLikesToResponses(likes);
//        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
//    }

    @GetMapping("/members/{member-id}/like")
    public ResponseEntity<List<LikeDto>> getMemberLikes (@PathVariable("member-id") Long memberId,
                                                         Pageable pageable) {
        Page<PlayListLike> playListLikes = playListLikeService.getMemberLikes(memberId, pageable);
        List<LikeDto> response = playListLikes.getContent()
                .stream()
                .map(playListLikeMapper::playListLikeToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
