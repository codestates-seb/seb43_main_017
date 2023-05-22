package com.codestates.mainProject.playList.controller;

import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.mapper.PlayListMapper;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/playlists")
@Validated
@RequiredArgsConstructor
public class PlayListController {
    private final static String PLAYLIST_DEFAULT_URL = "/playlists";
    private final PlayListService playListService;
    private final PlayListMapper playListMapper;
    private final MemberService memberService;


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

    @GetMapping("/{playlist-id}")
    public ResponseEntity getPlayList(@PathVariable("playlist-id")@Positive long playListId){
        PlayList findPlayList = playListService.findVerifiedPlayList(playListId);
        PlayListDto.ResponseDto response = playListMapper.playListToResponse(findPlayList);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 관리자 플레이리스트 전체 조회
    @GetMapping("/admin")
    public ResponseEntity findAdminsPlayLists(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                              @Positive @RequestParam(value = "size", defaultValue = "5") int size){
        Page<PlayList> pagePlayList = playListService.findAdminsPlayLists(1, page-1, size);
        List<PlayListDto.ResponseDto> response = playListMapper.playListsToResponses(pagePlayList.getContent());

        return ResponseEntity.ok(new MultiResponseDto<>(response, pagePlayList));
    }

    // 플레이리스트 전체 조회 (좋아요 순)
    @GetMapping
    public ResponseEntity getPlayLists(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                       @Positive @RequestParam(value = "size", defaultValue = "5") int size){
        Page<PlayList> pagePlayList = playListService.findPlayLists(page-1, size);
        List<PlayListDto.ResponseDto> response = playListMapper.playListsToResponses(pagePlayList.getContent());

        return ResponseEntity.ok(new MultiResponseDto<>(response, pagePlayList));
    }

    // 멤버 플레이리스트 조회
    @GetMapping("/member-playlist")
    public ResponseEntity getMemberPlayLists(@LoginMemberId Long memberId,
                                            @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                            @Positive @RequestParam(value = "size", defaultValue = "5") int size) {
        Page<PlayList> pagePlayList = playListService.findMemberPlayLists(memberId, page-1, size);
        List<PlayListDto.ResponseDto> response = playListMapper.playListsToResponses(pagePlayList.getContent());

        return ResponseEntity.ok(new MultiResponseDto<>(response, pagePlayList));
    }

    // 좋아요 플레이리스트 조회
    @GetMapping("/member-playlist/liked")
    public ResponseEntity getLikedPlaylists(@LoginMemberId Long memberId,
                                            @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                            @Positive @RequestParam(value = "page", defaultValue = "5") int size) {
        Page<PlayList> pagePlayList = playListService.findLikedPlayLists(memberId, page-1, size);
        List<PlayListDto.ResponseDto> response = playListMapper.playListsToResponses(pagePlayList.getContent());

        return ResponseEntity.ok(new MultiResponseDto<>(response, pagePlayList));
    }

    @PatchMapping("/{playlist-id}")
    public ResponseEntity updatePlayList(@PathVariable("playlist-id") @Positive long playListId,
                                        @LoginMemberId Long memberId,
                                        @Valid @RequestBody PlayListDto.PatchDto requestBody){
        PlayList playList = playListMapper.patchToPlayList(requestBody);
        playList.setPlayListId(playListId);
        PlayList updatedPlayList = playListService.updatePlayList(playListId, memberId, requestBody);
        PlayListDto.ResponseDto response = playListMapper.playListToResponse(updatedPlayList);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/{playlist-id}")
    public ResponseEntity<SingleResponseDto<PlayListDto.DeleteSuccessDto>> deletePlayList(@PathVariable("playlist-id") long playListId,
                                                                                          @LoginMemberId Long memberId) {

        playListService.deletePlayList(playListId, memberId);
        PlayListDto.DeleteSuccessDto response = new PlayListDto.DeleteSuccessDto("플레이리스트 삭제 완료");

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
