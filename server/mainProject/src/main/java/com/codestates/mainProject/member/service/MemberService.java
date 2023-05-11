package com.codestates.mainProject.member.service;

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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

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

    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());

        // (3) 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // (4) 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);


        return savedMember;
    }

    public Member uploadImage(long memberId, MultipartFile imageFile) throws IOException {
        Member findMember = findVerifiedMember(memberId);
        String filename = fileStorageService.storeFile(imageFile);
        findMember.setImage(filename);

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

    public Resource findImage(long  memberId){
        Member findMember = findVerifiedMember(memberId);
        String filename = findMember.getImage();
        Resource file = fileStorageService.loadFileAsResource(filename);

        return file;
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
    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));

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

    public void deleteMember(long memberId ) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }


    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =  memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return findMember;
    }

    private void verifyExistEmail(String email) {
        Optional<Member> user = memberRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    private String verifyExistName(String name){     // oauth2로 로그인 했을 때 같은 이름이 있을 때 1~1000까지의 랜덤숫자를 붙임
        String newName = name;
        Optional<Member> optionalMember = memberRepository.findByName(name);
        if(optionalMember.isPresent()){
            Random random = new Random();
            int randomNumber = random.nextInt(1000) + 1;
            newName = name + randomNumber;
        }

        return newName;
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

    // (6)
    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
