import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

export default function App() {
    const isLoggedIn = localStorage.getItem("user");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* 🔒 Protect Dashboard Route */}
                <Route 
                    path="/dashboard" 
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} 
                />
                
                {/* Optional: Fallback Route */}
                <Route 
                    path="*"
                    element={<h2 className="text-center mt-5">404 - Page Not Found</h2>}
                />
            </Routes>
        </BrowserRouter>
    );
}
