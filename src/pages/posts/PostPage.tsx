import { useParams } from "react-router-dom";

export const PostPage = () => {
  const params = useParams<{ postId: string }>();
  return <h1>Post Page {params.postId}</h1>;
};
