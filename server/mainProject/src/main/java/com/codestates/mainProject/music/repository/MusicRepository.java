package com.codestates.mainProject.music.repository;


import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Long> {
    Optional<Music> findByMusicUri(String musicUri);

    // musicName, artistName, albumName 중 검색어를 포함하는 music을 조회
    @Query("SELECT m FROM Music m WHERE m.musicName LIKE %:keyword% OR m.artistName LIKE %:keyword% OR m.albumName LIKE %:keyword%")
    Page<MusicDto.ResponseDto> findMusicByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<Music> findTop6ByOrderByMusicLikeCountDesc();

    List<Music> findAllByOrderByCreatedAtDesc();
}