import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    E-Commerce
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        {
                            token && role === "CUSTOMER" && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">
                                            Cart
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/orders">
                                            My Orders
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            token && role === "ADMIN" && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/products">
                                            Products
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/categories">
                                            Categories
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                    </ul>

                    <div className="d-flex">

                        {
                            !token ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="btn btn-outline-light me-2"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="btn btn-warning"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <button
                                    className="btn btn-danger"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            )
                        }

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;