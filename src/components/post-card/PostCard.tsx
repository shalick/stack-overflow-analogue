import { useState, type FC } from "react";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addComment } from "../../api/comments.ts";
import { usePostMarks } from "../../hooks/usePostMarks.ts";
import type { Post, CommentResponse } from "../../types/post.ts";
import { useAuthStore } from "../../auth/useAuthStore.ts";
import { Link } from "react-router-dom";
import CommentCard from "../comment-card/CommendCard.tsx";

const schema = z.object({ comment: z.string().nonempty() });
type Schema = z.infer<typeof schema>;

interface PostProps {
  post: Post;
  areCommentsShown: boolean;
  showViewButton?: boolean;
  enableCommentsScroll?: boolean;
  onToggleCommentsRequested: () => void;
  onCommentAdded: (comment: CommentResponse) => void;
}

const PostCard: FC<PostProps> = ({
  post,
  areCommentsShown,
  showViewButton,
  enableCommentsScroll,
  onToggleCommentsRequested,
  onCommentAdded,
}) => {
  const { user, language, code, comments } = post;
  const currentUserId = useAuthStore((s) => s.user?.id);
  const [loading, setLoading] = useState(false);

  const { likesCount, dislikesCount, like, dislike } =
    usePostMarks(post);

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { comment: "" },
    disabled: loading,
  });

  const onSubmit = async (data: Schema) => {
    try {
      setLoading(true);
      const newComment = await addComment({
        content: data.comment,
        snippetId: post.id,
      });
      onCommentAdded(newComment);
      reset();
    } finally {
      setLoading(false);
    }
  };

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

          <IconButton onClick={onToggleCommentsRequested}>
            <Typography>{comments.length}</Typography>
            <CommentIcon />
          </IconButton>
        </Box>

        <Box
          sx={
            enableCommentsScroll
              ? { maxHeight: "300px", overflowY: "auto", overflowX: "hidden" }
              : {}
          }
        >
          {areCommentsShown && (
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {comments.map((comment, index) => (
                <CommentCard key={index}>{comment.content}</CommentCard>
              ))}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="comment"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="Comment"
                      variant="outlined"
                      margin="normal"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add comment
                </Button>
              </form>
            </CardContent>
          )}

          {areCommentsShown && comments.length === 0 && (
            <Typography sx={{ textAlign: "center" }}>
              There are no comments yet
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
