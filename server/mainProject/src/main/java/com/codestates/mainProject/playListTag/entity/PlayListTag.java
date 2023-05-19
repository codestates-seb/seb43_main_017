package com.codestates.mainProject.playListTag.entity;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.tags.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PlayListTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playListTagId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PLAYLIST_ID")
    private PlayList playList;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @Column(nullable = false)
    private String name;
}
