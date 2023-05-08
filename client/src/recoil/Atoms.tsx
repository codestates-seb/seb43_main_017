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
