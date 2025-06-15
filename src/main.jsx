import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Chat from "./pages/Chat.jsx";
import NewPost from "./pages/NewPost.jsx";
import ChatsList from "./pages/ChatsList.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";

const screenSize = window.innerWidth;
console.log(screenSize);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {screenSize >= 600 ? (
      <section>
        <div>
          <h1>This site is best viewed on Mobile</h1>
        </div>
      </section>
    ) : (
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="chats"
              element={
                <ProtectedRoute>
                  <ChatsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="new-post"
              element={
                <ProtectedRoute>
                  <NewPost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    )}
  </StrictMode>
);
