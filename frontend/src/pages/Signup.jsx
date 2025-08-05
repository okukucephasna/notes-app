import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await axios.post("http://localhost:5000/signup", { email, password });
            if (res && res.data && res.data.message) {
                alert(res.data.message);
                navigate("/");
            } else {
                alert("Unexpected response from server.");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else if (err.request) {
                alert("No response from server. Check that your backend is running and CORS is configured.");
            } else {
                alert("Error: " + err.message);
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Create Account</h3>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary w-100 mb-2" onClick={handleSignup}>Sign Up</button>
                <p className="text-center small">
                    Already have an account? <Link to="/">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
