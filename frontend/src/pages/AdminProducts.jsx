import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/adminProductService";

import {
    getAllCategories
} from "../services/categoryService";

function AdminProducts() {

    const emptyForm = {
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
    };

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const loadProducts = async () => {

        try {

            const data = await getAllProducts();
            setProducts(data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadCategories = async () => {

        try {

            const data = await getAllCategories();
            setCategories(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const clearForm = () => {

        setEditingId(null);
        setFormData(emptyForm);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (editingId === null) {

                await createProduct({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    categoryId: Number(formData.categoryId)
                });

                alert("Product Added Successfully");

            } else {

                await updateProduct(
                    editingId,
                    {
                        ...formData,
                        price: Number(formData.price),
                        stock: Number(formData.stock),
                        categoryId: Number(formData.categoryId)
                    }
                );

                alert("Product Updated Successfully");

            }

            clearForm();
            loadProducts();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Operation Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const handleEdit = (product) => {

        setEditingId(product.id);

        setFormData({

            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
            categoryId: product.categoryId

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this product?")) {
            return;
        }

        try {

            await deleteProduct(id);

            alert("Product Deleted");

            loadProducts();

        } catch (error) {

            alert("Unable to delete product");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    Product Management

                </h2>

                <div className="card shadow mb-5">

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Product Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Price</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Stock</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Category</label>

                                    <select
                                        className="form-select"
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">

                                            Select Category

                                        </option>

                                        {categories.map(category => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>

                                        ))}

                                    </select>

                                </div>
                                                                <div className="col-md-12 mb-3">

                                    <label>Description</label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Image URL</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <button
                                className="btn btn-success me-2"
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Product"
                                            : "Add Product"
                                }

                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={clearForm}
                            >

                                Clear

                            </button>

                        </form>

                    </div>

                </div>

                <div className="card shadow">

                    <div className="card-header bg-dark text-white">

                        <h4 className="mb-0">

                            All Products

                        </h4>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Image</th>

                                        <th>Name</th>

                                        <th>Category</th>

                                        <th>Price</th>

                                        <th>Stock</th>

                                        <th width="180">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        products.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="7"
                                                    className="text-center"
                                                >

                                                    No Products Found

                                                </td>

                                            </tr>

                                        ) : (

                                            products.map(product => (

                                                <tr key={product.id}>

                                                    <td>

                                                        {product.id}

                                                    </td>

                                                    <td>

                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            width="70"
                                                            height="70"
                                                            style={{
                                                                objectFit: "cover",
                                                                borderRadius: "8px"
                                                            }}
                                                        />

                                                    </td>

                                                    <td>

                                                        {product.name}

                                                    </td>

                                                    <td>

                                                        {product.categoryName}

                                                    </td>

                                                    <td>

                                                        ₹ {product.price}

                                                    </td>

                                                    <td>

                                                        {product.stock}

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() =>
                                                                handleEdit(product)
                                                            }
                                                        >

                                                            Edit

                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleDelete(product.id)
                                                            }
                                                        >

                                                            Delete

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminProducts;