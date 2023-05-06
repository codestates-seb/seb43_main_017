package com.codestates.mainProject.music.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.playList.entity.PlayList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Music extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long musicId;

    @Column(nullable = false)
    private String artist_name;

    private String album_name;

    @Column(nullable = false)
    private Long music_time;

    private String album_img;

    private String background_img;

    @Column(nullable = false)
    private String music_uri = "";

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name= "PLAYLIST_ID")
    private PlayList playList;

    @OneToMany(mappedBy = "music", cascade = {CascadeType.ALL})
    private List<MusicLike> musicLikes = new ArrayList<>();

}
