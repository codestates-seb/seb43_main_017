//package com.codestates.mainProject.security.auth.oAuth2User;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.oauth2.core.OAuth2AccessToken;
//import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
//import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
//
//import java.util.*;
//
//public class NaverOAuth2User implements OAuth2User, OAuth2AuthenticatedPrincipal {
//
//    private final Map<String, Object> attributes;
//
//    private final Set<GrantedAuthority> authorities;
//
//    public NaverOAuth2User(NaverOAuth2UserRequest userRequest) {
//        this.attributes = NaverOAuth2UserInfoUtils.getUserInfo(userRequest);
//        this.authorities = new HashSet<>(Collections.singletonList(new OAuth2UserAuthority(attributes)));
//    }
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        return attributes;
//
