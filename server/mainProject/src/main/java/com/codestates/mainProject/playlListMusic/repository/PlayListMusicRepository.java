package com.codestates.mainProject.playlListMusic.repository;


import com.codestates.mainProject.playlListMusic.entity.PlayListMusic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayListMusicRepository extends JpaRepository<PlayListMusic, Long> {

    Optional<PlayListMusic> findByPlayListPlayListIdAndMusicMusicId(Long playListId, Long musicId);
}