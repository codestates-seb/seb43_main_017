package com.codestates.mainProject.musicComment.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.musicComment.entity.MusicComment;
import com.codestates.mainProject.musicComment.repository.MusicCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MusicCommentService {

    private final MusicCommentRepository musicCommentRepository;
    private final MemberService memberService;
    private final MusicService musicService;

    // 댓글 생성
    public MusicComment createComment(Long memberId, Long musicId, String content) {
        Member member = memberService.findMember(memberId);
        Music music = musicService.findMusicById(musicId);

        MusicComment comment = new MusicComment();
        comment.setContent(content);
        comment.setMember(member);
        comment.setMusic(music);

        return musicCommentRepository.save(comment);
    }

    // 댓글 조회
    public MusicComment getComment(Long commentId) {
        return musicCommentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    // musicId를 입력받아 해당 music의 댓글 전체 조회
    public List<MusicComment> getCommentsByMusicId(long musicId) {
        return musicCommentRepository.findByMusicMusicId(musicId);
    }

    // 댓글 수정
    public MusicComment updateComment(Long memberId, Long commentId, String content) {
        MusicComment comment = getComment(commentId);
        Member member = memberService.findMember(memberId);

        if (!member.getMemberId().equals(comment.getMember().getMemberId()) && !member.getRoles().contains("admin")) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }

        comment.setContent(content);
        return musicCommentRepository.save(comment);
    }


    // 댓글 삭제
    public void deleteComment(Long memberId, Long commentId) {
        MusicComment comment = getComment(commentId);
        Member member = memberService.findMember(memberId);

        if (!member.getMemberId().equals(comment.getMember().getMemberId()) && !member.getRoles().contains("admin")) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_MUSIC);
        }

        musicCommentRepository.delete(comment);
    }
}

