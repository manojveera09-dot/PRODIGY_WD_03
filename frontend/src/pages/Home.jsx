import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

    const token = localStorage.getItem("token");
    const fullName = localStorage.getItem("fullName");

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div
                    className="p-5 mb-5 rounded-3 shadow"
                    style={{
                        background: "#f8f9fa",
                        border: "1px solid #dee2e6"
                    }}
                >

                    <div className="container-fluid py-5">

                        <h1
                            className="display-4 fw-bold"
                            style={{
                                color: "#212529",
                                letterSpacing: "1px"
                            }}
                        >

                            Welcome to E-Commerce Store

                        </h1>

                        <p
                            className="lead mt-3"
                            style={{
                                color: "#343a40",
                                fontSize: "22px",
                                fontWeight: "500"
                            }}
                        >

                            Buy Electronics, Fashion, Groceries and much more
                            at the best prices.

                        </p>

                        {

                            token && (

                                <h4
                                    className="mt-4"
                                    style={{
                                        color: "#198754",
                                        fontWeight: "700"
                                    }}
                                >

                                    Welcome, {fullName} 👋

                                </h4>

                            )

                        }

                        <div className="mt-4">

                            <Link
                                to="/products"
                                className="btn btn-primary btn-lg me-3"
                            >

                                Shop Now

                            </Link>

                            {

                                !token && (

                                    <Link
                                        to="/register"
                                        className="btn btn-success btn-lg"
                                    >

                                        Register

                                    </Link>

                                )

                            }

                        </div>

                    </div>

                </div>

                <div className="row text-center">

                    <div className="col-md-4">

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <h2>🚚</h2>

                                <h5 className="fw-bold">

                                    Fast Delivery

                                </h5>

                                <p className="text-secondary">

                                    Get your orders delivered quickly and safely.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <h2>💳</h2>

                                <h5 className="fw-bold">

                                    Secure Payments

                                </h5>

                                <p className="text-secondary">

                                    Safe and secure payment gateway.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <h2>⭐</h2>

                                <h5 className="fw-bold">

                                    Quality Products

                                </h5>

                                <p className="text-secondary">

                                    We provide only high-quality products.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Home;