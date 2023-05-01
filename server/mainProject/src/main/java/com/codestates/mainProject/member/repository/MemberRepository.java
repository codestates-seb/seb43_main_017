package com.codestates.mainProject.member.repository;

import com.codestates.mainProject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
