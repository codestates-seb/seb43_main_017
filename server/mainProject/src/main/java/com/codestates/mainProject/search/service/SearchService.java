package com.codestates.mainProject.search.service;

import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final MusicRepository musicRepository;

    // musicName, artistName, albumName 중 검색어를 포함하는 music을 조회
    public List<Music> findMusicByKeyword(String keyword) {
        return musicRepository.findMusicByKeyword(keyword);
    }

    // 사용자 선택한 태그를 가진 music을 조회
    public List<Music> findMusicByTags(List<String> tags) {
        return null;
    }
}
