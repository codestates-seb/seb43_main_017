package com.codestates.mainProject.playlListMusic.entity;

import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playList.entity.PlayList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class PlayListMusic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playListMusicId;

    @ManyToOne
    @JoinColumn(name = "PLAYLIST_ID")
    private PlayList playList;

    @ManyToOne
    @JoinColumn(name= "MUSIC_ID")
    private Music music;
}
