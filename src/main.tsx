import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/HomePage.tsx";
import PostsPage from "./pages/posts/PostsPage.tsx";
import { PostPage } from "./pages/posts/PostPage.tsx";
import { NotFoundPage } from "./pages/notfound/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/posts",
    element: <PostsPage />,
    children: [
      {
        path: "/posts/:postId",
        element: <PostPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
