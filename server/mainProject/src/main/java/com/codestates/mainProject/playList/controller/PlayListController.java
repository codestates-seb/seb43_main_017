package com.codestates.mainProject.playList.controller;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.mapper.PlayListMapper;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import com.codestates.mainProject.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/playlists")
@Validated
public class PlayListController {
    private final static String PLAYLIST_DEFAULT_URL = "/playlists";
    private final PlayListService playListService;
    private final PlayListMapper playListMapper;
    private final MemberRepository memberRepository;

    private final MemberService memberService;

    public PlayListController(PlayListService playListService, PlayListMapper playListMapper, MemberRepository memberRepository, MemberService memberService) {
        this.playListService = playListService;
        this.playListMapper = playListMapper;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity createPlayList(@LoginMemberId Long memberId,
                                         @Valid @RequestBody PlayListDto.PostDto requestBody){

        PlayList playList = playListMapper.postToPlayList(requestBody);

        // memberId 를 playlistEntity member에 할당
        playList.setMember(memberService.findVerifiedMember(memberId));

        PlayList createPlayList = playListService.createPlayList(playList);
        URI location = UriCreator.createUri(PLAYLIST_DEFAULT_URL, createPlayList.getPlayListId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{playlist-id}")
    public ResponseEntity updatePlayList(@PathVariable("playlist-id") @Positive long playListId,
                                        @Valid @RequestBody PlayListDto.PatchDto requestBody){
        requestBody.setPlayListId(playListId);
        PlayList playList = playListMapper.patchToPlayList(requestBody);

        PlayList updatePlayList = playListService.updatePlayList(playList);
        PlayListDto.ResponseDto response = playListMapper.playListToResponse(updatePlayList);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{playlist-id}")
    public ResponseEntity getPlayList(@PathVariable("playlist-id")@Positive long playListId){
        PlayList findPlayList = playListService.findPlayList(playListId);
        PlayListDto.ResponseDto response = playListMapper.playListToResponse(findPlayList);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPlayLists(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                       @Positive @RequestParam(value = "size", defaultValue = "10") int size){
        Page<PlayList> pagePlayList = playListService.findPlayLists(page-1, size);
        List<PlayList> playLists = pagePlayList.getContent();
        List<PlayListDto.ResponseDto> response = playListMapper.playListsToResponses(playLists);

        return new ResponseEntity<>(new MultiResponseDto<>(response, pagePlayList), HttpStatus.OK);
    }

    //TODO: 전체다 삭제 가능 수정 필요
    @DeleteMapping("/{playlist-id}")
    public ResponseEntity<SingleResponseDto<PlayListDto.DeleteSuccessDto>>
    deletePlayList(@PathVariable("playlist-id") long playListId, @AuthenticationPrincipal UserDetails userDetails){

        Member member = memberRepository.findByEmail(userDetails.getUsername()).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );
        long currentUserId = member.getMemberId();

        playListService.deletePlayList(playListId, currentUserId);
        PlayListDto.DeleteSuccessDto response = new PlayListDto.DeleteSuccessDto("PlayList removed successfully.");

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }


    // 플레이리스트 음악 삭제 기능
    @DeleteMapping("/{playlist-id}/musics/{music-id}")
    public ResponseEntity deleteMusicFromPlayList(@PathVariable("playlist-id") long playListId,
                                                          @PathVariable("music-id") long musicId) {
        playListService.deleteMusicFromPlayList(playListId, musicId);
        return ResponseEntity.ok("Music removed successfully.");
    }

    // 만들어진 플리에 음악 추가
    @PostMapping("/{playlist-id}/musics/{music-id}")
    public ResponseEntity addMusicToPlayList(@PathVariable("playlist-id") long playListId,
                                             @PathVariable("music-id") long musicId){
        playListService.addMusicToPlayList(playListId, musicId);
        return ResponseEntity.ok("Music added to playlist successfully.");
    }
}
