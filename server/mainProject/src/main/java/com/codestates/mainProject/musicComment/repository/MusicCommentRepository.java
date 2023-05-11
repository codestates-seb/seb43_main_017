package com.codestates.mainProject.musicComment.repository;

import com.codestates.mainProject.musicComment.entity.MusicComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicCommentRepository extends JpaRepository<MusicComment, Long> {
    List<MusicComment> findByMusicId(Long musicId);
}
