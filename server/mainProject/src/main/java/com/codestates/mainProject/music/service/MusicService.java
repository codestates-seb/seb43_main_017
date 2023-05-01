package com.codestates.mainProject.music.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MusicService {

    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    public Music findVerifiedMusic(long musicId) {
        Optional<Music> optionalMusic = musicRepository.findById(musicId);
        Music findMusic = optionalMusic.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MUSIC_NOT_FOUND));

        return findMusic;
    }
}
