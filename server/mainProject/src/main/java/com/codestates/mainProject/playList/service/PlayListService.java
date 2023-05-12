package com.codestates.mainProject.playList.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlayListService {

    private final PlayListRepository playListRepository;
    private final MemberRepository memberRepository;
    private final MusicService musicService;

    public PlayListService(PlayListRepository playListRepository,
                           MemberRepository memberRepository, MusicService musicService) {
        this.playListRepository = playListRepository;
        this.memberRepository = memberRepository;
        this.musicService = musicService;
    }

    public PlayList createPlayList(PlayList playList) {
        playList.getMember().addPlayList(playList);
        return playListRepository.save(playList);
    }

    public PlayList findPlayList(long playListId){
        return findVerifiedPlayList(playListId);
    }

    public Page<PlayList> findPlayLists(int page, int size){
        // 모든 플리 조회 기능
        return playListRepository.findAll(PageRequest.of(
                page, size, Sort.by("playListId").descending()));

        //TODO: 각 맴버가 가진 플레이리스트 조회기능 만들기
    }

    public PlayList updatePlayList(PlayList playList){
        PlayList findPlayList = findVerifiedPlayList(playList.getPlayListId());
        Optional.ofNullable(playList.getTitle()).ifPresent(findPlayList::setTitle);
        Optional.ofNullable(playList.getBody()).ifPresent(findPlayList::setBody);
        return playListRepository.save(findPlayList);
    }

    public void deletePlayList(long playListId, long currentUserId){
        //TODO: 어드민, 유저 구분해서 삭제 기능
        PlayList findPlayList = findVerifiedPlayList(playListId);
        playListRepository.delete(findPlayList);
    }

    // 플리 안에 있는 음악 하나 삭제
    public void deleteMusicFromPlayList(long playListId, long musicId){
        PlayList playList = findVerifiedPlayList(playListId);

        //TODO: 인증된 사용자 정보 가져오기

        List<Music> musics = playList.getMusics();
        // 음악 찾고 삭제
        Optional<Music> optionalMusic = musics.stream()
                .filter(music -> music.getMusicId().equals(musicId))
                .findFirst();
        if (optionalMusic.isPresent()) {
            Music musicToRemove = optionalMusic.get();
            musics.remove(musicToRemove);
            playListRepository.save(playList);
        } else throw new BusinessLogicException(ExceptionCode.MUSIC_NOT_FOUND);
    }

    // 만들어진 플리에 음악 추가
    public void addMusicToPlayList(long playListId, long musicId){
        PlayList playList = findVerifiedPlayList(playListId);
        Music music = musicService.findMusicById(musicId);

        List<Music> musics = playList.getMusics();
        musics.add(music);

        playListRepository.save(playList);
    }

    public PlayList findVerifiedPlayList(long playListId) {
        Optional<PlayList> optionalPlayList = playListRepository.findById(playListId);
        PlayList findPlayList = optionalPlayList.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));

        return findPlayList;
    }

    // 플리 안에 있는 음악 조회
    public List<Music> findVerifiedPlayListMusic(long playListId) {
        PlayList playList = findVerifiedPlayList(playListId);
        return playList.getMusics();
    }

}
