package com.codestates.mainProject.musicTag.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;

import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.service.MusicService;

import com.codestates.mainProject.musicTag.dto.MusicTagDto;
import com.codestates.mainProject.musicTag.entity.MusicTag;
import com.codestates.mainProject.musicTag.repository.MusicTagRepository;

import com.codestates.mainProject.tags.entity.Tag;
import com.codestates.mainProject.tags.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class MusicTagService {

    private final MusicTagRepository musicTagRepository;
    private final MusicService musicService;
    private final MemberService memberService;
    private final TagService tagService;


    public MusicTag createMusicTag(long tagId,Long loginId, long musicId) {

        verifyPermission(loginId);                     //로그인한 아이디가 관리자인경우에만 가능, 아닐 경우 오류처리
        verifyExistMusicTag(tagId, musicId);         //태그이름과, 뮤직Id를 통해 해당 뮤직태크Id가 존재하는지 체그, 이미 존재한다면 오류처리

        Music findMusic = musicService.findMusicById(musicId);
        Tag findTag = tagService.findVerifiedTag(tagId);
        String tagName = findTag.getName();

        MusicTag musicTag = new MusicTag();
        musicTag.setName(tagName);
        musicTag.setMusic(findMusic);
        musicTag.setTag(findTag);

        findMusic.addMusicTag(musicTag);

        return musicTagRepository.save(musicTag);
    }

    public void deleteMusicTag(long tagId,Long loginId, long musicId) {
        verifyPermission(loginId);

        MusicTag musicTag =findVerifiedMusicTag(tagId, musicId);
        Music findMusic = musicService.findMusicById(musicId);

        findMusic.removeMusicTag(musicTag);

        musicTagRepository.delete(musicTag);

    }

    public void deleteMusicTagAll(Long loginId, long musicId){
        verifyPermission(loginId);

        Music findMusic = musicService.findMusicById(musicId);
        Optional<List<MusicTag>> optionalMusicTags = musicTagRepository.findByMusicMusicId(musicId);
        List<MusicTag> musicTags = optionalMusicTags.orElse(new ArrayList<>());
        for(MusicTag musicTag : musicTags){
            findMusic.removeMusicTag(musicTag);
            musicTagRepository.delete(musicTag);
        }
    }

    public MusicTag findVerifiedMusicTag(long tagId, long musicId) {
        Optional<MusicTag> optionalMusicTag = musicTagRepository.findByTagTagIdAndMusicMusicId(tagId,musicId);
        MusicTag findMusicTag = optionalMusicTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return findMusicTag;
    }

    public List<MusicTagDto> getMusicTags(long musicId) {
        Music findMusic = musicService.findMusicById(musicId);
        List<MusicTag> musicTags = findMusic.getMusicTags();
        List<MusicTagDto> response = new ArrayList<>();

        for (MusicTag musicTag : musicTags) {
            MusicTagDto musicTagDto = new MusicTagDto(
                    musicTag.getMusicTagId(),
                    musicTag.getMusic().getMusicId(),
                    musicTag.getTag().getTagId(),
                    musicTag.getTag().getName()
            );

            response.add(musicTagDto);
        }

        return response;
    }

    public void verifyExistMusicTag(long tagId, long musicId) {
        Music findMusic = musicService.findMusicById(musicId);

        Optional<MusicTag> optionalMusicTag = findMusic.getMusicTags().stream().filter(musicTag -> musicTag.getTag().getTagId().equals(tagId)).findFirst();

        if (optionalMusicTag.isPresent())
            throw new BusinessLogicException(ExceptionCode.MUSIC_TAG_EXISTS);
    }

    public void verifyPermission(Long loginId) {
        Member findMember = memberService.findVerifiedMember(loginId);
        if (!findMember.getRoles().contains("ADMIN")) {
            {
                throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_DELETING_COMMENT);
            }
        }
    }

}

