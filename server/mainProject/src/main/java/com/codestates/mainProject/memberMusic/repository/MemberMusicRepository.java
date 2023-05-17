package com.codestates.mainProject.memberMusic.repository;

import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberMusicRepository extends JpaRepository<MemberMusic, Long> {
    Optional<MemberMusic> findByMemberMemberIdAndMusicMusicId(Long memberId, Long musicId);
}