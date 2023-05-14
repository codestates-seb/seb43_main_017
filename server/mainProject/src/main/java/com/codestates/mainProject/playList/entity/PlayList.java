package com.codestates.mainProject.playList.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private String create;

    private String playListTags;

    private String title;

    private String body;

    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL})
    private List<PlayListLike> playListLikes = new ArrayList<>();
//    @ColumnDefault("0")
//    @Column(name = "like_count", nullable = false)
//    private Integer likeCount;

    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL})
    private List<Music> musics = new ArrayList<>();

    public void addPlayListLike(PlayListLike playListLike){
        this.playListLikes.add(playListLike);
        playListLike.setPlayList(this);
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
