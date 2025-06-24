import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/HomePage.tsx";
import PostsPage from "./pages/posts/PostsPage.tsx";
import { PostPage } from "./pages/posts/PostPage.tsx";
import { NotFoundPage } from "./pages/notfound/NotFoundPage.tsx";
import RegistrationPage from "./pages/register/RegistrationPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
