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
        responseDto.setCategory(createdTag.getCategory());

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TagDto.ResponseDto>> getTags() {
        List<Tag> tags = tagService.getTags();

        return ResponseEntity.ok(tagService.getTagResponses(tags));
    }

    @GetMapping("/{category}")
    public ResponseEntity<List<TagDto.ResponseDto>> getTagsByCategory(@PathVariable("category") String category ){
        List<Tag> tags = tagService.getTagsByCategory(category);

        return ResponseEntity.ok(tagService.getTagResponses(tags));

    }

    @DeleteMapping("/{tag-id}")
    public ResponseEntity deleteTag(@PathVariable("tag-id") long tagId) {
        tagService.deleteTag(tagId);
        return ResponseEntity.ok("태그 삭제 완료");
    }
}
