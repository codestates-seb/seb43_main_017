package com.codestates.mainProject.music.repository;


import com.codestates.mainProject.music.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long> {
}