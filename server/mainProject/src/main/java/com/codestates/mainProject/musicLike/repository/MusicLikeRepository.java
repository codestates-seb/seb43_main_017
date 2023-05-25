package com.codestates.mainProject.musicLike.repository;


import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicLikeRepository extends JpaRepository<MusicLike, Long> {
    Page<MusicLike> findAllByMember(Member member, Pageable pageable);
}