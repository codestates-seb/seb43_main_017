package com.codestates.mainProject.playListLike.entity;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.entity.PlayList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class PlayListLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PlayListLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PLAYLIST_ID")
    private PlayList playList;
}
