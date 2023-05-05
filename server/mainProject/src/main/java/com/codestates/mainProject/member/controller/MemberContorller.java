package com.codestates.mainProject.member.controller;

import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberContorller {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostDto requestBody) {
        Member member = mapper.postToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("/login/oauth2/code/google")
    public String handleGoogleOAuth2Callback(HttpServletRequest request) {
        // OAuth2 인증 결과를 처리하는 코드를 작성합니다.
        // authorizedClientService를 사용하여 인증 정보를 가져올 수 있습니다.
        return "redirect:/"; // 처리 결과에 따라 적절한 페이지로 리다이렉트합니다.
    }



}
