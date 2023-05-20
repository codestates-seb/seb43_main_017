package com.codestates.mainProject.search.controller;

import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@Validated
@Slf4j
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    // musicName, artistName, albumName 중 검색어를 포함하는 music을 조회
    @GetMapping("/musics/search-by-keyword")
    public ResponseEntity<List<MusicDto.ResponseDto>> findMusicByKeyword(@RequestParam String keyword) {
        List<MusicDto.ResponseDto> musics = searchService.findMusicByKeyword(keyword);

        return ResponseEntity.ok(musics);
    }

    @GetMapping("/musics/search-by-tags")
    public ResponseEntity<List<MusicDto.ResponseDto>> getMusicByTags(@RequestParam List<String> tags) {
        List<MusicDto.ResponseDto> musics = searchService.findMusicByTags(tags);

        return ResponseEntity.ok(musics);
    }
}
