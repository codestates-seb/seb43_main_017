package com.codestates.mainProject.tags.entity;

import com.codestates.mainProject.musicTag.entity.MusicTag;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListTag.entity.PlayListTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(nullable = false)
    private String name;

    @Column(length = 20)
    private String category;

    @OneToMany(mappedBy = "tag", cascade = {CascadeType.ALL})
    private List<MusicTag> musicTags = new ArrayList<>();

    @OneToMany(mappedBy = "tag", cascade = {CascadeType.ALL})
    private List<PlayListTag> playListTags = new ArrayList<>();
}
