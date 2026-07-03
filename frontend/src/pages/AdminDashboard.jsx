import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllProducts } from "../services/adminProductService";
import { getAllCategories } from "../services/categoryService";

function AdminDashboard() {

    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);

    const fullName = localStorage.getItem("fullName");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const products = await getAllProducts();
            const categories = await getAllCategories();

            setProductCount(products.length);
            setCategoryCount(categories.length);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="mb-5">

                    <h2 className="fw-bold">

                        Welcome Admin 👋

                    </h2>

                    <h5 className="text-secondary">

                        {fullName}

                    </h5>

                    <p className="text-muted">

                        Manage your E-Commerce Store from one place.

                    </p>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h1 className="display-4 text-primary">

                                    {productCount}

                                </h1>

                                <h4>

                                    Total Products

                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6 mb-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h1 className="display-4 text-success">

                                    {categoryCount}

                                </h1>

                                <h4>

                                    Total Categories

                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-md-6 mb-4">

                        <div className="card shadow">

                            <div className="card-body text-center">

                                <h3>

                                    📦 Products

                                </h3>

                                <p>

                                    Add, Edit and Delete Products.

                                </p>

                                <Link
                                    to="/admin/products"
                                    className="btn btn-primary"
                                >

                                    Manage Products

                                </Link>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6 mb-4">

                        <div className="card shadow">

                            <div className="card-body text-center">

                                <h3>

                                    📂 Categories

                                </h3>

                                <p>

                                    Add, Edit and Delete Categories.

                                </p>

                                <Link
                                    to="/admin/categories"
                                    className="btn btn-success"
                                >

                                    Manage Categories

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h4>

                            Admin Features

                        </h4>

                        <ul>

                            <li>Manage Products</li>

                            <li>Manage Categories</li>

                            <li>View Customer Orders (Next Module)</li>

                            <li>Update Order Status</li>

                            <li>Manage Inventory</li>

                        </ul>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;