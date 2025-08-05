import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/signin", { email, password });
            if (res?.data?.message) {
                alert(res.data.message);
                localStorage.setItem("user", res.data.email);
                navigate("/dashboard");
            } else {
                alert("Unexpected response from server.");
            }
        } catch (err) {
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else if (err.request) {
                alert("No response from server. Check if it's running and CORS is configured.");
            } else {
                alert("Error: " + err.message);
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-light">
            <div className="card shadow-lg p-4 border-0" style={{ width: '100%', maxWidth: '420px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Welcome Back</h2>
                    <p className="text-muted">Sign in to continue to Focus Notes</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="d-grid mb-3">
                    <button className="btn btn-primary btn-lg" onClick={handleSignin}>
                        Sign In
                    </button>
                </div>

                <p className="text-center small">
                    Don’t have an account? <Link to="/signup">Create one</Link>
                </p>
            </div>
        </div>
    );
}
