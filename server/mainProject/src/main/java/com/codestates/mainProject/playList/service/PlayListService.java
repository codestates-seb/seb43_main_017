package com.codestates.mainProject.playList.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PlayListService {

    private final PlayListRepository playListRepository;

    public PlayListService(PlayListRepository playListRepository) {
        this.playListRepository = playListRepository;
    }

    public PlayList createPlayList(PlayListDto.PostDto postDto) {
        PlayList playList = new PlayList();

        Member member = new Member();
        member.setMemberId(postDto.getMemberId());
        playList.setMember(member);

        Music music = new Music();
        music.setMusicId(postDto.getMusicId());
        playList.setMusic(music);

        playList.setTitle(postDto.getTitle());
        playList.setBody(postDto.getBody());

        return playListRepository.save(playList);
    }


    public PlayList findVerifiedPlayList(long playListId) {
        Optional<PlayList> optionalPlayList = playListRepository.findById(playListId);
        PlayList findPlayList = optionalPlayList.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));

        return findPlayList;
    }

}
