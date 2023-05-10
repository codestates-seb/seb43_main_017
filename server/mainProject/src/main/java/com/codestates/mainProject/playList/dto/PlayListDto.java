package com.codestates.mainProject.playList.dto;

import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.playList.entity.PlayList;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PlayListDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostDto {
        @NotNull
        private Long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PatchDto {

        private Long playListId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {
        // TODO: 주석 처리된 부분 추후에 작업

        private Long playListId;
        private Long memberId;
//        private MusicDto music;
//        private List<PlayListLikeDto> likes = new ArrayList<>();

        private String title;
        private String body;

        private String createdAt;
        private String modifiedAt;

//        public ResponseDto(PlayList playList) {
//            if (playList.getMember() == null) throw new IllegalArgumentException("Member is null");
//            this.id = playList.getPlayListId();
//            this.member = new MemberDto(playList.getMember());
//            this.music = new MusicDto(playList.getMusic());
//            this.title = playList.getTitle();
//            this.body = playList.getBody();
//            for (PlayListLike playListLike : playList.getPlayListLikes()) {
//                this.likes.add(new PlayListLikeDto(playListLike));
//            }
//        }
    }

    @Data
    public static class DeleteSuccessDto {
        private String message;

        public DeleteSuccessDto(String message) {this.message = message;}
    }

}
