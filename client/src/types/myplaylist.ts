export interface MyplaylistData {
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

export interface MyplaylistDataResponse {
    data: MyplaylistData[];
}
