package com.codestates.mainProject.playList.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PlayListService {

    private final PlayListRepository playListRepository;
    private final MemberRepository memberRepository;

    public PlayListService(PlayListRepository playListRepository,
                           MemberRepository memberRepository) {
        this.playListRepository = playListRepository;
        this.memberRepository = memberRepository;
    }

    public PlayList createPlayList(PlayList playList) {
        playList.getMember().addPlayList(playList);
        return playListRepository.save(playList);
    }

    public PlayList findPlayList(long playListId){
        return findVerifiedPlayList(playListId);
    }

    Page<PlayList> findPlayLists(int page, int size){
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

    public void deletePlayList(long playListId){
        PlayList findPlayList = findVerifiedPlayList(playListId);
        playListRepository.delete(findPlayList);
    }

    public PlayList findVerifiedPlayList(long playListId) {
        Optional<PlayList> optionalPlayList = playListRepository.findById(playListId);
        PlayList findPlayList = optionalPlayList.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));

        return findPlayList;
    }

}
