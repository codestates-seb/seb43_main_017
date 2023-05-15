package com.codestates.mainProject.playList.repository;


import com.codestates.mainProject.playList.entity.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayListRepository extends JpaRepository<PlayList, Long> {
}