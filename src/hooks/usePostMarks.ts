import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addMarks } from '../api/posts';
import type { Post } from '../types/post';
import { useAuthStore } from '../auth/useAuthStore';

export const usePostMarks = (post: Post) => {
  const currentUserId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  const markStats = () => {
    const likes = post.marks.filter((m) => m.type === 'like');
    const dislikes = post.marks.filter((m) => m.type === 'dislike');
    const isLike = likes.some((m) => m.user.id === currentUserId);
    const isDislike = dislikes.some((m) => m.user.id === currentUserId);
    return {
      likesCount: likes.length,
      dislikesCount: dislikes.length,
      isLike,
      isDislike,
    };
  };

  const query = useQuery({
    queryKey: ['postMarks', post.id],
    queryFn: async () => markStats(),
    initialData: markStats,
    staleTime: Infinity,
  });

  const likeMutation = useMutation({
    mutationFn: () => addMarks({ mark: 'like' }, post.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postMarks', post.id] }),
  });

  const dislikeMutation = useMutation({
    mutationFn: () => addMarks({ mark: 'dislike' }, post.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postMarks', post.id] }),
  });

  return {
    ...query.data,
    like: () => {
      if (!query.data?.isLike) likeMutation.mutate();
    },
    dislike: () => {
      if (!query.data?.isDislike) dislikeMutation.mutate();
    },
  };
};
