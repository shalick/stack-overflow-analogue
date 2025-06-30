import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/posts.ts";
import type { Post } from "../../types/post.ts";
import PostCard from "../post-card/PostCard.tsx";

interface IPostsListProps {
  userId?: string;
}

const PostsList = ({ userId }: IPostsListProps) => {
  const currentPage = 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", currentPage, userId],
    queryFn: () => fetchPosts(currentPage, userId),
  });

  const posts: Post[] = data?.data ?? [];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0rem",
        }}
      >
        <Typography variant="h6">
          Welcome to Codelang!
        </Typography>
        <Typography variant="h4">{"</>"}</Typography>
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
            <PostCard post={post} key={index} showViewButton={true} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PostsList;
