package com.codestates.mainProject.playListLike.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.playListLike.dto.PlayListLikeDto;
import com.codestates.mainProject.playListLike.entity.PlayListLike;
import com.codestates.mainProject.playListLike.repository.PlayListLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlayListLikeService {
    private static final Logger logger = LoggerFactory.getLogger(PlayListService.class);
    private final PlayListLikeRepository playListLikeRepository;
    private final PlayListService playListService;
    private final MemberService memberService;



    @Transactional
    public PlayListLike insertLike(PlayListLikeDto playListLikeDto) throws Exception{
        try {
            Member member = memberService.findVerifiedMember(playListLikeDto.getMemberId());
            PlayList playList = playListService.findVerifiedPlayList(playListLikeDto.getPlayListId());

            if (playListLikeRepository.findByMemberAndPlayList(member, playList).isPresent())
                throw new BusinessLogicException(ExceptionCode.LIKE_EXISTS);

            PlayListLike playListLike = PlayListLike.builder()
                    .member(member)
                    .playList(playList)
                    .build();

            return playListLikeRepository.save(playListLike);

        } catch (Exception e){
            log.error("좋아요 클릭 오류");
            throw new RuntimeException("플레이리스트 좋아요 불가능");
        }
    }

    @Transactional
    public void deleteLike(PlayListLikeDto playListLikeDto){
        Member member = memberService.findVerifiedMember(playListLikeDto.getMemberId());
        PlayList playList = playListService.findVerifiedPlayList(playListLikeDto.getPlayListId());
        PlayListLike playListLike = playListLikeRepository.findByMemberAndPlayList(member, playList)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PlAYLIST_LIKE_NOT_FOUND));

        playListLikeRepository.delete(playListLike);
    }

//    public PlayListLike findVerifiedPlayListLike(long playListLikeId) {
//        Optional<PlayListLike> optionalPlayListLike = playListLikeRepository.findById(playListLikeId);
//        PlayListLike findPlayListLike = optionalPlayListLike.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.PlAYLIST_LIKE_NOT_FOUND));
//
//        return findPlayListLike;
//    }
}
