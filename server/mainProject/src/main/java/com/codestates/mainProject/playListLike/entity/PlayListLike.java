package com.codestates.mainProject.playListLike.entity;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.playList.entity.PlayList;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "PLAY_LIST_LIKE")
public class PlayListLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playListLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private PlayList playList;

    public PlayListLike(PlayList playList, Member member){
        this.playList = playList;
        this.member = member;
    }
}
