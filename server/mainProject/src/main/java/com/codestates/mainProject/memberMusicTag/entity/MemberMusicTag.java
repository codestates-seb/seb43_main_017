package com.codestates.mainProject.memberMusicTag.entity;


import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.musicTag.entity.MusicTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@AllArgsConstructor
@Getter
@Setter
public class MemberMusicTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberMusicTagId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "MUSIC_TAG_ID")
    private MusicTag musicTag;
}
