package com.codestates.mainProject.playListLike.repository;


import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayListLikeRepository extends JpaRepository<PlayListLike, Long> {
    Optional<PlayListLike> findByMemberAndPlayList(Member member, PlayList playList);
}
