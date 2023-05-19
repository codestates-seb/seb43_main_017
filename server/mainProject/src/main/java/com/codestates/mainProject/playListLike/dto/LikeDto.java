package com.codestates.mainProject.playListLike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LikeDto {
        private long id;
        private long memberId;
        private long playListId;
}
