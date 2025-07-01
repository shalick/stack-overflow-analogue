import { useState } from "react";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/posts.ts";
import type { CommentResponse, Post } from "../../types/post.ts";
import PostCard from "../post-card/PostCard.tsx";

interface IPostsListProps {
  userId?: string;
}

const PostsList = ({ userId }: IPostsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [areCommentsShownIds, setAreCommentsShownIds] = useState<string[]>([])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", currentPage, userId],
    queryFn: () => fetchPosts(currentPage, userId),
  });

  const posts: Post[] = data?.data ?? [];
  const totalPages = data?.meta?.totalPages || 1;

  const handleToggleCommentsRequested = (id: string) => {
        if (areCommentsShownIds.includes(id)) {
            const resultIds = areCommentsShownIds.filter((commentId) => commentId !== id)
            setAreCommentsShownIds(resultIds)
        } else {
            setAreCommentsShownIds([...areCommentsShownIds, id])
        }
    }

    const handleCommentAdded = (post: Post, comment: CommentResponse) => {
        post.comments = [...post.comments, comment];
    }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 0 }}>
            Welcome to Codelang!
          </Typography>
          <Typography textAlign="center" variant="h4">
            {"</>"}
          </Typography>
        </Box>
        <Pagination
          sx={{ marginBottom: "1rem" }}
          count={totalPages}
          page={currentPage}
          shape="rounded"
          onChange={(_, page) => setCurrentPage(page)}
        />
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : isError ? (
        <Typography color="error">
          Failed to load posts: {String(error)}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          {posts.map((post, index) => (
            <PostCard
              post={post}
              key={index}
              showViewButton={true}
              enableCommentsScroll={true}
              areCommentsShown={areCommentsShownIds.includes(post.id)}
              onToggleCommentsRequested={() =>
                handleToggleCommentsRequested(post.id)
              }
              onCommentAdded={(comment) => handleCommentAdded(post, comment)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PostsList;
