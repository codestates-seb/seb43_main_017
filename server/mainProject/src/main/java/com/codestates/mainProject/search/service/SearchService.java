package com.codestates.mainProject.search.service;

import com.codestates.mainProject.music.dto.MusicDto;
import com.codestates.mainProject.music.entity.Music;
import com.codestates.mainProject.music.repository.MusicRepository;
import com.codestates.mainProject.playList.dto.PlayListDto;
import com.codestates.mainProject.playList.entity.PlayList;
import com.codestates.mainProject.playList.repository.PlayListRepository;
import lombok.RequiredArgsConstructor;
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
    public List<MusicDto.ResponseDto> findMusicByKeyword(String keyword) {
        return musicRepository.findMusicByKeyword(keyword);
    }

    // playListName 이 검색어와 일치하는 playList를 조회
    public List<PlayListDto.ResponseDto> findPlayListByTitle(String title) {
        List<PlayList> playLists = playListRepository.findByTitleContaining(title);

        return playLists.stream().map(PlayListDto.ResponseDto::new).collect(Collectors.toList());
    }

    // 사용자 선택한 태그를 가진 music을 조회
    public List<MusicDto.ResponseDto> findMusicByTags(List<String> tags) {
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

        List<Music> musicList = query.getResultList();

        return musicList.stream()
                .map(music -> new MusicDto.ResponseDto(music))
                .collect(Collectors.toList());
    }
}
