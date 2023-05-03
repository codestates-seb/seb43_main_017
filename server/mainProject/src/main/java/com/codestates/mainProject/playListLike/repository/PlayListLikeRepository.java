package com.codestates.mainProject.playListLike.repository;


import com.codestates.mainProject.playListLike.entity.PlayListLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayListLikeRepository extends JpaRepository<PlayListLike, Long> {
}
