export interface User {
    id: string,
    username: string,
    role: string,
}

export interface UserWithPassword extends User {
    password: string;
}

export interface UserStatisticsResponse {
    data: UserStatisticsResponseData;
}

export interface UserStatisticsResponseData {
    id: string;
    username: string;
    role: string;
    statistic: UserStatistics;
}

export interface UserStatistics {
    snippetsCount: number,
    rating: number,
    commentsCount: number,
    likesCount: number,
    dislikesCount: number,
    questionsCount: number,
    correctAnswersCount: number,
    regularAnswersCount: number
}

export interface ChangePasswordRequest {
    newPassword: string;
    oldPassword: string;
}

export interface ChangeNameRequest {
    username: string;
}

export interface UpdatePasswordResponseData {
    updatedCount: number;
}