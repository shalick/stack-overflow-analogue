import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.ts";
import HomePage from "./pages/home/HomePage.tsx";
import PostsPage from "./pages/posts/PostsPage.tsx";
import { PostPage } from "./pages/posts/PostPage.tsx";
import { NotFoundPage } from "./pages/notfound/NotFoundPage.tsx";
import RegistrationPage from "./pages/register/RegistrationPage.tsx";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: routes.register,
    element: <RegistrationPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: routes.posts,
    element: <PostsPage />,
    children: [
      {
        path: routes.post,
        element: <PostPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
