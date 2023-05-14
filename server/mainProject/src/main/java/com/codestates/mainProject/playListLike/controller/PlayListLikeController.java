package com.codestates.mainProject.playListLike.controller;

import com.codestates.mainProject.playListLike.dto.PlayListLikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.service.PlayListLikeService;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlist/like")
public class PlayListLikeController {
    private final PlayListLikeService playListLikeService;

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

    @DeleteMapping
    public ResponseEntity<?> deleteLike(@RequestBody @Valid PlayListLikeDto playListLikeDto){
        playListLikeService.deleteLike(playListLikeDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
