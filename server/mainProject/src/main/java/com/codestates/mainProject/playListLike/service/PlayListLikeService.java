package com.codestates.mainProject.playListLike.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.mapper.PlayListMapper;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.repository.PlayListLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PlayListLikeService {
    private final PlayListLikeRepository playListLikeRepository;
    private final MemberService memberService;
    private final PlayListService playListService;
    private final PlayListMapper playListMapper;
    private final PlayListRepository playListRepository;


    public PlayListLike addLike(Long memberId, Long playListId){
        Member member = memberService.findMember(memberId);
        PlayList playList = playListService.findVerifiedPlayList(playListId);

        PlayListLike like = new PlayListLike();
        like.setMember(member);
        like.setPlayList(playList);

        playList.addPlayListLike(like);

        return playListLikeRepository.save(like);
    }


    // 좋아요 삭제
    public void cancelLike(Long memberId, Long playListId){
        Member member = memberService.findMember(memberId);
        PlayList playList = playListService.findVerifiedPlayList(playListId);
        List<PlayListLike> likes = getAllLikesForMemberAndPlayList(memberId, playListId);

        for (PlayListLike like : likes) {
            if (member.getMemberId().equals(like.getMember().getMemberId()) || member.getRoles().contains("admin")) {
                playListLikeRepository.delete(like);
            } else throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }
    }

    // 조회
    public PlayListLike getLike(long likeId){
        return playListLikeRepository.findById(likeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PlAYLIST_LIKE_NOT_FOUND));
    }

    // 모든 멤버, 플리 아이디 조회
    public List<PlayListLike> getAllLikesForMemberAndPlayList(Long memberId, Long playListId) {
        return playListLikeRepository.findByMemberMemberIdAndPlayListPlayListId(memberId, playListId);
    }

     // 이미 좋아요를 눌렀는지 조회
    public List<PlayListLike> isAlreadyLiked(Long memberId){
        return playListLikeRepository.findByMemberMemberId(memberId);
    }

    // {playlist-id} like 전체 조회
    public List<PlayListLike> getLikesByPlayListId(Long playListId){
        return playListLikeRepository.findByPlayListPlayListId(playListId);
    }
}
