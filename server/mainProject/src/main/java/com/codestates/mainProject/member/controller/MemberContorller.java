package com.codestates.mainProject.member.controller;

import com.codestates.mainProject.member.dto.AuthLoginDto;
import com.codestates.mainProject.response.DataResponseDto;
import com.codestates.mainProject.security.auth.filter.JwtAuthenticationFilter;
import com.codestates.mainProject.security.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.service.MemberService;

import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.security.auth.loginResolver.LoginMemberId;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberContorller {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostDto requestBody) {
        Member member = mapper.postToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/oauth/signup")
    public ResponseEntity oAuth2Login(@RequestBody @Valid AuthLoginDto requesBody) {
        log.info("### oauth2 login start! ###");
        String accessToken = "";
        String refreshToken = "";

        Member member = mapper.AuthLoginDtoMember(requesBody);
        if(!memberService.existsByEmail(member.getEmail())) {
            member = memberService.createMemberOAuth2(member);
        } else {
            member = memberService.findVerifiedMember(member.getEmail());
        }

        accessToken = memberService.delegateAccessToken(member);
        refreshToken = memberService.delegateRefreshToken(member);
        return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken)
                .header("Refresh", refreshToken).build();
    }


    @GetMapping("/token")
    public ResponseEntity getMemberInfo(@LoginMemberId Long memberId){
        Member findMember = memberService.findMember(memberId);
        MemberDto.ResponseDto response = mapper.memberToResponse(findMember);

        return new ResponseEntity<>(
                new DataResponseDto<>(response), HttpStatus.OK);
    }


    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출

        jwtTokenizer.addToTokenBlackList(jws);     //블랙리스트에 jws 추가, 접근 막음

        return ResponseEntity.ok().body("Successfully logged out");


    }

    @PostMapping("/image")
    public ResponseEntity postImage(@LoginMemberId Long memberId,
                                    @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        Member savedMember = memberService.uploadImage(memberId, imageFile);
        MemberDto.ResponseDto response = mapper.memberToResponse(savedMember);

        return new ResponseEntity<>((response),HttpStatus.OK);
    }

    @GetMapping("/image/{member-id}")
    @ResponseBody
    public ResponseEntity<Resource> getImageFile(@PathVariable("member-id") @Positive long memberId){
        Resource file = memberService.findImage(memberId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                .header(HttpHeaders.CONTENT_DISPOSITION,"inline; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member findMember = memberService.findMember(memberId);
        MemberDto.ResponseDto response = mapper.memberToResponse(findMember);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                     @Positive @RequestParam(value = "size", defaultValue = "20") int size){
        Page<Member> pageMember = memberService.findMembers(page -1, size);
        List<Member> members = pageMember.getContent();
        List<MemberDto.ResponseDto> response = mapper.membersToResponses(members);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, pageMember), HttpStatus.OK);
    }


    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.PatchDto requestBody){
        if (memberId != requestBody.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
        }

        Member member = mapper.patchToMember(requestBody);
        Member updatedMember = memberService.updateMember(member);
        MemberDto.ResponseDto response = mapper.memberToResponse(updatedMember);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/status/active/{member-id}")     // Status를 Active로 변경
    public ResponseEntity patchStatusActive(@PathVariable("member-id") @Positive long memberId){
        Member activeMember =memberService.updateActiveStatus(memberId);

        MemberDto.ResponseDto response = mapper.memberToResponse(activeMember);

        return new ResponseEntity<>((response), HttpStatus.OK);
    }

    @PatchMapping("/status/delete/{member-id}")   // Status를 delete로 변경(로그인 못하게 막음)
    public ResponseEntity patchStatusDelete(@PathVariable("member-id") @Positive long memberId){

        Member deleteMember  = memberService.updateDeleteStatus(memberId);

        MemberDto.ResponseDto response = mapper.memberToResponse(deleteMember);

        return new ResponseEntity<>((response), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")    //Member 삭제
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PostMapping("/oauth/signup")
//    public ResponseEntity oAuth2Login(@RequestBody @Valid AuthLoginDto dto) {
//        log.info("### oauth2 login start! ###");
//        String accessToken = "";
//        String refreshToken = "";
//
//        Member member = mapper.AuthLoginDtoToUser(dto);
//        if (!memberService.existsByEmail(member.getEmail())) {
//            member = memberService.authUserSave(member);
//        } else {
//            member = memberService.checkUserExist(member.getEmail());
//        }
//
//        accessToken = memberService.delegateAccessToken(member);
//        refreshToken = memberService.delegateRefreshToken(member);
//        return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken)
//                .header("Refresh", refreshToken).build();
//    }
//
//    @PostMapping("/oauth/exist")
//    public ResponseEntity oauth2Exist(@RequestBody @Valid AuthExistDto dto) {
//        log.info("### oauth2 Exist start! ###");
//
//        Member member = memberService.checkUserExist(dto.getEmail());
//        memberService.checkGoogleAuth(member);
//
//        String accessToken = memberService.delegateAccessToken(member);
//        String refreshToken = memberService.delegateRefreshToken(member);
//
//        return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken)
//                .header("Refresh", refreshToken).build();
//    }




}
