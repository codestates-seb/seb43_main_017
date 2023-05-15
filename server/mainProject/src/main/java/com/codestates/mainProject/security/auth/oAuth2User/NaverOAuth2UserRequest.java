//package com.codestates.mainProject.security.auth.oAuth2User;
//
//import org.springframework.security.oauth2.client.registration.ClientRegistration;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest.Builder;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequestUtils;
//import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
//
//import java.util.Set;
//
//public class NaverOAuth2UserRequest extends OAuth2AuthorizationRequest {
//
//    public NaverOAuth2UserRequest(ClientRegistration clientRegistration, String redirectUri,
//                                  Set<String> scopes, String state) {
//        Builder builder = toBuilder(clientRegistration, redirectUri, scopes);
//        builder.additionalParameters(
//                "access_type", "offline",
//                OAuth2ParameterNames.REGISTRATION_ID, clientRegistration.getRegistrationId()
//        ).state(state); // additionalParameters()와 state() 메서드를 호출하여 builder 작업을 처리합니다.
//        OAuth2AuthorizationRequest request = builder.build();
//        super(request.getClientRegistration(), request.getAuthorizationUri(),
//                request.getResponseType(), request.getRedirectUri(), request.getScopes(),
//                request.getState(), request.getAdditionalParameters());
//    }
//}
//
