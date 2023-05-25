package com.codestates.mainProject.musicLike.controller;

import com.codestates.mainProject.musicLike.dto.MusicLikeDto;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.musicLike.mapper.MusicLikeMapper;
import com.codestates.mainProject.musicLike.service.MusicLikeService;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/music-like")
@RequiredArgsConstructor
public class MusicLikeController {
    private final MusicLikeService musicLikeService;
    private final MusicLikeMapper musicLikeMapper;

    // 음악 좋아요 생성/취소
    @PostMapping("/toggle")
    public ResponseEntity<MusicLikeDto.MusicLikeToggleResponseDto> toggleMusicLike(@RequestBody MusicLikeDto.MusicLikePostDto musicLikePostDto,
                                                                                   @LoginMemberId Long memberId) {
        MusicLikeDto.MusicLikeToggleResponseDto responseDto = musicLikeService.toggleMusicLike(memberId, musicLikePostDto.getMusicId());
        if (responseDto.getMusicLikeId() != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
        } else {
            return ResponseEntity.ok(responseDto);
        }
    }

    // 음악 좋아요 개별 조회
    @GetMapping("/{music-like-id}")
    public ResponseEntity<MusicLikeDto.MusicLikeResponseDto> getMusicLike(@PathVariable("music-like-id") Long musicLikeId) {
        MusicLike musicLike = musicLikeService.findVerifiedMusicLike(musicLikeId);
        MusicLikeDto.MusicLikeResponseDto responseDto = musicLikeMapper.entityToResponseDto(musicLike);

        return ResponseEntity.ok(responseDto);
    }

    // memberId를 받아서 해당 member가 좋아요한 모든 음악 조회
    @GetMapping("/members")
    public ResponseEntity<List<MusicLikeDto.MusicLikeResponseDto>> getMusicLikesByMember(@LoginMemberId Long memberId,
                                                                                         Pageable pageable) {
        Page<MusicLike> musicLikes = musicLikeService.findMusicLikesByMember(memberId, pageable);
        List<MusicLikeDto.MusicLikeResponseDto> responseDtoList = musicLikes.getContent()
                .stream()
                .map(musicLikeMapper::entityToResponseDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtoList);
    }
}



