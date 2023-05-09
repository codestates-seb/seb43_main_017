package com.codestates.mainProject.member.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.playList.entity.PlayList;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
@AllArgsConstructor
@Data
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 20, nullable = false, unique = true)
    private String name;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100)
    private String password;

    @Column(name = "image")
    private String image="";

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private Status status = Status.MEMBER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<Music> musics = new ArrayList<>();  // 음악에 like를 누르면 musics에 포함

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<PlayList> playLists = new ArrayList<>(); //playlist를 새로 생성하거나, 기존의 playlist 추가시 playlists에 추가

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<PlayList> likedPlayLists = new ArrayList<>();

    public void addMusic(Music music){
        this.musics.add(music);
        music.setMember(this);
    }

    public void addPlayList(PlayList playList){
        this.playLists.add(playList);
        playList.setMember(this);
    }

    public void addLikedPlaylists(PlayList playList){
        this.likedPlayLists.add(playList);
        playList.setMember(this);
    }

    public List<Music> getReverseMusics(){
        List<Music> reversedList = new ArrayList<>(this.musics);
        Collections.reverse(reversedList);

        return reversedList;
    }

    public Member(String email) {
        this.email = email;
    }

    public enum Status {
        MEMBER_ACTIVE("활동중"),
        MEMBER_DELETE("탈퇴 상태");

        private String status;

        Status(String status) {
            this.status = status;}
    }

}
