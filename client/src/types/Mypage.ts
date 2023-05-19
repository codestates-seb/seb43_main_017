export interface UserInfo {
    memberId: number;
    name: string;
    email: string;
    image: string;
    status: string;
    createdAt: string;
    modifiedAt: string;
}

export interface UserInfoResponse {
    data: UserInfo[];
}
