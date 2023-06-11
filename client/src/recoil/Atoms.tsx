import { atom } from 'recoil';
import { MusicData } from 'src/types/Musiclist';
import { MyplaylistData } from 'src/types/myplaylist';

/* 2023.05.10 뮤직리스트 카테고리 클릭시 태그 생성 상태 관리 - 홍혜란 */
export const selectedTagsState = atom<string[]>({
    key: 'selectedTagsState',
    default: [],
});

/* 2023.05.10 로그인이 발급받는 엑세스토큰 상태 관리 - 박수범 */
export const accessToken = atom<string | null>({
    key: 'accessToken',
    default: '',
});

/* 2023.05.14 선택된 메뉴 인덱스 - 김주비 */
export const selectIndexState = atom<number>({
    key: 'selectIndexState',
    default: Number(sessionStorage.getItem('index')),
});

/* 2023.05.14 선택된 메뉴 인덱스 (세션스토리지) - 김주비 */
export const localIndexState = atom<string | null>({
    key: 'localIndexState',
    default: sessionStorage.getItem('index'),
});

/* 2023.05.14 코멘트창 open 상태 관리 - 김주비 */
export const commentOpenState = atom<boolean>({
    key: 'commentOpenState',
    default: false,
});

/* 2023.05.15 하단사운드바 open 상태 관리 - 김주비 */
export const soundbarOpenState = atom<boolean>({
    key: 'soundbarOpenState',
    default: false,
});

/* 2023.05.20 음원 다운로드 링크 전역관리 - 김주비 */
export const downloadLink = atom<string>({
    key: 'downloadLink',
    default: '',
});

/* 2023.05.16 마이플레이리스트 메뉴 모달 창 상태관리 - 홍혜란 */
export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

/* 2023.05.16 뮤직리스트 출력 상태 관리 - 홍혜란 */
export const musicDataListState = atom<MusicData[]>({
    key: 'musicDataListState',
    default: [],
});

/* 2023.05.18 비디오 업로드 여부 상태관리 - 박수범 */
export const videouploadState = atom<boolean>({
    key: 'videoupload',
    default: false,
});

/* 2023.05.20 뮤직리스트 서치창 전역상태관리 - 김주비 */
export const showSearch = atom<boolean>({
    key: 'showSearch',
    default: false,
});

/* 2023.05.20 좋아요 상태 확인 - 김주비 */
export const likeState = atom<boolean>({
    key: 'likeState',
    default: false,
});

/* 2023.05.20 다운로드 가능상태 - 김주비 */
export const showDownloadState = atom<boolean>({
    key: 'ShowDownloadState',
    default: false,
});

/* 2023.05.20 musicId 전역관리 - 김주비 */
export const musicIdState = atom<string | undefined>({
    key: 'musicIdState',
    default: '',
});

/* 2023.05.20 서버요청 playlistComment url로 변경- 김주비 */
export const playlistCommentState = atom<boolean>({
    key: 'playlistCommentState',
    default: false,
});

/* 2023.05.16 마이플레이리스트 리스트 출력 관리 - 홍혜란 */
export const myplaylistState = atom<MyplaylistData[]>({
    key: 'myplaylistState',
    default: [],
});

/* 2023.05.22 마이플레이리스트 타이틀 수정 - 홍혜란 */
export const titleState = atom({
    key: 'titleState',
    default: '',
});

/* 2023.05.22 마이플레이리스트 내용 수정 - 홍혜란 */
export const bodyState = atom({
    key: 'bodyState',
    default: '',
});

/* 2023.05.22 마이플레이리스트 생성 - 홍혜란 */
export const modifyDataState = atom({
    key: 'modifyDataState',
    default: false,
});

/* 2023.05.22 마이플레이리스트에서 모디파이 연결 - 홍혜란 */
export const modifyClickState = atom({
    key: 'modifyClickState',
    default: 0,
});

export const playListModalState = atom({
    key: 'playListModalState',
    default: false,
});

export const getMusicIdState = atom({
    key: 'getMusicIdState',
});
export const tagSreachState = atom({
    key: 'tagSreachState',
    default: '',
});

export const playingMusic = atom({
    key: 'playingMusic',
    default: true,
});

export const playlistViewerState = atom({
    key: 'playlistViewerState',
    default: false,
});

export const UpdataModify = atom({
    key: 'UpdataModify',
    default: false,
});

export const uploadedImageState = atom<File | null>({
    key: 'uploadedImageState',
    default: null,
});

/**2023/05/30 - 피팅룸에서 백그라운드 음원이 선택됐는지 여부 - 박수범 */
export const CurrentMusicState = atom({
    key: 'CurrentMusic',
    default: false,
});

export const ShowSigninState = atom({
    key: 'SigninState',
    default: false,
});

export const ShowSignupState = atom({
    key: 'SignupState',
    default: false,
});

export const GuideModalState = atom({
    key: 'GuideModal',
    default: false,
});
