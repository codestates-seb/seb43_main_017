package com.codestates.mainProject.playlListMusic.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.playlListMusic.entity.PlayListMusic;
import com.codestates.mainProject.playlListMusic.repository.PlayListMusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PlayListMusicService {

    private final MusicService musicService;

    private final PlayListMusicRepository playListMusicRepository;

    public PlayListMusic createPlayListMusic(PlayListService playListService,long playListId , long musicId) {
        verifyExistPlayListMusic(playListId,musicId);
        PlayList findPlayList = playListService.findVerifiedPlayList(playListId);
        Music findMusic = musicService.findMusicById(musicId);

        PlayListMusic playListMusic = new PlayListMusic();
        playListMusic.setPlayList(findPlayList);
        playListMusic.setMusic(findMusic);

        return playListMusicRepository.save(playListMusic);
    }

    public void deleteMemberMusic(long playListId, long musicId ){
        PlayListMusic findPlayListMusic =findVerifiedPlayListMusic(playListId, musicId);

        playListMusicRepository.delete(findPlayListMusic);

    }

    public PlayListMusic findVerifiedPlayListMusic(long playListId, long musicId) {
        Optional<PlayListMusic> optionalPlayListMusic = playListMusicRepository.findByPlayListPlayListIdAndMusicMusicId(playListId, musicId);
        PlayListMusic findPlayListMusic = optionalPlayListMusic.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_MUSIC_NOT_FOUND));

        return findPlayListMusic;
    }

    public void verifyExistPlayListMusic(long playListId, long musicId) {
        Optional<PlayListMusic> optionalPlayListMusic = playListMusicRepository.findByPlayListPlayListIdAndMusicMusicId(playListId,musicId);
        if (optionalPlayListMusic.isPresent())
            throw new BusinessLogicException(ExceptionCode.PLAYLIST_MUSIC_EXISTS);
    }
}