import api from './axios.ts'; 
import type { CreatePost, MarkRequest, Post } from "../types/post.ts";
import type { QueryResponse, ResponseWithData } from "../types/response.ts";

export const fetchPosts = async (page: number = 1, userId: string | null = null) => {
  const params: Record<string, any> = { page };
  if (userId) {
    params.userId = userId;
  }

  const response = await api.get<QueryResponse<Post[]>>('snippets', { params });
  return response.data.data;
};

export const createPost = async (body: CreatePost) => {
  await api.post('snippets', body);
};

export const editPost = async (body: CreatePost, id: string) => {
  const response = await api.patch<ResponseWithData<Post>>(`snippets/${id}`, body);
  return response.data;
};

export const fetchPost = async (id: string) => {
  const response = await api.get<ResponseWithData<Post>>(`snippets/${id}`);
  return response.data.data;
};

export const addMarks = async (body: MarkRequest, id: string) => {
  await api.post(`snippets/${id}/mark`, body);
};