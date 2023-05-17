package com.codestates.mainProject.music.repository;


import com.codestates.mainProject.music.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Long> {
    Optional<Music> findByMusicUri(String musicUri);

    // musicName, artistName, albumName 중 검색어를 포함하는 music을 조회
//    List<Music> findByMusic_musicNameContainingOrMusic_artistNameContainingOrMusic_albumNameContaining(String musicName, String artistName, String albumName);
}