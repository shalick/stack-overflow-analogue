import type { User } from "./user";

export interface Post {
    id: string;
    code: string;
    language: string;
    user: User
    marks: Mark[];
    comments: Comment[];
}

export interface Mark {
    id: string;
    type: string;
    user: User;
}

export interface Comment {
    id: string;
    content: string;
}

export interface CreateCommentRequest {
    content: string,
    snippetId: string
}

export interface CommentResponse {
    id: string,
    content: string,
    user: User
}

export interface CreatePost  {
    code: string;
    language: string;
}

export interface MarkRequest {
    mark: string
}
