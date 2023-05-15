import { atom } from 'recoil';

/* 2023.05.06 사용자의 이름을 nameState라는 새로운 상태를 정의 - 홍혜란 */
export const nameState = atom({
    key: 'nameState',
    default: 'Undefined',
});

/* 2023.05.06 사용자의 자기소개를 introState라는 새로운 상태를 정의 - 홍혜란 */
export const introState = atom({
    key: 'introState',
    default: 'Undefined is good people',
});

/* 2023.05.08 뮤직리스트 출력 상태 관리 - 홍혜란 */
export const playlistState = atom<string[]>({
    key: 'playlistState',
    default: [],
});

/* 2023.05.10 뮤직리스트 카테고리 클릭시 태그 생성 상태 관리 - 홍혜란 */
export const selectedTagsState = atom<string[]>({
    key: 'selectedTagsState',
    default: [],
});

/* 2023.05.11 서치 상태 관리 - 홍혜란 */
export const searchItemState = atom<string>({
    key: 'searchItem',
    default: '',
});

/* 2023.05.11 서치 결과 상태 관리 - 홍혜란 */
export const searchResultState = atom({
    key: 'searchResultState',
    default: [],
});

/* 2023.05.11 뮤직리스트 좋아요 상태 관리 - 홍혜란 */
export const isLikedState = atom<boolean>({
    key: 'isLikedState',
    default: false,
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
