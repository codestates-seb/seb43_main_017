export interface PlcardProps {
    playListId: number;
    memberId: number;
    createMember: string;
    title: string;
    coverImg: string;
    tags: [];
    likeCount: number;
    body: string;
    createdAt: string;
    modifiedAt: string;
}

export interface musicdetail {
    musicId: number;
    musicName: string;
    artistName: string;
    albumName: string;
    musicTime: number;
    albumCoverImg: string;
    musicUri: string;
    musicTagName: [];
    createdAt: string;
    modifiedAt: string;
}

export interface bgimg {
    bgImg: string;
}
