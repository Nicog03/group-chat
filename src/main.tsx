import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage.tsx";
// import ChatPage from "./pages/ChatPage.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  { path: "/identification", element: <UsernamePage /> },
  { path: "/", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
