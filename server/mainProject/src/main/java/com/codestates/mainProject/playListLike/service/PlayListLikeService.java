package com.codestates.mainProject.playListLike.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.repository.PlayListLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PlayListLikeService {

    private final PlayListLikeRepository playListLikeRepository;

    public PlayListLikeService(PlayListLikeRepository playListLikeRepository) {
        this.playListLikeRepository = playListLikeRepository;
    }

//    public PlayListLike findVerifiedPlayListLike(long playListLikeId) {
//        Optional<PlayListLike> optionalPlayListLike = playListLikeRepository.findById(playListLikeId);
//        PlayListLike findPlayListLike = optionalPlayListLike.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.PlAYLIST_LIKE_NOT_FOUND));
//
//        return findPlayListLike;
//    }
}
