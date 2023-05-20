package com.codestates.mainProject.playList.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import com.codestates.mainProject.playlListMusic.entity.PlayListMusic;
import com.codestates.mainProject.playlListMusic.service.PlayListMusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlayListService {

    private final PlayListRepository playListRepository;
    private final MemberService memberService;
    private final PlayListMusicService playListMusicService;

    public PlayList createPlayList(PlayList playList) {
        try {
            long memberId = playList.getMember().getMemberId();
            Member findMember = memberService.findVerifiedMember(memberId);
            playList.setCreateMember(findMember.getName());

            findMember.addPlayList(playList);
            log.info("플레이리스트 생성 memberId={}, create={}", findMember.getMemberId(), findMember.getName());

            return playListRepository.save(playList);
        } catch (Exception e){
            // 예외를 로그에 기록
            log.error("!!!!!!!!!플레이리스트를 만드는 동안 오류 발생 끄아악!!!!!!!!!!!", e);
            // 예외를 다시 던져서 상위로 전파하거나 적절한 응답을 반환할 수 있습니다.
            throw new RuntimeException("플레이리스트 못만들어따!!! 살려줘!!!!!!", e);
        }
    }

    // 좋아요 플레이리스트 조회
    public Page<PlayList> findLikedPlayLists(Long memberId, int page, int size) {
        Member member = memberService.findMember(memberId);
        List<PlayList> playLists = member.getLikedPlayLists();

        int start = page * size;
        int end = Math.min(start + size, playLists.size());

        if (start >= playLists.size()) return Page.empty();

        List<PlayList> pagePlayLists = playLists.subList(start, end);
        return new PageImpl<>(pagePlayLists, PageRequest.of(page, size), playLists.size());
    }

    // 멤버 플레이리스트 조회
    public Page<PlayList> findMemberPlayLists(Long memberId, int page, int size) {
        Member member = memberService.findMember(memberId);
        List<PlayList> playLists = member.getPlayLists();

        int start = page * size;
        int end = Math.min(start + size, playLists.size());

        if (start >= playLists.size()) return Page.empty();

        List<PlayList> pagePlayLists = playLists.subList(start, end);
        return new PageImpl<>(pagePlayLists, PageRequest.of(page, size), playLists.size());
    }

    // 플레이리스트 전체 조회
    public Page<PlayList> findPlayLists(int page, int size){
        return playListRepository.findAll(PageRequest.of(
                page, size, Sort.by("playListId").descending()));
    }

    // 관리자 플레이리스트 전체 조회
    public Page<PlayList> findAdminsPlayLists(Long memberId, int page, int size){
        Member member = memberService.findMember(memberId);

        if (!member.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        List<PlayList> playLists = member.getPlayLists();

        int start = page * size;
        int end = Math.min(start + size, playLists.size());

        if (start >= playLists.size()) return Page.empty();
        List<PlayList> pagePlayLists = playLists.subList(start, end);
        return new PageImpl<>(pagePlayLists, PageRequest.of(page, size), playLists.size());
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
        PlayList playList = findVerifiedPlayList(playListId);
        Member member = memberService.findMember(memberId);

        if (!member.getRoles().contains("ADMIN")) {
            if (!member.getMemberId().equals(playList.getMember().getMemberId())){
                throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);
            }
        }
        member.removePlayList(playList);
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
                    music.getMusicLikeCount(),
                    music.getCreatedAt().toString(),
                    music.getModifiedAt().toString(),
                    new ArrayList<>(music.getTags()),
                    playList.getMember().getMemberId()
            );
            musicDtos.add(musicDto);
        }
        return musicDtos;
    }


    public PlayList findVerifiedPlayList(long playListId) {
        Optional<PlayList> optionalPlayList = playListRepository.findById(playListId);
        PlayList findPlayList = optionalPlayList.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));

        return findPlayList;
    }

    // 플레이리스트 작성자 찾기
    public PlayList findWriter(Long memberId, long playListId) {
        Optional<PlayList> optionalPlayList =
                playListRepository.findByMemberMemberIdAndPlayListId(memberId, playListId);
        PlayList playList = optionalPlayList.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));
        return playList;
    }
}