//package com.codestates.mainProject.security.auth.userdetails;
//
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class NaverOAuth2UserService implements OAuth2UserService<NaverOAuth2UserRequest, NaverOAuth2User> {
//
//    private static final String USER_NAME_ATTRIBUTE_KEY = "response";
//
//    private final RestTemplate restTemplate;
//
//    public NaverOAuth2UserService() {
//        this.restTemplate = new RestTemplate();
//    }
//
//    @Override
//    public NaverOAuth2User loadUser(NaverOAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        String accessToken = userRequest.getAccessToken();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer " + accessToken);
//
//        HttpEntity<?> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<NaverOAuth2UserInfo> response = restTemplate.exchange(
//                userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri(),
//                HttpMethod.GET, entity, NaverOAuth2UserInfo.class);
//
//        NaverOAuth2UserInfo userInfo = response.getBody();
//
//        if (userInfo == null) {
//            throw new OAuth2AuthenticationException(new OAuth2Error("invalid_user_info_response", "An error occurred while attempting to retrieve the user profile."));
//        }
//
//        Map<String, Object> userAttributes = new HashMap<>();
//        userAttributes.put("id", userInfo.getId());
//        userAttributes.put("name", userInfo.getName());
//        userAttributes.put("email", userInfo.getEmail());
//        userAttributes.put("profileImage", userInfo.getProfileImage());
//
//        return new NaverOAuth2User(userAttributes, userRequest.getAccessToken());
//    }
//}
//
