import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "./lib/auth";
import Landing from "./pages/Landing";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import LevelDetail from "./pages/LevelDetail";
import Lesson from "./pages/Lesson";
import Exam from "./pages/Exam";
import Certificate from "./pages/Certificate";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-cs-900 text-cs-200">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Navbar />
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/levels/:levelId"
          element={
            <RequireAuth>
              <Navbar />
              <LevelDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/learn/:lessonId"
          element={
            <RequireAuth>
              <Navbar />
              <Lesson />
            </RequireAuth>
          }
        />
        <Route
          path="/exam/:levelId"
          element={
            <RequireAuth>
              <Navbar />
              <Exam />
            </RequireAuth>
          }
        />
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Navbar />
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
