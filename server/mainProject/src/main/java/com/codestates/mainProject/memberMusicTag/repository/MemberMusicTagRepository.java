package com.codestates.mainProject.memberMusicTag.repository;


import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.memberMusicTag.entity.MemberMusicTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MemberMusicTagRepository extends JpaRepository<MemberMusicTag, Long> {

    Optional<MemberMusicTag> findByMemberMemberIdAndMusicTagMusicTagId(long memberId, long musicTagId);

}