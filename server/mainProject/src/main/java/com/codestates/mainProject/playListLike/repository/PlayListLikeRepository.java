package com.codestates.mainProject.playListLike.repository;


import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface PlayListLikeRepository extends JpaRepository<PlayListLike, Long> {
    List<PlayListLike> findByPlayListPlayListId(Long playListId);
    List<PlayListLike> findByMemberMemberIdAndPlayListPlayListId(Long memberId, Long playListId);
}
