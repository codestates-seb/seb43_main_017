package com.codestates.mainProject.music.mapper;

import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MusicMapper {

    Music postToMusic(MusicDto.PostDto postDto);

    Music patchToMusic(MusicDto.PatchDto patchDto);

    MusicDto.ResponseDto musicToResponse(Music music);

    List<MusicDto.ResponseDto> musicsToResponses(List<Music> musics);
}