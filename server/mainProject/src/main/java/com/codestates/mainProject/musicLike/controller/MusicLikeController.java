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

    // 음악 좋아요 생성
    @PostMapping
    public ResponseEntity<MusicLikeDto.MusicLikeResponseDto> createMusicLike(@RequestBody MusicLikeDto.MusicLikePostDto musicLikePostDto,
                                                                             @LoginMemberId Long memberId) {
        MusicLike createdMusicLike = musicLikeService.createMusicLike(memberId, musicLikePostDto.getMusicId());
        MusicLikeDto.MusicLikeResponseDto responseDto = musicLikeMapper.entityToResponseDto(createdMusicLike);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    // 음악 좋아요 취소(삭제)
    @DeleteMapping("/{music-like-id}")
    public ResponseEntity<Void> deleteMusicLike(@PathVariable("music-like-id") long musicLikeId,
                                                @LoginMemberId Long memberId) {
        musicLikeService.deleteMusicLike(musicLikeId, memberId);

        return ResponseEntity.noContent().build();
    }

    // 음악 좋아요 개별 조회
    @GetMapping("/{music-like-id}")
    public ResponseEntity<MusicLikeDto.MusicLikeResponseDto> getMusicLike(@PathVariable("music-like-id") Long musicLikeId) {
        MusicLike musicLike = musicLikeService.findVerifiedMusicLike(musicLikeId);
        MusicLikeDto.MusicLikeResponseDto responseDto = musicLikeMapper.entityToResponseDto(musicLike);

        return ResponseEntity.ok(responseDto);
    }

    // memberId를 받아서 해당 member가 좋아요한 모든 음악 조회
    @GetMapping("/members/{member-id}")
    public ResponseEntity<List<MusicLikeDto.MusicLikeResponseDto>> getMusicLikesByMember(@PathVariable("member-id") Long memberId,
                                                                                         Pageable pageable) {
        Page<MusicLike> musicLikes = musicLikeService.findMusicLikesByMember(memberId, pageable);
        List<MusicLikeDto.MusicLikeResponseDto> responseDtoList = musicLikes.getContent()
                .stream()
                .map(musicLikeMapper::entityToResponseDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtoList);
    }
}



