export interface PlcardProps {
    playListId: number;
    memberId: number;
    createMember: string;
    title: string;
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
    createdAt: string;
    modifiedAt: string;
}

export interface bgimg {
    bgImg: string;
}
