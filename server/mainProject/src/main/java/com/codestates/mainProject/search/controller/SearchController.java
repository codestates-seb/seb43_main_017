package com.codestates.mainProject.search.controller;

import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.search.service.SearchService;
import com.codestates.mainProject.utils.PageConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@Validated
@Slf4j
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;
    private final PageConverter pageConverter;

    // musicName, artistName, albumName 중 검색어를 포함하는 music을 조회
    @GetMapping("/musics/search-by-keyword")
    public ResponseEntity<PageConverter.PageInfo<MusicDto.ResponseDto>> findMusicByKeyword(@RequestParam String keyword,
                                                                                           @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                                           @Positive @RequestParam(value = "size", defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<MusicDto.ResponseDto> musics = searchService.findMusicByKeyword(keyword, pageRequest);

        return ResponseEntity.ok(pageConverter.toPageInfo(musics));
    }


    // playListName 이 검색어와 일치하는 playList를 조회
    @GetMapping("/playlists/search-by-title")
    public ResponseEntity<PageConverter.PageInfo<PlayListDto.ResponseDto>> findPlayListByTitle(@RequestParam String title,
                                                                             @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                             @Positive @RequestParam(value = "size", defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<PlayListDto.ResponseDto> playlists = searchService.findPlayListByTitle(title, pageRequest);

        return ResponseEntity.ok(pageConverter.toPageInfo(playlists));
    }


    // 사용자 선택한 태그를 가진 music을 조회
    @GetMapping("/musics/search-by-tags")
    public ResponseEntity<PageConverter.PageInfo<MusicDto.ResponseDto>> getMusicByTags(@RequestParam List<String> tags,
                                                                     @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                     @Positive @RequestParam(value = "size", defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<MusicDto.ResponseDto> musics = searchService.findMusicByTags(tags, pageRequest);

        return ResponseEntity.ok(pageConverter.toPageInfo(musics));
    }
}
