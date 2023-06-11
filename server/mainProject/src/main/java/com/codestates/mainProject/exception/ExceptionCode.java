package com.codestates.mainProject.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    MEMBER_EXISTS(409, "회원이 존재합니다"),
    MEMBER_IS_DELETED(404, "탈퇴한 회원입니다"),

    MUSIC_EXISTS(409, "이미 등록된 음악입니다"),
    MUSIC_NOT_FOUND(404, "음악을 찾을 수 없습니다"),
    NO_PERMISSION_EDITTING_MUSIC(403, "관리자만 수정할 수 있습니다"),
    NO_PERMISSION_DELETING_MUSIC(403, "관리자만 삭제할 수 있습니다"),

    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다"),
    NO_PERMISSION_EDITING_COMMENT(403, "작성자만 수정할 수 있습니다"),
    NO_PERMISSION_DELETING_COMMENT(403, "작성자만 삭제할 수 있습니다"),

    NO_PERMISSION_DELETING_MUSIC_LIKE(403, "작성자만 취소할 수 있습니다"),

    MUSIC_LIKE_NOT_FOUND(404, "음악 추천을 찾을 수 없습니다"),

    PLAYLIST_NOT_FOUND(404, "플레이리스트를 찾을 수 없습니다"),
    NO_PERMISSION_EDITING_POST(403,"작성자만 수정할 수 있습니다"),
    NO_PERMISSION_DELETING_POST(403,"작성자만 삭제할 수 있습니다"),
    NO_PERMISSION_CREATING_POST(403, "회원만 작성 할 수 있습니다"),
    IMAGE_URL_ERROR(404, "음악 경로를 찾을 수 없습니다"),


    MEMBER_MUSIC_NOT_FOUND(404, "멤버 뮤직을 찾을 수 없습니다"),

    MEMBER_MUSIC_EXISTS(404, "멤버 뮤직이 이미 존재합니다"),
    PLAYLIST_MUSIC_NOT_FOUND(404, "플레이리스트 뮤직을 찾을 수 없습니다"),
    PLAYLIST_MUSIC_EXISTS(404, "플레이리스트 뮤직이 이미 존재합니다"),

    TAG_NOT_FOUND(404, "태그를 찾을 수 없습니다"),
    MUSIC_TAG_EXISTS(404, "같은 음악태그가 이미 존재합니다"),
    PLAYLIST_TAG_EXISTS(404, "같은 플레이리스트태그가 이미 존재합니다"),
    MAX_PLAYLIST_LIMIT_REACHED(403, "태그를 더 이상 추가할 수 없습니다"),
    JWT_TOKEN_EXPIRED(404, "토큰이 만료되었습니다");
    @Getter
    private int status;

    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}