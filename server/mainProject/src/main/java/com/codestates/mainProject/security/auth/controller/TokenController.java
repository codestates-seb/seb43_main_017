package com.codestates.mainProject.security.auth.controller;


import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.security.auth.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TokenController {

    private final TokenService tokenService;
    private final MemberRepository memberRepository;

    private final MemberService memberService;

    @PostMapping("/token/refresh")  //refresh 토큰을 이용한 access 토큰 재발급
    public ResponseEntity<String> refreshAccessToken(HttpServletRequest request) {
        String refreshTokenHeader = request.getHeader("Refresh");

        Jws<Claims> claims = tokenService.checkRefreshToken(refreshTokenHeader);
        String email = claims.getBody().getSubject();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if(optionalMember.isPresent()){
            Member member = optionalMember.get();
            String accessToken = memberService.delegateAccessToken(member);

            return ResponseEntity.ok().header("Authorization", "Bearer " + accessToken).body("Successfully refresh");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Member not found");
        }

    }

    @PostMapping("/token/check")  //access 토큰 검증
    public ResponseEntity<String> checkAccessToken(HttpServletRequest request) {
        String refreshTokenHeader = request.getHeader("Authorization");

        Jws<Claims> claims = tokenService.checkAccessToken(refreshTokenHeader);


        long currentTime = System.currentTimeMillis();
        long jwsTime = claims.getBody().getExpiration().getTime();
        long remainingTimeMillis = jwsTime - currentTime;

        long hours = TimeUnit.MILLISECONDS.toHours(remainingTimeMillis);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(remainingTimeMillis) % 60;
        long seconds = TimeUnit.MILLISECONDS.toSeconds(remainingTimeMillis) % 60;

        String remainingTime = hours + "시간 " + minutes + "분 " + seconds + "초";

        return ResponseEntity.ok().body("현재 토큰의 잔여 시간은 " + remainingTime + " 입니다");
    }



}
