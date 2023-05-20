package com.codestates.mainProject.playListTag.controller;

import com.codestates.mainProject.playListTag.dto.PlayListTagDto;
import com.codestates.mainProject.playListTag.service.PlayListTagService;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
@Validated
@RequiredArgsConstructor
public class PlayListTagController {
    private final PlayListTagService playListTagService;

    @PostMapping("{tag-id}/playlists/{playlist-id}")
    public ResponseEntity createPlayListTag(@PathVariable("tag-id") long tagId,
                                            @PathVariable("playlist-id") long playListId) {
        playListTagService.createPlayListTag(tagId, playListId);
        return ResponseEntity.ok("플레이리스트 태그 생성 완료");
    }

    @GetMapping("/playlists/{playlist-id}")
    public ResponseEntity getPlayLists(@PathVariable("playlist-id") long playListId) {
        List<PlayListTagDto> response = playListTagService.getPlayListTags(playListId);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/{tag-id}/playlists/{playlist-id}")
    public ResponseEntity deletePlayListTag(@PathVariable("tag-id") long tagId,
                                            @PathVariable("playlist-id") long playListId,
                                            @LoginMemberId Long memberId) {
        String tagName = playListTagService.findPlayListTag(tagId, playListId).getName();
        playListTagService.deletePlayListTag(tagId, memberId, playListId);
        return ResponseEntity.ok("플레이리스트의 "+tagName+" 태그가 삭제되었습니다");
    }
}
