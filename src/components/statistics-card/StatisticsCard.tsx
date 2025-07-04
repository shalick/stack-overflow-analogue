import { Box, Grid, Typography } from "@mui/material";
import type { UserStatistics } from "../../types/user";

const StatisticsCard = ({ statistics }: { statistics: UserStatistics }) => {
  const {
    rating,
    snippetsCount,
    commentsCount,
    likesCount,
    dislikesCount,
    questionsCount,
    correctAnswersCount,
    regularAnswersCount,
  } = statistics;
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Rating:
        </Box>{" "}
        {rating}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Snippets:
        </Box>{" "}
        {snippetsCount}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Comments:
        </Box>{" "}
        {commentsCount}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Likes:
        </Box>{" "}
        {likesCount}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Dislikes:
        </Box>{" "}
        {dislikesCount}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Questions:
        </Box>{" "}
        {questionsCount}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Correct Answers:
        </Box>{" "}
        {correctAnswersCount}
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontWeight="bold">
          Regular Answers:
        </Box>{" "}
        {regularAnswersCount}
      </Typography>
    </Grid>
  );
};

export default StatisticsCard;
