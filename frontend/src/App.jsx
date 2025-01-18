import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import RoleAssignmentPage from './pages/RoleAssignmentPage';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx"; // Import the ProtectedAdminRoute

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route
          path="/role"
          element={
            <ProtectedAdminRoute>
              <RoleAssignmentPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );

}