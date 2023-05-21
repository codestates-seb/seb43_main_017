package com.codestates.mainProject.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PageConverter {

    public <T> PageInfo<T> toPageInfo(Page<T> page) {
        List<T> content = page.getContent();
        PageInfo<T> pageInfo = new PageInfo<>();
        pageInfo.setContent(content);
        pageInfo.setPageInfo(new PageInfo.PagingInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages()));
        return pageInfo;
    }

    @Getter
    @Setter
    public static class PageInfo<T> {
        private List<T> content;
        private PagingInfo pageInfo;

        @Getter
        @Setter
        public static class PagingInfo {
            private int page;
            private int size;
            private long totalElements;
            private int totalPages;

            public PagingInfo(int page, int size, long totalElements, int totalPages) {
                this.page = page;
                this.size = size;
                this.totalElements = totalElements;
                this.totalPages = totalPages;
            }
        }
    }
}
