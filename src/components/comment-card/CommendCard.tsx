import type { FC, ReactNode } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CommentCardProps {
  children: ReactNode;
}

const CommentCard: FC<CommentCardProps> = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#f9f9f9", borderRadius: 2 }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1">{children}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
