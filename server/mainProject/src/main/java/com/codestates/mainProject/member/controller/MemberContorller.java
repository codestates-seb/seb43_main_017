package com.codestates.mainProject.member.controller;

import com.codestates.mainProject.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.dto.MemberDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.mapper.MemberMapper;
import com.codestates.mainProject.member.service.MemberService;

import com.codestates.mainProject.response.MultiResponseDto;
import com.codestates.mainProject.response.SingleResponseDto;
import com.codestates.mainProject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출

        jwtTokenizer.addToTokenBlackList(jws);     //블랙리스트에 jws 추가, 접근 막음

        return ResponseEntity.ok().body("Successfully logged out");


    }

    @PostMapping("/image/{member-id}")
    public ResponseEntity postImage(@PathVariable("member-id") @Positive long memberId,
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

    @PatchMapping("/status/{member-id}")     // 탈퇴 취소하는 컨트롤러
    public ResponseEntity patchMemberStatus(@PathVariable("member-id") @Positive long memberId){
        memberService.updateStatus(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){

        Member deleteMember  = memberService.deleteMember(memberId);

        MemberDto.ResponseDto response = mapper.memberToResponse(deleteMember);


        return new ResponseEntity<>((response), HttpStatus.OK);

    }


    @GetMapping("/home")
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
