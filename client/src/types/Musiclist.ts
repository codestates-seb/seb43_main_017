/* 2023.05.08 MusicList MusicList 타입 선언 - 홍혜란 */
export interface MusicData {
    musicId: number;
    musicName: string;
    artistName: string;
    albumName: string;
    musicTime: number;
    musicTagName: string[];
    albumCoverImg: string;
    musicUri: string;
    createdAt: string;
    modifiedAt: string;
    musicLikeCount: number;
    memberId: number;
}

export interface MusicDataResponse {
    data: MusicData[];
    content: MusicData[];
    pageInfo: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
}
