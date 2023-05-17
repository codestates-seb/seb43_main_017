package com.codestates.mainProject.playList.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import com.codestates.mainProject.playlListMusic.entity.PlayListMusic;
import com.codestates.mainProject.playlListMusic.service.PlayListMusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlayListService {
    private static final Logger logger = LoggerFactory.getLogger(PlayListService.class);

    private final PlayListRepository playListRepository;
    private final MemberService memberService;
    private final PlayListMusicService playListMusicService;

    public PlayList createPlayList(PlayList playList) {
        try {
            long memberId = playList.getMember().getMemberId();
            Member findMember = memberService.findVerifiedMember(memberId);
            playList.setCreateMember(findMember.getName());

            findMember.addPlayList(playList);

            return playListRepository.save(playList);
        } catch (Exception e){
            // 예외를 로그에 기록
            logger.error("!!!!!!!!!플레이리스트를 만드는 동안 오류 발생 끄아악!!!!!!!!!!!", e);
            // 예외를 다시 던져서 상위로 전파하거나 적절한 응답을 반환할 수 있습니다.
            throw new RuntimeException("플레이리스트 못만들어따!!! 살려줘!!!!!!", e);
        }
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

    public PlayList updatePlayList(Long playListId, Long memberId, PlayListDto.PatchDto requestBody){
        PlayList findPlayList = findVerifiedPlayList(playListId);
        Member findMember = memberService.findMember(memberId);

        if (!findPlayList.getMember().getMemberId().equals(findMember.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        } else {
            if (requestBody.getTitle() != null) {
                findPlayList.setTitle(requestBody.getTitle());
            }
            if (requestBody.getBody() != null) {
                findPlayList.setBody(requestBody.getBody());
            }
        }

        return findPlayList;
    }

    public void deletePlayList(long playListId, long memberId){
        PlayList playList = findPlayList(playListId);
        Member member = memberService.findMember(memberId);

        if (!member.getMemberId().equals(playList.getMember().getMemberId()) || !member.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }
        playListRepository.delete(playList);
    }

    // 플리 안에 있는 음악 하나 삭제
    public void deleteMusicFromPlayList(long playListId, long musicId){

        PlayListMusic playListMusic = playListMusicService.findVerifiedPlayListMusic(playListId, musicId);
        Music findMusic = playListMusic.getMusic();
        PlayList findPlayList = playListMusic.getPlayList();


        //TODO: 인증된 사용자 정보 가져오기

        List<Music> musics = findPlayList.getMusics();
        // 음악 찾고 삭제
        Optional<Music> optionalMusic = musics.stream()
                .filter(music -> music.getMusicId().equals(musicId))
                .findFirst();
        if (optionalMusic.isPresent()) {

            findMusic.removePlayListMusic(playListMusic);
            findPlayList.removePlayListMusic(playListMusic);
            playListMusicService.deleteMemberMusic(playListId,musicId);

        } else throw new BusinessLogicException(ExceptionCode.MUSIC_NOT_FOUND);
    }

    // 만들어진 플리에 음악 추가
    public void addMusicToPlayList(long playListId, long musicId) {
        PlayListMusic playListMusic = playListMusicService.createPlayListMusic(this, playListId, musicId);


        PlayList playList = playListMusic.getPlayList();
        Music music = playListMusic.getMusic();

        playList.addPlayListMusic(playListMusic);
        music.addPlayListMusic(playListMusic);
        }


    public PlayList findVerifiedPlayList(long playListId) {
        Optional<PlayList> optionalPlayList = playListRepository.findById(playListId);
        PlayList findPlayList = optionalPlayList.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));

        return findPlayList;
    }

    // 플리 안에 있는 음악 조회
    public List<MusicDto.ResponseDto> findVerifiedPlayListMusic(long playListId) {
        PlayList playList = findVerifiedPlayList(playListId);
        List<Music> musics = playList.getMusics();
        List<MusicDto.ResponseDto> musicDtos = new ArrayList<>();

        for (Music music : musics) {
            MusicDto.ResponseDto musicDto = new MusicDto.ResponseDto(
                    music.getMusicId(),
                    music.getMusicName(),
                    music.getArtistName(),
                    music.getAlbumName(),
                    music.getMusicTime(),
                    music.getAlbumCoverImg(),
                    music.getMusicUri(),
                    music.getCreatedAt().toString(),
                    music.getModifiedAt().toString(),
                    new ArrayList<>(music.getTags()),
                    playList.getMember().getMemberId()

            );

            musicDtos.add(musicDto);
        }

        return musicDtos;
    }
}
