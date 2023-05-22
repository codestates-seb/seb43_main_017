export interface Myplaylist {
    playListId: number;
    memberId: number;
    createMember: string;
    title: string;
    body: string;
    coverImg: string;
    tags: string[];
    likeCount: number;
    createdAt: string;
    modifiedAt: string;
}

export interface MyplaylistResponse {
    data: Myplaylist[];
}
