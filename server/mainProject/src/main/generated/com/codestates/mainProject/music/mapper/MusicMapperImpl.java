package com.codestates.mainProject.music.mapper;

import com.codestates.mainProject.music.dto.MusicDto.PatchDto;
import com.codestates.mainProject.music.dto.MusicDto.PostDto;
import com.codestates.mainProject.music.dto.MusicDto.ResponseDto;
import com.codestates.mainProject.music.entity.Music;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-15T21:30:16+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MusicMapperImpl implements MusicMapper {

    @Override
    public Music postToMusic(PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        Music music = new Music();

        music.setMusicName( postDto.getMusicName() );
        music.setArtistName( postDto.getArtistName() );
        music.setAlbumName( postDto.getAlbumName() );
        music.setMusicTime( postDto.getMusicTime() );
        music.setAlbumCoverImg( postDto.getAlbumCoverImg() );
        music.setMusicUri( postDto.getMusicUri() );

        return music;
    }

    @Override
    public Music patchToMusic(PatchDto patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        Music music = new Music();

        music.setMusicId( patchDto.getMusicId() );
        music.setMusicName( patchDto.getMusicName() );
        music.setArtistName( patchDto.getArtistName() );
        music.setAlbumName( patchDto.getAlbumName() );
        music.setMusicTime( patchDto.getMusicTime() );
        music.setAlbumCoverImg( patchDto.getAlbumCoverImg() );
        music.setMusicUri( patchDto.getMusicUri() );

        return music;
    }

    @Override
    public ResponseDto musicToResponse(Music music) {
        if ( music == null ) {
            return null;
        }

        ResponseDto responseDto = new ResponseDto();

        if ( music.getMusicId() != null ) {
            responseDto.setMusicId( music.getMusicId() );
        }
        responseDto.setMusicName( music.getMusicName() );
        responseDto.setArtistName( music.getArtistName() );
        responseDto.setAlbumName( music.getAlbumName() );
        if ( music.getMusicTime() != null ) {
            responseDto.setMusicTime( music.getMusicTime() );
        }
        responseDto.setAlbumCoverImg( music.getAlbumCoverImg() );
        responseDto.setMusicUri( music.getMusicUri() );
        responseDto.setCreatedAt( music.getCreatedAt() );
        responseDto.setModifiedAt( music.getModifiedAt() );

        return responseDto;
    }

    @Override
    public List<ResponseDto> musicsToResponses(List<Music> musics) {
        if ( musics == null ) {
            return null;
        }

        List<ResponseDto> list = new ArrayList<ResponseDto>( musics.size() );
        for ( Music music : musics ) {
            list.add( musicToResponse( music ) );
        }

        return list;
    }
}
