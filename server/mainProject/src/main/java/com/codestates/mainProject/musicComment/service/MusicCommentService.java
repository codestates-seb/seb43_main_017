package com.codestates.mainProject.musicComment.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import com.codestates.mainProject.music.service.MusicService;
import com.codestates.mainProject.musicComment.entity.MusicComment;
import com.codestates.mainProject.musicComment.repository.MusicCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MusicCommentService {

    private final MusicCommentRepository musicCommentRepository;
    private final MemberService memberService;
    private final MusicService musicService;
    private final MusicRepository musicRepository;
    private final MemberRepository memberRepository;

    // 댓글 생성
    public MusicComment createComment(Long memberId, Long musicId, String content) {
        findVerifiedMusic(musicId);

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
        findVerifiedMusic(musicId);

        return musicCommentRepository.findByMusicMusicId(musicId);
    }

    // 댓글 수정
    public MusicComment updateComment(Long memberId, Long commentId, String content) {
        MusicComment comment = getComment(commentId);
        validateCommentAuthorOrAdmin(memberId, comment);

        comment.setContent(content);
        return musicCommentRepository.save(comment);
    }


    // 댓글 삭제
    public void deleteComment(Long memberId, Long commentId) {
        MusicComment comment = getComment(commentId);
        validateCommentAuthorOrAdmin(memberId, comment);

        musicCommentRepository.delete(comment);
    }

    private Music findVerifiedMusic(long musicId) {
        return musicService.findMusicById(musicId);
    }

    // 현재 접속한 유저가 해당 comment를 작성한 유저인지, 혹은 admin인지 분류하여 예외 발생
    private void validateCommentAuthorOrAdmin(Long memberId, MusicComment comment) {
        Member findMember = memberService.findMember(memberId);

        if (!findMember.getMemberId().equals(comment.getMember().getMemberId()) && !findMember.getRoles().contains("ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_COMMENT);
        }
    }
}

