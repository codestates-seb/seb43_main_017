package com.codestates.mainProject.music.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playlListMusic.entity.PlayListMusic;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
public class Music extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long musicId;

    @Column(nullable = false)
    private String musicName;

    @Column(nullable = false)
    private String artistName;

    @Column
    private String albumName;

    @Column(nullable = false)
    private Long musicTime;

    private String albumCoverImg;

    @Column(nullable = false, unique = true)
    private String musicUri = "";

    @OneToMany(mappedBy = "music", cascade = {CascadeType.ALL})
    private List<MusicLike> musicLikes = new ArrayList<>();

    @Column(nullable = false)
    private int musicLikeCount = this.musicLikes.size();

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> tags = new ArrayList<>();


    @OneToMany(mappedBy = "music", cascade = {CascadeType.ALL})
    private List<MemberMusic> memberMusics = new ArrayList<>();

    @OneToMany(mappedBy = "music", cascade = {CascadeType.ALL})
    private List<PlayListMusic> playListMusics = new ArrayList<>();



    public void addMusicLike(MusicLike musicLike) {
        this.musicLikes.add(musicLike);
        musicLike.setMusic(this);
        this.musicLikeCount = this.musicLikes.size();

    }

    public void removeMusicLike(MusicLike musicLike){
        this.musicLikes.remove(musicLike);
        if(musicLike.getMusic() != this) {
            musicLike.setMusic(this);
        }
        this.musicLikeCount = this.musicLikes.size();
    }

    public void addMemberMusic(MemberMusic memberMusic){
        this.memberMusics.add(memberMusic);
        memberMusic.setMusic(this);
    }

    public void removeMemberMusic(MemberMusic memberMusic) {
        this.memberMusics.remove(memberMusic);
        if(memberMusic.getMusic() != this) {
            memberMusic.setMusic(this);
        }
    }

    public void addPlayListMusic(PlayListMusic playListMusic){
        this.playListMusics.add(playListMusic);
        playListMusic.setMusic(this);
    }

    public void removePlayListMusic(PlayListMusic playListMusic) {
        this.playListMusics.remove(playListMusic);
        if(playListMusic.getMusic() != this) {
            playListMusic.setMusic(this);
        }
    }



}
