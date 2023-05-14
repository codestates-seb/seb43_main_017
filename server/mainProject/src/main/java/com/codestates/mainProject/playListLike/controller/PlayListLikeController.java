package com.codestates.mainProject.playListLike.controller;

import com.codestates.mainProject.playListLike.dto.PlayListLikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.mapper.PlayListLikeMapper;
import com.codestates.mainProject.playListLike.service.PlayListLikeService;
import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlist/like")
public class PlayListLikeController {
    private final PlayListLikeService playListLikeService;
    private final PlayListLikeMapper playListLikeMapper;

    @PostMapping
    public ResponseEntity<?> insetLike(@RequestBody @Valid PlayListLikeDto playListLikeDto){
        try {
            PlayListLike insetLike = playListLikeService.insertLike(playListLikeDto);
            URI location = UriCreator.createUri("/playlist/like", insetLike.getPlayListLikeId());

            return ResponseEntity.created(location).build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/playlist/likes")
    public ResponseEntity getPlayListLikes(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                           @Positive @RequestParam(value = "size", defaultValue = "10") int size){
        Page<PlayListLike> pagePlayListLike = playListLikeService.findPlayListLikes(page-1, size);
        List<PlayListLike> playListLikes = pagePlayListLike.getContent();
        List<PlayListLikeDto.ResponseDto> response = playListLikeMapper.playListLikesToResponses(playListLikes);

        return new ResponseEntity<>(new MultiResponseDto<>(response, pagePlayListLike), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteLike(@RequestBody @Valid PlayListLikeDto playListLikeDto){
        playListLikeService.deleteLike(playListLikeDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
