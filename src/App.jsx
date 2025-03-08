import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TeamDetails from "./pages/TeamDetails";

const ProtectedRoute = ({ element }) => {
  const isAdmin = localStorage.getItem("admin") === "true";
  return isAdmin ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/team/:teamNumber" element={<ProtectedRoute element={<TeamDetails />} />} />
    </Routes>
  );
}

export default App;
