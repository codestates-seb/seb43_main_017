package com.codestates.mainProject.playList.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
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
    private final MusicService musicService;

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
        music.setPlayList(playList);

        playListRepository.save(playList);
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
                    music.getMember() != null ? music.getMember().getMemberId() : null,
                    music.getPlayList() != null ? music.getPlayList().getPlayListId() : null
            );
            musicDtos.add(musicDto);
        }

        return musicDtos;
    }
}
