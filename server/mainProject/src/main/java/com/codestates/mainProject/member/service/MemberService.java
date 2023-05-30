package com.codestates.mainProject.member.service;


import com.codestates.mainProject.memberMusic.entity.MemberMusic;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import com.codestates.mainProject.musicLike.entity.MusicLike;
import com.codestates.mainProject.musicLike.repository.MusicLikeRepository;
import com.codestates.mainProject.musicTag.entity.MusicTag;
import com.codestates.mainProject.musicTag.repository.MusicTagRepository;
import com.codestates.mainProject.security.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.security.auth.utils.CustomAuthorityUtils;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.image.FileStorageService;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
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

    private final MusicTagRepository musicTagRepository;
    private final MusicRepository musicRepository;


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

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        String newName = verifyExistName(member.getName());
        member.setName(newName);

        return memberRepository.save(member);
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

    public List<Music> getRecommendMusics(Long loginId) {
        List<Music> recommendedMusics = new ArrayList<>();

        Map<Long, Integer> tagCountMap = new HashMap<>();

        Member member = findMember(loginId);


        if(member.getMemberMusics().size()!=0) {            //유저가 좋아요를 하나도 안 누른 상태가 아니면 추천
            // 멤버가 가진 모든 태그의 출현 빈도 계산
            for (MemberMusic memberMusic : member.getMemberMusics()) {
                for (MusicTag musicTag : memberMusic.getMusic().getMusicTags()) {
                    Long tagId = musicTag.getTag().getTagId();
                    tagCountMap.put(tagId, tagCountMap.getOrDefault(tagId, 0) + 1);
                }
            }

            // 태그 출현 빈도에 따라 정렬
            List<Long> sortedTags = tagCountMap.entrySet().stream()
                    .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());

            // 태그를 기반으로 음악 추천
            for (Long tagId : sortedTags) {
                List<MusicTag> musicTags = musicTagRepository.findByTagTagIdOrderByMusicMusicLikeCountDesc(tagId).orElse(new ArrayList<>());
                for (MusicTag musicTag : musicTags) {
                    Music music = musicTag.getMusic();
                    if(!recommendedMusics.contains(music)) {         //이미 들어가 있는 음악이 있을 경우 추가x
                        recommendedMusics.add(music);
                        if (recommendedMusics.size() >= 6) {
                            break;
                        }
                    }
                }
                if (recommendedMusics.size() >= 6) {
                    break;
                }
            }

            return recommendedMusics;
        }else{
            List<Music> musics = musicRepository.findTop6ByOrderByMusicLikeCountDesc();    //좋아요한 노래가 하나도 없으면 하트수 많은 노래순으로 6개출력
            return musics;
        }
    }
}
