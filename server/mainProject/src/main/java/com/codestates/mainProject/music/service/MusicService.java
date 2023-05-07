package com.codestates.mainProject.music.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MusicService {

    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    // Music 생성(등록)
    public Music createMusic(Music music) {
        verifyExistMusicUri(music.getMusicUri());

        // music 에 맞는 태그를 생성하거나 지정해줘야함

        Music savedMusic = musicRepository.save(music);

        return savedMusic;
    }

    // Music 수정
    public Music updateMusic(Music music) {
        Music findMusic = findVerifiedMusic(music.getMusicId());

        Optional.ofNullable(music.getArtistName())
                .ifPresent(name -> findMusic.setArtistName(name));
        Optional.ofNullable(music.getAlbumName())
                .ifPresent(name -> findMusic.setAlbumName(name));
        Optional.ofNullable(music.getMusicTime())
                .ifPresent(time -> findMusic.setMusicTime(time));

        return findMusic;
    }

    // musicId 로 Music 조회
    public Music findMusicById(long musicId) {
        return findVerifiedMusic(musicId);
    }

    // Music 전체 조회
    public Page<Music> findAllMusic(int page, int size) {
        return musicRepository.findAll(PageRequest.of(page, size,
                Sort.by("musicId").descending()));
    }

    // Music 삭제
    public void deleteMusic(long musicId) {
        findVerifiedMusic(musicId);

        musicRepository.deleteById(musicId);
    }

    // 유효한 musicId 인지 조회
    private Music findVerifiedMusic(long musicId) {
        Optional<Music> optionalMusic = musicRepository.findById(musicId);
        Music findMusic = optionalMusic.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MUSIC_NOT_FOUND));

        return findMusic;
    }

    // 이미 등록된 musicUri 인지 조회
    private void verifyExistMusicUri(String musicUri) {
        Optional<Music> optionalMusic = musicRepository.findByMusicUri(musicUri);
        if(optionalMusic.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MUSIC_EXISTS);
        }
    }
}
