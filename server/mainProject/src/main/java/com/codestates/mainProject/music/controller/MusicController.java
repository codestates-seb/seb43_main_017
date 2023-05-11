package com.codestates.mainProject.music.controller;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.mapper.MusicMapper;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/musics")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MusicController {
    private final static String MUSIC_DEFAULT_URL = "/musics";
    private final MusicService musicService;
    private final MusicMapper mapper;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    // 음악 생성
    @PostMapping
    public ResponseEntity postMusic(@Valid @RequestBody MusicDto.PostDto postDto) {
        Music music = mapper.postToMusic(postDto);

        Music createdMusic = musicService.createMusic(music);
        URI location = UriCreator.createUri(MUSIC_DEFAULT_URL, createdMusic.getMusicId());

        return ResponseEntity.created(location).build();
    }

    // 음악 조회
    @GetMapping("/{music-id}")
    public ResponseEntity getMusic(@PathVariable("music-id") @Positive long musicId) {
        Music findMusic = musicService.findMusicById(musicId);
        MusicDto.ResponseDto response = mapper.musicToResponse(findMusic);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 음악 전체 조회
    @GetMapping
    public ResponseEntity getMusics(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                     @Positive @RequestParam(value = "size", defaultValue = "20") int size){
        Page<Music> pageMusic = musicService.findAllMusic(page - 1 , size);
        List<Music> musics = pageMusic.getContent();
        List<MusicDto.ResponseDto> response = mapper.musicsToResponses(musics);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, pageMusic), HttpStatus.OK);
    }

    // 유저 음악 조회(liked)
    // 기존 엔드포인트는 ("/members/{member-id}") 이었지만 @AuthenticationPrincipal 을 사용해서
    // 현재 로그인한 사용자의 정보를 가져오고 있기 때문에 엔드포인트에 memberId가 필요하지않음.
    // 그러므로 엔드포인트를 아래와 같이 변경함.
    @GetMapping("/liked-musics")
    public ResponseEntity getLikedMusics(@AuthenticationPrincipal UserDetails userDetails,
                                         @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                         @Positive @RequestParam(value = "size", defaultValue = "20") int size) {
        Member member = memberRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        long memberId = member.getMemberId();

        Page<Music> likedMusics = memberService.findLikedMusics(memberId, page - 1, size);
        List<MusicDto.ResponseDto> response = mapper.musicsToResponses(likedMusics.getContent());

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, likedMusics), HttpStatus.OK);
    }

    // 음악 다운로드

    // 음악 수정
    @PatchMapping("/{music-id}")
    public ResponseEntity patchMusic(@PathVariable("music-id") @Positive long musicId,
                                      @Valid @RequestBody MusicDto.PatchDto patchDto){
        Music music = mapper.patchToMusic(patchDto);
        Music updatedMusic = musicService.updateMusic(music);
        MusicDto.ResponseDto response = mapper.musicToResponse(updatedMusic);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 음악 삭제
    @DeleteMapping("/{music-id}")
    public ResponseEntity<SingleResponseDto<MusicDto.DeleteSuccessDto>> deleteMusic(@PathVariable long musicId,
                                                                                    @LoginMemberId Long memberId) {
        musicService.deleteMusic(musicId, memberId);
        MusicDto.DeleteSuccessDto response = new MusicDto.DeleteSuccessDto("음악이 성공적으로 삭제되었습니다.");

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
