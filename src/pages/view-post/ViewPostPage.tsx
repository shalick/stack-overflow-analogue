import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "../../api/posts.ts";
import PostCard from "../../components/post-card/PostCard.tsx";
import { Box, CircularProgress } from "@mui/material";
// import { useState } from "react";
import type { CommentResponse, Post } from "../../types/post.ts";
import CommentsCard from "../../components/comment-card/CommentsCard.tsx";

const ViewPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const queryClient = useQueryClient();
  // const [areCommentsShown, setAreCommentsShown] = useState(true);

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId!),
    enabled: !!postId,
  });

  // const handleToggleCommentsRequested = () => {
  //   setAreCommentsShown(!areCommentsShown);
  // };

  const handleCommentAdded = (comment: CommentResponse) => {
    if (!postId) return;

    queryClient.setQueryData<Post>(["post", postId], (oldPost) => {
      if (!oldPost) return oldPost;
      return {
        ...oldPost,
        comments: [...oldPost.comments, comment],
      };
    });
  };

  return (
    <Box sx={{ height: "100%" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        post && (
          <>
            <PostCard
              post={post}
              // areCommentsShown={areCommentsShown}
              // onToggleCommentsRequested={handleToggleCommentsRequested}
              // onCommentAdded={handleCommentAdded}
            />
            <CommentsCard post={post} onCommentAdded={comment => handleCommentAdded(comment)} />
          </>
        )
      )}
    </Box>
  );
};

export default ViewPostPage;
