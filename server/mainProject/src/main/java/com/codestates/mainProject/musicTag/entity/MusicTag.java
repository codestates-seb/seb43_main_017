package com.codestates.mainProject.musicTag.entity;


import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.tags.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class MusicTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long musicTagId;

    @ManyToOne
    @JoinColumn(name= "MUSIC_ID")
    private Music music;

    @ManyToOne
    @JoinColumn(name= "TAG_ID")
    private Tag tag;

    @Column(nullable = false)
    private String name;
}
