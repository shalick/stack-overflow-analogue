import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.ts";
// import App from "./App.tsx";
import {
  HomePage,
  PostsPage,
  PostPage,
  NotFoundPage,
  RegistrationPage,
  LoginPage,
} from "./pages/pages.ts";
import { HeaderLayout } from "./layouts/layouts.ts";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarLayout from "./layouts/sidebar/SidebarLayout.tsx";
import ViewPostPage from "./pages/view-post/ViewPostPage.tsx";

const router = createBrowserRouter([
  {
    Component: HeaderLayout,
    children: [
      { path: routes.register, element: <RegistrationPage /> },
      { path: routes.login, element: <LoginPage /> },
    ],
  },
  {
    Component: SidebarLayout,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.post, element: <ViewPostPage /> },
    ],
  },
  // {
  //   Component: HeaderLayout,
  //   children: [
  //     // { path: routes.home, element: <HomePage /> },
  //     { path: routes.register, element: <RegistrationPage /> },
  //     { path: routes.login, element: <LoginPage /> },
  //   ],
  // },
  // {
  //   Component: SidebarLayout,
  //   children: [{ path: routes.home, element: <HomePage /> }],
  // },
  // {
  //   path: routes.post,
  //   element: <ViewPostPage />,
  //   errorElement: <NotFoundPage />,
  // },
  // {
  //   path: routes.login,
  //   element: <LoginPage />,
  //   errorElement: <NotFoundPage />,
  // },
  // {
  //   path: routes.register,
  //   element: <RegistrationPage />,
  //   errorElement: <NotFoundPage />,
  // },
  // {
  //   path: routes.posts,
  //   element: <PostsPage />,
  //   children: [
  //     {
  //       path: routes.post,
  //       element: <PostPage />,
  //     },
  //   ],
  // },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
