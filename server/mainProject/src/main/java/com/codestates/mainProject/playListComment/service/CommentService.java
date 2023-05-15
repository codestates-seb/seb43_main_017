package com.codestates.mainProject.playListComment.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.playListComment.entity.PlayListComment;
import com.codestates.mainProject.playListComment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final PlayListService playListService;

    // 댓글 생성
    public PlayListComment createComment(Long memberId, Long playListId, String content){
        Member member = memberService.findMember(memberId);
        PlayList playList = playListService.findVerifiedPlayList(playListId);

        PlayListComment comment = new PlayListComment();
        comment.setContent(content);
        comment.setMember(member);
        comment.setPlayList(playList);

        return commentRepository.save(comment);
    }

    // 조회
    public PlayListComment getComment(long commentId){
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    // {playlist-id} 댓글 전체 조회
    public List<PlayListComment> getCommentsByPlaylistId(long playListId){
        return commentRepository.findByPlayListId(playListId);
    }

    // 수정
    public PlayListComment updateComment(long memberId, long commentId, String content){
        PlayListComment comment = getComment(commentId);
        Member member = memberService.findMember(memberId);

        if (!member.getMemberId().equals(comment.getMember().getMemberId()) && !member.getRoles().contains("admin")){
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }

        comment.setContent(content);
        return commentRepository.save(comment);
    }

    // 삭제
    public void deleteComment(long memberId, long commentId){
        PlayListComment comment = getComment(commentId);
        Member member = memberService.findMember(memberId);

        if (!member.getMemberId().equals(comment.getMember().getMemberId()) && !member.getRoles().contains("admin")){
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }
        commentRepository.delete(comment);
    }
}
