import "./App.css";
import { AuthProvaider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRouter";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <AuthProvaider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Perfil />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvaider>
  )
}

export default App;