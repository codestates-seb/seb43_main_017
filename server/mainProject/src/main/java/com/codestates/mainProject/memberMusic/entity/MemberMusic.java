package com.codestates.mainProject.memberMusic.entity;

import com.codestates.mainProject.member.entity.Member;
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
public class MemberMusic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberMusicId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name= "MUSIC_ID")
    private Music music;
}
