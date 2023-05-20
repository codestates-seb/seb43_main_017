package com.codestates.mainProject.security.config;


import com.codestates.mainProject.security.auth.filter.JwtAuthenticationFilter;
import com.codestates.mainProject.security.auth.filter.JwtVerificationFilter;
import com.codestates.mainProject.security.auth.handler.*;
import com.codestates.mainProject.security.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.security.auth.utils.CustomAuthorityUtils;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;


import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Configuration
@RequiredArgsConstructor
//@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    private final MemberRepository memberRepository;

//    @Value("${G_CLIENT_ID}")
//    private String googleClientId;
//
//    @Value("${G_CLIENT_SECRET}")
//    private String googleClientSecret;
//    @Value("${N_CLIENT_ID}")
//    private String naverClientId;
//
//    @Value("${N_CLIENT_SECRET}")
//    private String naverClientSecret;
//    @Value("${K_CLIENT_ID}")
//    private String kakaoClientId;
//    @Value("${K_CLIENT_SECRET}")
//    private String kakaoClientSecret;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors().configurationSource(corsConfigurationSource())  //기본설정의 cors가 아닌 아래 @Bean으로 등록한 cors설정 적용
                .and()
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // # member관련
                        .antMatchers(HttpMethod.POST, "/members/signup").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/login").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/logout").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/members/image/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/members/info").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/members/musics/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/members/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/status/**").hasAnyRole( "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasAnyRole("USER", "ADMIN")

                        // # music 관련
                        .antMatchers(HttpMethod.GET, "/musics/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/musics/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/musics/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/musics/**").hasRole("ADMIN")

                        // #playlist 관련
                        .antMatchers(HttpMethod.GET, "/playlists/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/playlists/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/playlists/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/playlists/**").hasAnyRole("USER", "ADMIN")


                        // #playlistcomment 관련
                        .antMatchers(HttpMethod.GET, "/playlist-comments/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/playlist-comments/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/playlist-comments/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/playlist-comments/**").hasAnyRole("USER", "ADMIN")


                        // #musicComment 관련
                        .antMatchers(HttpMethod.GET, "/music-comments/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/music-comments/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/music-comments/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/music-comments/**").hasAnyRole("USER", "ADMIN")


                        // #musicLike 관련
                        .antMatchers(HttpMethod.GET, "/music-like/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/music-like/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/music-like/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/music-like/**").hasAnyRole("USER", "ADMIN")


                        // #tag 관련 (musicTag포함)
                        .antMatchers(HttpMethod.GET, "/tags/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/tags/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/tags/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/tags/**").hasRole("ADMIN")
                        .anyRequest().permitAll()

                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService))
//                        .redirectionEndpoint(redirectionEndpoint -> redirectionEndpoint
//                                .baseUri("/login/oauth2/code/*")
//                        )
//                        .clientRegistrationRepository(clientRegistrationRepository())
//                        .clientRegistrationRepository(clientRegistrationRepository())
//                        .userInfoEndpoint(userInfo -> userInfo
//                                .userService(kakaoOAuth2UserService)
//                                .userService(naverOAuth2UserService)
//                        )
                );

        return httpSecurity.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));   // (8-1)
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {


        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, memberRepository);



            // 상속받은 AbstractAuthenticationProcessingFilter 클래스의 FilterProcessesUrl 설정해주기 (설정안할시 default: /Login)
            // 즉, 로그인 요청할때 이 Url로 요청해야함, 우리가 기존에 UsernamePassword 필터 사용시에는 /process_login 하던부분임
            // post로 요청을 보내든 get으로 요청을 보내든 로그인이 됨.


            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            // Exception 추가
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());


            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        List<ClientRegistration> registrations = Stream.of("google", "naver", "kakao")
//                .map(this::getClientRegistration)
//                .filter(Objects::nonNull)
//                .collect(Collectors.toList());
//        return new InMemoryClientRegistrationRepository(registrations);
//    }

//    private ClientRegistration getClientRegistration(String client) {
//        if (client.equals("google")) {
//            return CommonOAuth2Provider.GOOGLE.getBuilder(client)
//                    .clientId(googleClientId)
//                    .clientSecret(googleClientSecret)
//                    .scope("email", "profile")
//                    .build();
//        }
//        if (client.equals("naver")) {
//            return ClientRegistration.withRegistrationId(client)
//                    .clientId(naverClientId)
//                    .clientSecret(naverClientSecret)
//                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                    .redirectUri("http://localhost:8080/login/oauth2/code/naver")
//                    .authorizationUri("https://nid.naver.com/oauth2.0/authorize")
//                    .tokenUri("https://nid.naver.com/oauth2.0/token")
//                    .userInfoUri("https://openapi.naver.com/v1/nid/me")
//                    .userNameAttributeName("response")
//                    .clientName("Naver")
//                    .scope("name", "email", "profile_image")
//                    .build();
//        }
//        if (client.equals("kakao")) {
//            return ClientRegistration.withRegistrationId(client)
//                    .clientId(kakaoClientId)
//                    .clientSecret(kakaoClientSecret)
//                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                    .redirectUri("http://localhost:8080/login/oauth2/code/kakao")
//                    .authorizationUri("https://kauth.kakao.com/oauth/authorize")
//                    .tokenUri("https://kauth.kakao.com/oauth/token")
//                    .userInfoUri("https://kapi.kakao.com/v2/user/me")
//                    .userNameAttributeName("id")
//                    .clientName("Kakao")
//                    .scope("profile_nickname", "account_email")
//                    .build();
//        }
//        return null;
//    }



}
