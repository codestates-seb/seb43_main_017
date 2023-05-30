package com.codestates.mainProject.member.entity;

import com.codestates.mainProject.audit.Auditable;
import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.musicComment.entity.MusicComment;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playListComment.entity.PlayListComment;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import lombok.*;
import javax.persistence.*;
import java.util.*;


@NoArgsConstructor
@Entity
@AllArgsConstructor
@Getter
@Setter
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

    @Column
    private String image="";

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private Status status = Status.MEMBER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<MemberMusic> memberMusics = new ArrayList<>();  // 음악에 like를 누르면 musics에 포함

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<PlayList> playLists = new ArrayList<>(); //playlist를 새로 생성하거나, 기존의 playlist 추가시 playlists에 추가

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<PlayListLike> likedPlayLists = new ArrayList<>();

//    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
//    private List<MusicLike> musicLikes = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
//    private List<MusicComment> musicComments = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
//    private List<PlayListComment> playListComments = new ArrayList<>();   //현재 MySQL 내 멤버들이 꼬여있어서 일단 주석처리


    public List<Music> getMusics() {
        List<Music> musics = new ArrayList<>();
        for (MemberMusic memberMusic : memberMusics) {
            musics.add(memberMusic.getMusic());
        }
        return musics;
    }

    public List<PlayList> getLikedPlayLists(){
        List<PlayList> LikedPlayLists = new ArrayList<>();
        for ( PlayListLike playListLike : likedPlayLists) {
            LikedPlayLists.add(playListLike.getPlayList());
        }
        return LikedPlayLists;
    }

    public void addMemberMusic(MemberMusic memberMusic){
        this.memberMusics.add(memberMusic);
        memberMusic.setMember(this);
    }

    public void removeMemberMusic(MemberMusic memberMusic) {
        this.memberMusics.remove(memberMusic);
        if(memberMusic.getMember() != this) {
            memberMusic.setMember(this);
        }
    }

    public void addPlayList(PlayList playList){
        this.playLists.add(playList);
        playList.setMember(this);
    }

    public void removePlayList(PlayList playList) {
        this.playLists.remove(playList);
        if(playList.getMember() != this) {
            playList.setMember(this);
        }
    }



    public void addLikedPlayLists(PlayListLike playListLike){
        this.likedPlayLists.add(playListLike);
        playListLike.setMember(this);
    }

    public void removeLikedPlayLists(PlayListLike playListLike) {
        this.likedPlayLists.remove(playListLike);
        if(playListLike.getMember() != this) {
            playListLike.setMember(this);
        }
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
