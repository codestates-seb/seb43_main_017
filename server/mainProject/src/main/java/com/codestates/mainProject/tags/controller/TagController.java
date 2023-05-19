package com.codestates.mainProject.tags.controller;

import com.codestates.mainProject.tags.dto.TagDto;
import com.codestates.mainProject.tags.entity.Tag;
import com.codestates.mainProject.tags.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;

    @PostMapping
    public ResponseEntity<TagDto.ResponseDto> createTag(@Valid @RequestBody TagDto.PostDto postDto) {
        Tag createdTag = tagService.createTag(postDto);

        TagDto.ResponseDto responseDto = new TagDto.ResponseDto();
        responseDto.setId(createdTag.getTagId());
        responseDto.setName(createdTag.getName());

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TagDto.ResponseDto>> getTags() {
        List<Tag> tags = tagService.getTags();

        List<TagDto.ResponseDto> responseDtoList = tags.stream()
                .map(tag -> {
                    TagDto.ResponseDto responseDto = new TagDto.ResponseDto();
                    responseDto.setId(tag.getTagId());
                    responseDto.setName(tag.getName());
                    return responseDto;
                }) .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtoList);
    }

    @DeleteMapping("/{tag-id}")
    public ResponseEntity deleteTag(@PathVariable("tag-id") long tagId) {
        tagService.deleteTag(tagId);
        return ResponseEntity.ok("태그 삭제 완료");
    }
}
