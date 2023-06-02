package com.codestates.mainProject.security.auth.handler;

import com.codestates.mainProject.security.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.security.auth.utils.CustomAuthorityUtils;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String name = (String) oAuth2User.getAttributes().get("name");
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String image = (String) oAuth2User.getAttributes().get("picture");
        if (image == null) {
            image = (String) oAuth2User.getAttributes().get("profile_image");
        }


        // 얻은 email 주소로 권한 List 만들기
        List<String> authorities = authorityUtils.createRoles(email);

        Member member = buildOAuth2Member(name, email, image);

        if(!memberService.existsByEmail(member.getEmail())) {
            Member savedMember = saveMember(member);
            redirect(request, response, savedMember, authorities); // 리다이렉트를 하기위한 정보들을 보내줌
        } else {
            Member findMember = memberService.findVerifiedMember(member.getEmail());
            redirect(request, response, findMember, authorities);
        }

    }

    private Member buildOAuth2Member(String name, String email, String image) {
        Member member = new Member();
        member.setName(name);
        member.setEmail(email+"1");
        member.setImage(image);

        return member;
    }


    private Member saveMember(Member member) {

        return memberService.createMemberOAuth2(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(member, authorities);
        String refreshToken = delegateRefreshToken(member);

        String uri = createURI(request, accessToken, refreshToken).toString();

        String headerValue = "Bearer " + accessToken;
        response.setHeader("Authorization", headerValue);
        response.setHeader("Refresh", refreshToken);

        getRedirectStrategy().sendRedirect(request, response, uri);

    }

    private String delegateAccessToken(Member member, List<String> authorities) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("roles", authorities);

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {


        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken) {

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        String serverName = request.getServerName();

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("uncoversound.com")
                .port(443)
                //.port(80)   -> aws로 배포했을 때 싸용
//                .port(3000)   //-> local 테스트용
                .path("/oauthloading")            //리다이렉트 주소 (토큰이 포함된 url 을 받는 주소)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}


