package com.codestates.mainProject.playListLike.service;

import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.repository.PlayListLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class PlayListLikeService {
    private final PlayListLikeRepository playListLikeRepository;
    private final PlayListService playListService;
    private final MemberService memberService;


    // 좋아요 누르기
    public boolean addLike(Member member, long playListId){
        PlayList playList = playListService.findVerifiedPlayList(playListId);

        if(isNotAlreadyLike(member, playList)){
            playListLikeRepository.save(new PlayListLike(playList, member));
            return true;
        }
        return false;
    }

    // 좋아요 삭제
    public void cancelLike(Member member, long playListId){
        PlayList playList = playListService.findVerifiedPlayList(playListId);
        PlayListLike playListLike = playListLikeRepository.findByMemberAndPlayList(member, playList).orElseThrow();
        playListLikeRepository.delete(playListLike);
    }

    public List<String> count(long playListId, Member loginMemberId){
        // 좋아요를 count할 대상 playList를 가져옴
        PlayList playList = playListService.findVerifiedPlayList(playListId);

        // 가져온 playList로 like테이블에 쿼리한 결과를 list에 담음
        Integer playListLikeCount = playListLikeRepository.countByPlayList(playList).orElse(0);
        List<String> resultData = new ArrayList<>(Arrays.asList(String.valueOf(playListLikeCount)));

        // 현재 로그인한 유저가 이미 좋아요를 눌렀는지 검사하고 결과를 List에 담아 반환
        if (Objects.nonNull(loginMemberId)){
            resultData.add(String.valueOf(isNotAlreadyLike(loginMemberId, playList)));
            return resultData;
        }
        return resultData;
    }

    // 유저가 이미 좋아요 한 게시물인지 체크
    private boolean isNotAlreadyLike(Member member, PlayList playList){
        return playListLikeRepository.findByMemberAndPlayList(member, playList).isEmpty();
    }
}
