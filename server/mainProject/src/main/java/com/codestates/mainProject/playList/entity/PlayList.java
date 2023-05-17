package com.codestates.mainProject.playList.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playlListMusic.entity.PlayListMusic;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PlayList extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playListId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(nullable = false)
    private String createMember;

//    @Column(nullable = false)
//    private String playListTags;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String body;

    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL})
    private List<PlayListLike> playListLikes = new ArrayList<>();
    @Column(nullable = false)
    private int likeCount = playListLikes.size();
    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL})
    private List<PlayListMusic> playlistMusics = new ArrayList<>();

    public List<Music> getMusics() {
        List<Music> musics = new ArrayList<>();
        for (PlayListMusic playListMusic : playlistMusics) {
            musics.add(playListMusic.getMusic());
        }
        return musics;
    }

    public void addPlayListLike(PlayListLike playListLike){
        this.playListLikes.add(playListLike);
        playListLike.setPlayList(this);
    }

    public void removePlayListLike(PlayListLike playListLike) {
        this.playListLikes.remove(playListLike);
        if(playListLike.getPlayList() != this) {
            playListLike.setPlayList(this);
        }
    }

    public void addPlayListMusic(PlayListMusic playlistMusic) {

            this.playlistMusics.add(playlistMusic);
            playlistMusic.setPlayList(this);

    }

    public void removePlayListMusic(PlayListMusic playlistMusic) {
        this.playlistMusics.remove(playlistMusic);
        if(playlistMusic.getPlayList() != this) {
            playlistMusic.setPlayList(this);
        }
    }


    //TODO: PlayListLike 작업 완료 후 수정
//    public void addPlayListLikes(PlayListLike playListLike){
//        this.playListLikes.add(playListLike);
//    }
}
