package com.codestates.mainProject.musicTag.controller;

import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.musicTag.dto.MusicTagDto;
import com.codestates.mainProject.musicTag.service.MusicTagService;
import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/tags")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MusicTagController {

    private final MusicTagService musicTagService;

    @PostMapping("/{tag-id}/musics/{music-id}")
    public ResponseEntity postMusicTag(@PathVariable("tag-id") long tagId,
                                       @PathVariable("music-id") long musicId,
                                       @LoginMemberId Long loginId) {

        musicTagService.createMusicTag(tagId,loginId,musicId);

        return ResponseEntity.ok("MusicTag created successfully");
    }

    @GetMapping("/musics/{music-id}")
    public ResponseEntity getMusics(@PathVariable("music-id") long musicId){

        List<MusicTagDto> response = musicTagService.getMusicTags(musicId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping("/musics/{music-id}")
    public ResponseEntity deleteAllMusicTag(@PathVariable("music-id") long musicId,
                                            @LoginMemberId Long loginId){
        musicTagService.deleteMusicTagAll(loginId,musicId);

        return ResponseEntity.ok("Music의 MusicTag가 모두 삭제되었습니다.");
    }

    @DeleteMapping("/{tag-id}/musics/{music-id}")
    public ResponseEntity deleteMusicTag(@PathVariable("tag-id") long tagId,
                                         @PathVariable("music-id") long musicId,
                                         @LoginMemberId Long loginId){

        String tagName = musicTagService.findVerifiedMusicTag(tagId, musicId).getName();

        musicTagService.deleteMusicTag(tagId,loginId,musicId);


        return ResponseEntity.ok("Music의 " +tagName+" 태그가 삭제되었습니다.");
    }




}
