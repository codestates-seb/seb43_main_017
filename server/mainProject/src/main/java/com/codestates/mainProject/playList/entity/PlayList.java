package com.codestates.mainProject.playList.entity;

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
public class PlayList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PlayListId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "MUSIC_ID")
    private Music music;

    @OneToMany(mappedBy = "playList", cascade = {CascadeType.ALL})
    private List<PlayListLike> playListLikes = new ArrayList<>();



}
