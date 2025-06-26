import { useParams } from "react-router-dom";

const PostPage = () => {
  const params = useParams<{ postId: string }>();
  return <h1>Post Page {params.postId}</h1>;
};

export default PostPage;
