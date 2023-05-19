package com.codestates.mainProject.playListTag.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.service.PlayListService;
import com.codestates.mainProject.playListTag.dto.PlayListTagDto;
import com.codestates.mainProject.playListTag.entity.PlayListTag;
import com.codestates.mainProject.playListTag.repository.PlayListTagRepository;
import com.codestates.mainProject.tags.entity.Tag;
import com.codestates.mainProject.tags.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlayListTagService {
    private final PlayListTagRepository playListTagRepository;
    private final PlayListService playListService;
    private final MemberService memberService;
    private final TagService tagService;

    public PlayListTag createPlayListTag(long tagId, Long memberId, long playListId) {
        try {
            verifyExistPlayListTag(tagId, playListId);
            Member member = memberService.findMember(memberId);
            PlayList playList = playListService.findVerifiedPlayList(playListId);
            Tag tag = tagService.findVerifiedTag(tagId);
            String tagName = tag.getName();

            // 플리당 태그 3개 제한
            int maxLimit = 3;
            if (playList.getPlayListTags().size() >= maxLimit) {
                throw new BusinessLogicException(ExceptionCode.MAX_PLAYLIST_LIMIT_REACHED);
            }

            PlayListTag playListTag = new PlayListTag();
            playListTag.setMember(member);
            playListTag.setPlayList(playList);
            playListTag.setTag(tag);
            playListTag.setName(tagName);

            playList.addPlayListTag(playListTag);

            return playListTagRepository.save(playListTag);
        } catch (Exception e) {
            log.error("플레이리스트 태그 생성 실패", e);
            throw new RuntimeException();
        }
    }

    public List<PlayListTagDto> getPlayListTags(long playListId) {
        PlayList playList = playListService.findVerifiedPlayList(playListId);
        List<PlayListTag> tags = playList.getPlayListTags();
        List<PlayListTagDto> response = new ArrayList<>();

        for (PlayListTag playListTag : tags) {
            PlayListTagDto playListTagDto = new PlayListTagDto(
                    playListTag.getPlayListTagId(),
                    playListTag.getMember().getMemberId(),
                    playListTag.getPlayList().getPlayListId(),
                    playListTag.getTag().getTagId(),
                    playListTag.getTag().getName()
            );
            response.add(playListTagDto);
        }
        return response;
    }

    public void deletePlayListTag(long tagId, Long memberId, long playListId) {
        try {
            PlayListTag tag = findPlayListTag(tagId, playListId);
            PlayList playList = playListService.findVerifiedPlayList(playListId);
            Member member = memberService.findMember(memberId);

            if (!member.getMemberId().equals(tag.getMember().getMemberId())) {
                throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_POST);
            }

            playList.removePlayListTag(tag);
            playListTagRepository.delete(tag);
        } catch (Exception e) {
            log.error("플레이리스트 태그 삭제 실패", e);
            throw new RuntimeException();
        }
    }

    public PlayListTag findPlayListTag(long tagId, long playListId) {
        Optional<PlayListTag> optionalPlayListTag =
                playListTagRepository.findByTagTagIdAndPlayListPlayListId(tagId, playListId);
        PlayListTag findPlayListTag = optionalPlayListTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findPlayListTag;
    }

    public void verifyExistPlayListTag(long tagId, long playListId) {
        PlayList playList = playListService.findVerifiedPlayList(playListId);

        boolean tagExists = playList.getPlayListTags().stream()
                .anyMatch(playListTag -> playListTag.getTag().getTagId() == tagId);

        if (tagExists) throw new BusinessLogicException(ExceptionCode.PLAYLIST_TAG_EXISTS);
    }
}
