import api from "./axios.ts";
import type { CommentResponse, CreateCommentRequest } from "../types/post.ts";
import type { ResponseWithData } from "../types/response.ts";


export const addComment = async (body: CreateCommentRequest) => {
  const response = await api.post<ResponseWithData<CommentResponse>>("comments", body);
  return response.data.data;
};
