import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import { Controller, useForm } from "react-hook-form";
import type { CommentResponse, Post } from "../../types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type FC } from "react";
import { addComment } from "../../api/comments";

const schema = z.object({ comment: z.string().nonempty() });
type Schema = z.infer<typeof schema>;

interface ICommentsCardProps {
  post: Post;
  onCommentAdded: (comment: CommentResponse) => void;
}

const CommentsCard: FC<ICommentsCardProps> = ({post, onCommentAdded}) => {
  const { comments } = post;
  const [loading, setLoading] = useState(false);
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
    <Box>
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

      {comments.length === 0 && (
        <Typography sx={{ textAlign: "center" }}>
          There are no comments yet
        </Typography>
      )}
    </Box>
  );
};

export default CommentsCard;
