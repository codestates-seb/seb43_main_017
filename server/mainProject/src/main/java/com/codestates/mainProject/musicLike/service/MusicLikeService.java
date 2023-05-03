package com.codestates.mainProject.musicLike.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.musicLike.repository.MusicLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MusicLikeService {

    private final MusicLikeRepository musicLikeRepository;

    public MusicLikeService(MusicLikeRepository musicLikeRepository) {
        this.musicLikeRepository = musicLikeRepository;
    }

    public MusicLike findVerifiedMusic(long musicLikeId) {
        Optional<MusicLike> optionalMusicLike = musicLikeRepository.findById(musicLikeId);
        MusicLike findMusicLike = optionalMusicLike.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MUSIC_LIKE_NOT_FOUND));

        return findMusicLike;
    }
}
