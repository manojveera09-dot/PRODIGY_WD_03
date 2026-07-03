import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await login(formData);

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);
            localStorage.setItem("fullName", response.fullName);

            alert("Login Successful");

            if (response.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/");

            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-5">

                        <div className="card shadow border-0">

                            <div className="card-body p-4">

                                <h2
                                    className="text-center fw-bold mb-4"
                                    style={{
                                        color: "#212529",
                                        fontSize: "2rem",
                                        letterSpacing: "0.5px"
                                    }}
                                >
                                    Login
                                </h2>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Email

                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                        />

                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >

                                        {
                                            loading
                                                ? "Logging in..."
                                                : "Login"
                                        }

                                    </button>

                                </form>

                                <div className="text-center mt-4">

                                    <p className="mb-0">

                                        Don't have an account?{" "}

                                        <Link
                                            to="/register"
                                            className="fw-bold text-decoration-none"
                                        >

                                            Register

                                        </Link>

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Login;
