package com.codestates.mainProject.playListTag.repository;

import com.codestates.mainProject.playListTag.entity.PlayListTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayListTagRepository extends JpaRepository<PlayListTag, Long> {
    Optional<PlayListTag> findByTagTagIdAndPlayListPlayListId(Long tagId, Long playListId);
}
