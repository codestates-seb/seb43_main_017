package com.codestates.mainProject.member.service;


import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.*;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
public class OAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    MemberRepository memberRepository;
    HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        //서비스 구분을 위한 작업 (구글, 네이버)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        String email;
        Map<String, Object> response = oAuth2User.getAttributes();

        if(registrationId.equals("naver")) {
            Map<String, Object> hash = (Map<String, Object>)response.get("response");
            email = (String) hash.get("email");

        } else if(registrationId.equals("google")){
            email = (String) response.get("email");

        }else {
            throw new OAuth2AuthenticationException("허용되지 않는 인증입니다.");
        }

        Member member;
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if(optionalMember.isPresent()){
            member = optionalMember.get();
        }else {
            member = new Member();
            member.setEmail(email);
            member.setRoles(Collections.singletonList("member"));
            memberRepository.save(member);
        }
        httpSession.setAttribute("member",member);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRoles().toString()))
                , oAuth2User.getAttributes()
                , userNameAttributeName
        );


    }

}
