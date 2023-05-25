package com.codestates.mainProject.playList.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class PlayList extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playListId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Music> musics = new ArrayList<>();

    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL})
    private List<PlayListLike> playListLikes = new ArrayList<>();

    private String title;

    private String body;

    public String getMemberName(){
        return this.member.getName();
    }

    public void addMusic(Music music){
        this.musics.add(music);
        music.setPlayList(this);
    }

    //TODO: PlayListLike 작업 완료 후 수정
//    public void addPlayListLikes(PlayListLike playListLike){
//        this.playListLikes.add(playListLike);
//    }
}
