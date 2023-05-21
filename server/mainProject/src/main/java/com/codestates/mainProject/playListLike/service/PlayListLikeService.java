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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    public PlayListLike addLike(Long memberId, Long playListId){
        Member member = memberService.findMember(memberId);
        PlayList playList = playListService.findVerifiedPlayList(playListId);

        PlayListLike like = new PlayListLike();
        like.setMember(member);
        like.setPlayList(playList);

        playList.addPlayListLike(like);
        member.addLikedPlayLists(like);

        return playListLikeRepository.save(like);
    }

    // 좋아요 삭제
    public void cancelLike(Long memberId, Long playListId){
        Member member = memberService.findMember(memberId);
        PlayList playList = playListService.findVerifiedPlayList(playListId);
        List<PlayListLike> likes = getAllLikesForMemberAndPlayList(memberId, playListId);

        for (PlayListLike like : likes) {
            if (member.getMemberId().equals(like.getMember().getMemberId())) {
                playListLikeRepository.delete(like);
                playList.removePlayListLike(like);
                member.removeLikedPlayLists(like);
            } else throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }
    }

    // 조회
    public PlayListLike getLike(long likeId){
        return playListLikeRepository.findById(likeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PlAYLIST_LIKE_NOT_FOUND));
    }

//    // {playlist-id} like 전체 조회
//    public List<PlayListLike> getLikesByPlayListId(Long playListId){
//        return playListLikeRepository.findByPlayListPlayListId(playListId);
//    }

    // 유저 좋아요 여부
    public Page<PlayListLike> getMemberLikes(long memberId, Pageable pageable) {
        Member member = memberService.findMember(memberId);
        return playListLikeRepository.findAllByMember(member, pageable);
    }

    // 모든 멤버, 플리 아이디 조회
    public List<PlayListLike> getAllLikesForMemberAndPlayList(Long memberId, Long playListId) {
        return playListLikeRepository.findByMemberMemberIdAndPlayListPlayListId(memberId, playListId);
    }
}
