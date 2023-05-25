package com.codestates.mainProject.musicLike.mapper;

import com.codestates.mainProject.musicLike.dto.MusicLikeDto;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MusicLikeMapper {
    @Mapping(source = "musicLikeId", target = "id")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "music.musicId", target = "musicId")
    MusicLikeDto.MusicLikeResponseDto entityToResponseDto(MusicLike musicLike);
}


