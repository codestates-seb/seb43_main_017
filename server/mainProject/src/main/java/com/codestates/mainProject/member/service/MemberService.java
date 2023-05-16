package com.codestates.mainProject.member.service;

import com.codestates.mainProject.member.dto.NaverUserInfo;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.musicLike.repository.MusicLikeRepository;
import com.codestates.mainProject.security.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.security.auth.utils.CustomAuthorityUtils;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.image.FileStorageService;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.apache.http.impl.client.HttpClientBuilder;


import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


import java.util.*;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final FileStorageService fileStorageService;
    private final MusicLikeRepository musicLikeRepository;
    @Autowired
    private final JwtTokenizer jwtTokenizer;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        member.setName(verifyExistName(member.getName()));   //중복되는 이름 확인 후 중복되는 이름이 있을 시 뒤에 0~9999까지 번호를 붙여서 이름 저장

        // (3) 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // (4) 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);


        return savedMember;
    }

    public Member uploadImage(long memberId, MultipartFile imageFile) {
        Member findMember = findVerifiedMember(memberId);
        String fileUrl = fileStorageService.storeFile(imageFile);
        findMember.setImage(fileUrl);

        return memberRepository.save(findMember);
    }

    public Member createMemberOAuth2(Member member) {
        verifyExistEmail(member.getEmail());

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        String newName = verifyExistName(member.getName());
        member.setName(newName);
        return memberRepository.save(member);
    }
    // request 헤더에 있는 토큰을 통한 oauth2 유저 정보 받기
    public Member createNaverOAuth2(HttpServletRequest request) throws IOException {

        String authorizationHeader = request.getHeader("Authrozation");
        String accessToken = authorizationHeader.substring("Bearer ".length());

        NaverUserInfo userInfo = getNaverUserInfo(accessToken);
        Member member = new Member();
        member.setName(userInfo.getName());
        member.setEmail(userInfo.getEmail());
        if(!existsByEmail(member.getEmail())) {
            member = createMemberOAuth2(member);
        } else {
            member = findVerifiedMember(member.getEmail());
        }
        return member;
    }

    public NaverUserInfo getNaverUserInfo(String accessToken) throws IOException {
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet httpGet = new HttpGet("https://openapi.naver.com/v1/nid/me");
        httpGet.addHeader("Authorization", "Bearer " + accessToken);
        HttpResponse httpResponse = httpClient.execute(httpGet);
        String json = EntityUtils.toString(httpResponse.getEntity());
        JsonNode jsonNode = objectMapper.readTree(json);

        JsonNode responseNode = jsonNode.get("response");
        String email = responseNode.get("email").asText();
        String nickname = responseNode.get("nickname").asText();

        return new NaverUserInfo(email, nickname);
    }


    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public Page<Music> findLikedMusics(long memberId, int page, int size){
        Member findMember = findVerifiedMember(memberId);
        Pageable pageable = PageRequest.of(page, size);
        Page<MusicLike> musicLikes = musicLikeRepository.findAllByMember(findMember, pageable);
        return musicLikes.map(MusicLike::getMusic);
    }

//
//    public List<Music> findRecentMusics(long memberId) {
//        List<Music> subList = findMusics(memberId).subList(0, 3);
//        return subList;
//    }

    @Transactional
    public Member updateMember(Long loginId, Member member) {

        verifyPermission(loginId, member.getMemberId());

        Member findMember = findVerifiedMember(member.getMemberId());
        if(member.getName()!=findMember.getName()){                   //수정하려는 이름과 기존 이름이 다를 경우 수정하는 이름이 중복되는지 체크후 중복시 추가숫자를 덧붙여 이름수정
            findMember.setName(verifyExistName(member.getName()));
        }

        return findMember;
    }

    public Member updateActiveStatus(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        findMember.setStatus(Member.Status.MEMBER_ACTIVE);

        return findMember;
    }

    public Member updateDeleteStatus(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        findMember.setStatus(Member.Status.MEMBER_DELETE);
        return findMember;
    }

    public void deleteMember(Long loginId,long memberId ) {
        verifyPermission(loginId,memberId);

        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }


    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =  memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return findMember;
    }

    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember =  memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return findMember;
    }

    private void verifyExistEmail(String email) {
            Optional<Member> member = memberRepository.findByEmail(email);
            if (member.isPresent())
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    private String verifyExistName(String name){     // oauth2로 로그인 했을 때 같은 이름이 있을 때 1~1000까지의 랜덤숫자를 붙임
        String newName = name;
        Optional<Member> optionalMember = memberRepository.findByName(name);
        if(optionalMember.isPresent()){
            Random random = new Random();
            int randomNumber = random.nextInt(10000) + 1;
            newName = name + randomNumber;
        }

        return newName;
    }
    public void verifyPermission(Long loginId, long memeberId) {
        Member findMember = findVerifiedMember(loginId);
        if (!findMember.getRoles().contains("ADMIN")) {
            if (loginId != memeberId) {
                throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
            }
        }
    }

     public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
