import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
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

            await register(formData);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
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

                    <div className="col-md-6">

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
                                    Register
                                </h2>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Full Name

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Email

                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Phone Number

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
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
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <button
                                        className="btn btn-success w-100"
                                        disabled={loading}
                                    >

                                        {
                                            loading
                                                ? "Registering..."
                                                : "Register"
                                        }

                                    </button>

                                </form>

                                <div className="text-center mt-4">

                                    <p className="mb-0">

                                        Already have an account?{" "}

                                        <Link
                                            to="/login"
                                            className="fw-bold text-decoration-none"
                                        >

                                            Login

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

export default Register;