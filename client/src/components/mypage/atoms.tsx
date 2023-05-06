import { atom } from 'recoil';

export const nameState = atom({
    key: 'nameState',
    default: 'Undefined',
});

export const introState = atom({
    key: 'introState',
    default: 'Hello, I am Undefined',
});
