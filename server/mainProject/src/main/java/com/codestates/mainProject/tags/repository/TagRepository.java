package com.codestates.mainProject.tags.repository;

import com.codestates.mainProject.tags.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByCategory(String category);
}
