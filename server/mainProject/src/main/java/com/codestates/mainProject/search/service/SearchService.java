package com.codestates.mainProject.search.service;

import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final MusicRepository musicRepository;
    private final PlayListRepository playListRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // musicName, artistName, albumName 중 검색어를 포함하는 music을 조회
    public Page<MusicDto.ResponseDto> findMusicByKeyword(String keyword, Pageable pageable) {
        return musicRepository.findMusicByKeyword(keyword, pageable);
    }

    // playListName 이 검색어와 일치하는 playList를 조회
    public Page<PlayListDto.ResponseDto> findPlayListByTitle(String title, Pageable pageable) {
        Page<PlayList> playLists = playListRepository.findByTitleContaining(title, pageable);

        return playLists.map(PlayListDto.ResponseDto::new);
    }

    // 사용자 선택한 태그를 가진 music을 조회
    public Page<MusicDto.ResponseDto> findMusicByTags(List<String> tags, Pageable pageable) {
        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("SELECT m FROM Music m WHERE ");
        for (int i = 0; i < tags.size(); i++) {
            queryBuilder.append("EXISTS (SELECT 1 FROM Music m2 JOIN m2.musicTags mt JOIN mt.tag t WHERE t.name = :tag")
                    .append(i)
                    .append(" AND m.id = m2.id)");
            if (i < tags.size() - 1) {
                queryBuilder.append(" AND ");
            }
        }

        TypedQuery<Music> query = entityManager.createQuery(queryBuilder.toString(), Music.class);
        for (int i = 0; i < tags.size(); i++) {
            query.setParameter("tag" + i, tags.get(i));
        }

        query.setFirstResult((pageable.getPageNumber()) * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        List<Music> musicList = query.getResultList();

        StringBuilder countQueryBuilder = new StringBuilder();
        countQueryBuilder.append("SELECT COUNT(m) FROM Music m WHERE ");
        for (int i = 0; i < tags.size(); i++) {
            countQueryBuilder.append("EXISTS (SELECT 1 FROM Music m2 JOIN m2.musicTags mt JOIN mt.tag t WHERE t.name = :tag")
                    .append(i)
                    .append(" AND m.id = m2.id)");
            if (i < tags.size() - 1) {
                countQueryBuilder.append(" AND ");
            }
        }

        TypedQuery<Long> countQuery = entityManager.createQuery(countQueryBuilder.toString(), Long.class);
        for (int i = 0; i < tags.size(); i++) {
            countQuery.setParameter("tag" + i, tags.get(i));
        }

        long total = countQuery.getSingleResult();

        List<MusicDto.ResponseDto> content = musicList.stream()
                .map(music -> new MusicDto.ResponseDto(music))
                .collect(Collectors.toList());

        return new PageImpl<>(content, pageable, total);
    }
}
