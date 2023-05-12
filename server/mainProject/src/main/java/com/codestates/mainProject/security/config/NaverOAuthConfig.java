package com.codestates.mainProject.security.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import java.util.Collections;
import java.util.List;

//@Configuration
//public class NaverOAuthConfig {
//
//    @Value("${N_CLIENT_ID}")
//    private String clientId;
//
//    @Value("${N_CLIENT_SECRET}")
//    private String clientSecret;
//
//
//    private String redirectUri="http://localhost:8080/login/oauth2/code/naver";
//
//    @Bean
//    public OAuth2AuthorizedClientService authorizedClientService(
//            ClientRegistrationRepository clientRegistrationRepository) {
//        return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
//    }
//
//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        List<ClientRegistration> registrations = Collections.singletonList(naverClientRegistration());
//        return new InMemoryClientRegistrationRepository(registrations);
//    }
//
//    private ClientRegistration naverClientRegistration() {
//        return ClientRegistration.withRegistrationId("naver")
//                .clientId(clientId)
//                .clientSecret(clientSecret)
//                .clientAuthenticationMethod(ClientAuthenticationMethod.POST)
//                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                .redirectUri(redirectUri)
//                .scope("email", "name" , "profile_image")
//                .authorizationUri("https://nid.naver.com/oauth2.0/authorize")
//                .tokenUri("https://nid.naver.com/oauth2.0/token")
//                .userInfoUri("https://openapi.naver.com/v1/nid/me")
//                .userNameAttributeName("response")
//                .clientName("Naver")
//                .build();
//    }
//
//}
