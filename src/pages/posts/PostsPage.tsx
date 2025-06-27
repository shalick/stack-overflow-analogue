import { Link, Outlet } from "react-router-dom";

const PostsPage = () => {
  const posts = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link key={post} to={`/posts/${post}`}>
            Post {post}
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default PostsPage;
