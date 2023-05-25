package com.codestates.mainProject.music.controller;

import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.mapper.MusicMapper;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/musics")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MusicController {
    private final static String MUSIC_DEFAULT_URL = "/musics";
    private final MusicService musicService;
    private final MusicMapper mapper;
    private final MemberService memberService;
    private final PlayListService playListService;

    // 음악 생성
    @PostMapping
    public ResponseEntity postMusic(@Valid @RequestBody MusicDto.PostDto postDto) {
        Music music = mapper.postToMusic(postDto);

        Music createdMusic = musicService.createMusic(music);
        URI location = UriCreator.createUri(MUSIC_DEFAULT_URL, createdMusic.getMusicId());

        return ResponseEntity.created(location).build();
    }

    // 음악 개별 조회
    @GetMapping("/{music-id}")
    public ResponseEntity getMusic(@PathVariable("music-id") @Positive long musicId) {
        Music findMusic = musicService.findMusicById(musicId);
        MusicDto.ResponseDto response = mapper.musicToResponse(findMusic);
        response.setMusicTagName(findMusic.getTagsName());


        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 생성일 기준 내림차순 음악 전체 조회
    @GetMapping
    public ResponseEntity getMusics(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                    @Positive @RequestParam(value = "size", defaultValue = "10") int size){
        Page<Music> pageMusic = musicService.findMusicsOrderByCreatedAtDesc(page - 1 , size);
        List<Music> musics = pageMusic.getContent();
        List<MusicDto.ResponseDto> response = mapper.musicsToResponses(musics);

        for(int i=0; i< musics.size(); i++) {
            Music music = musics.get(i);
            List<String> tagName = music.getTagsName();
            response.get(i).setMusicTagName(tagName);
        }


        return new ResponseEntity<>(
                new MultiResponseDto<>(response, pageMusic), HttpStatus.OK);
    }

    // 유저 음악 조회(liked)
    @GetMapping("/liked-musics")
    public ResponseEntity getLikedMusics(@LoginMemberId Long memberId,
                                         @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                         @Positive @RequestParam(value = "size", defaultValue = "10") int size) {

        Page<Music> likedMusics = memberService.findLikedMusics(memberId, page - 1, size);
        List<Music> musics = likedMusics.getContent();
        List<MusicDto.ResponseDto> response = mapper.musicsToResponses(musics);

        for(int i=0; i< musics.size(); i++) {
            Music music = musics.get(i);
            List<String> tagName = music.getTagsName();
            response.get(i).setMusicTagName(tagName);
        }

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, likedMusics), HttpStatus.OK);
    }

    // 플레이리스트 안에 있는 music을 모두 조회
    @GetMapping("/playlists/{playlist-id}")
    public ResponseEntity<?> getPlayListMusics(@PathVariable("playlist-id") Long playListId) {
        List<MusicDto.ResponseDto> musicDtos = playListService.findVerifiedPlayListMusic(playListId);


        if (musicDtos.isEmpty()) {
            return new ResponseEntity<>(new MusicDto.MessageResponseDto("플레이리스트에 음악이 없습니다."), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(musicDtos, HttpStatus.OK);
        }
    }

    // 최신순 음악 조회
//    @GetMapping("/order-by-created-at")
//    public ResponseEntity getOrderByCreatedAt(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
//                                              @Positive @RequestParam(value = "size", defaultValue = "5") int size) {
//        Page<Music> pageMusics = musicService.toggleCreatedAtOrder(page - 1, size);
//        List<Music> musics = pageMusics.getContent();
//        List<MusicDto.ResponseDto> response = mapper.musicsToResponses(pageMusics.getContent());
//
//        for(int i=0; i< musics.size(); i++) {
//            Music music = musics.get(i);
//            List<String> tagName = music.getTagsName();
//            response.get(i).setMusicTagName(tagName);
//        }
//
//        return ResponseEntity.ok(new MultiResponseDto<>(response, pageMusics));
//    }

    // 좋아요 기준 내림차순 음악 전체 조회
    @GetMapping("/order-by-like-count")
    public ResponseEntity getOrderByLikeCount(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                              @Positive @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<Music> pageMusics = musicService.findMusicsOrderByLikeCountDesc(page - 1 , size);
        List<Music> musics = pageMusics.getContent();
        List<MusicDto.ResponseDto> response = mapper.musicsToResponses(pageMusics.getContent());

        for(int i=0; i< musics.size(); i++) {
            Music music = musics.get(i);
            List<String> tagName = music.getTagsName();
            response.get(i).setMusicTagName(tagName);
        }

        return ResponseEntity.ok(new MultiResponseDto<>(response, pageMusics));
    }

    // 음악 수정
    @PatchMapping("/{music-id}")
    public ResponseEntity patchMusic(@PathVariable("music-id") @Positive long musicId,
                                     @Valid @RequestBody MusicDto.PatchDto patchDto,
                                     @LoginMemberId Long memberId){
        Music updatedMusic = musicService.updateMusic(patchDto, musicId, memberId);
        MusicDto.ResponseDto response = mapper.musicToResponse(updatedMusic);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 음악 삭제
    @DeleteMapping("/{music-id}")
    public ResponseEntity<SingleResponseDto<MusicDto.DeleteSuccessDto>> deleteMusic(@PathVariable("music-id") long musicId,
                                                                                    @LoginMemberId Long memberId) {
        musicService.deleteMusic(musicId, memberId);
        MusicDto.DeleteSuccessDto response = new MusicDto.DeleteSuccessDto("음악이 성공적으로 삭제되었습니다.");

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
