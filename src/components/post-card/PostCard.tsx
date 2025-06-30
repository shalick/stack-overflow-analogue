import { type FC } from "react";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import {
  PersonOutline as PersonOutlineIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
  ThumbDownOffAlt as ThumbDownOffAltIcon,
  Comment as CommentIcon,
  Code as CodeIcon,
  ModeEditOutlineOutlined as ModeEditOutlineOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { usePostMarks } from "../../hooks/usePostMarks.ts";
import type { Post } from "../../types/post.ts";
import { useAuthStore } from "../../auth/useAuthStore.ts";
import { Link } from "react-router-dom";

interface PostProps {
  post: Post;
  showViewButton?: boolean;
}

const PostCard: FC<PostProps> = ({
  post,
  showViewButton,
}) => {
  const { user, language, code, comments } = post;
  const currentUserId = useAuthStore((s) => s.user?.id);

  const { likesCount, dislikesCount, like, dislike } =
    usePostMarks(post);

  return (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
          <PersonOutlineIcon />
          <Typography variant="body2">{user.username}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
          <CodeIcon />
          <Typography variant="caption">{language}</Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{ display: "flex", flexDirection: "column", p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {currentUserId === user.id && (
            <Link color="inherit" to={`/edit-post/${post.id}`}>
              <ModeEditOutlineOutlinedIcon />
            </Link>
          )}
        </Box>

        <SyntaxHighlighter
          language={language}
          style={stackoverflowLight}
          showLineNumbers
          customStyle={{ margin: 0, padding: "1rem", fontSize: "1rem" }}
        >
          {code}
        </SyntaxHighlighter>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <Box sx={{ display: "flex" }}>
              <IconButton
                onClick={like}
                sx={{ display: "flex", gap: "0.4rem" }}
              >
                <Typography>{likesCount}</Typography>
                <ThumbUpOffAltIcon />
              </IconButton>
              <IconButton
                onClick={dislike}
                sx={{ display: "flex", gap: "0.4rem" }}
              >
                <Typography>{dislikesCount}</Typography>
                <ThumbDownOffAltIcon />
              </IconButton>
            </Box>

            {showViewButton && (
              <Link color="inherit" to={`/post/${post.id}`}>
                <VisibilityOutlinedIcon />
              </Link>
            )}
          </Box>

          <IconButton>
            <Typography>{comments.length}</Typography>
            <CommentIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
