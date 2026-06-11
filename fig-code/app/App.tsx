import { createHashRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import OurStoryPage from "./pages/OurStoryPage";
import CoursesPage from "./pages/CoursesPage";
import WhatsNewPage from "./pages/WhatsNewPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "our-story",
        element: <OurStoryPage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "whats-new",
        element: <WhatsNewPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}