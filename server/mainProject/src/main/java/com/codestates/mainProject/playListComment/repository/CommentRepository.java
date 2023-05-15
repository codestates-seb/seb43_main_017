package com.codestates.mainProject.playListComment.repository;

import com.codestates.mainProject.playListComment.entity.PlayListComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<PlayListComment, Long> {
    List<PlayListComment> findByPlayListPlayListId(Long playListId);
}
