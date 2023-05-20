package com.codestates.mainProject.musicTag.repository;

import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.musicTag.entity.MusicTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MusicTagRepository extends JpaRepository<MusicTag, Long> {
    Optional<List<MusicTag>> findByMusicMusicId(Long musicId);

    Optional<MusicTag> findByTagTagIdAndMusicMusicId(Long tagId, Long musicId);

    Optional<List<MusicTag>> findByTagTagIdOrderByMusicMusicLikeCountDesc(Long tagId);
}