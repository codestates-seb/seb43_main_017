package com.codestates.mainProject.musicLike.repository;


import com.codestates.mainProject.musicLike.entity.MusicLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicLikeRepository extends JpaRepository<MusicLike, Long> {
}