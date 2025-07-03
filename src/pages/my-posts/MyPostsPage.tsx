import { useAuthStore } from "../../auth/useAuthStore";
import PostsList from "../../components/posts-list/PostsList";

const MyPostsPage = () => {
  const { user } = useAuthStore();
  return <PostsList userId={user?.id} />;
};

export default MyPostsPage;
