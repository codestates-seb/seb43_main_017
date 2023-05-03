package com.codestates.mainProject.musicLike.entity;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.music.entity.Music;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class MusicLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long musicLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "MUSIC_ID")
    private Music music;
}
