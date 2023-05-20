package com.codestates.mainProject.tags.service;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.tags.dto.TagDto;
import com.codestates.mainProject.tags.entity.Tag;
import com.codestates.mainProject.tags.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Tag createTag(TagDto.PostDto postDto){
        Tag tag = new Tag();
        tag.setName(postDto.getName());
        tag.setCategory(postDto.getCategory());

        return tagRepository.save(tag);
    }

    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    public List<Tag> getTagsByCategory(String category) {
        return tagRepository.findByCategory(category);
    }

    public List<TagDto.ResponseDto> getTagResponses(List<Tag> tags){
        List<TagDto.ResponseDto> responseDtoList = tags.stream()
                .map(tag -> {
                    TagDto.ResponseDto responseDto = new TagDto.ResponseDto();
                    responseDto.setId(tag.getTagId());
                    responseDto.setName(tag.getName());
                    responseDto.setCategory(tag.getCategory());
                    return responseDto;
                }) .collect(Collectors.toList());

        return responseDtoList;
    }

    public void deleteTag(long tagId) {
        Tag findTag = findVerifiedTag(tagId);
        tagRepository.delete(findTag);
    }


    public Tag findVerifiedTag(long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag findTag = optionalTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findTag;
    }
}
