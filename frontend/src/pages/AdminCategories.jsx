import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";

function AdminCategories() {

    const emptyForm = {
        name: "",
        description: ""
    };

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const data = await getAllCategories();
            setCategories(data);

        } catch (error) {

            console.log(error);
            alert("Failed to load categories.");

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

            if (editingId === null) {

                await createCategory(formData);
                alert("Category Added Successfully");

            } else {

                await updateCategory(editingId, formData);
                alert("Category Updated Successfully");

            }

            clearForm();
            loadCategories();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Operation Failed"
            );

        }

    };

    const handleEdit = (category) => {

        setEditingId(category.id);

        setFormData({
            name: category.name,
            description: category.description || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this category?")) {
            return;
        }

        try {

            await deleteCategory(id);

            alert("Category Deleted Successfully");

            loadCategories();

        } catch (error) {

            alert("Unable to delete category.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    Category Management

                </h2>

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Category Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Description</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <button
                                className="btn btn-success me-2"
                            >

                                {
                                    editingId
                                        ? "Update Category"
                                        : "Add Category"
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

                            All Categories

                        </h4>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th width="180">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        categories.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center"
                                                >

                                                    No Categories Found

                                                </td>

                                            </tr>

                                        ) : (

                                            categories.map(category => (

                                                <tr key={category.id}>

                                                    <td>{category.id}</td>

                                                    <td>{category.name}</td>

                                                    <td>{category.description}</td>

                                                    <td>

                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => handleEdit(category)}
                                                        >

                                                            Edit

                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(category.id)}
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

export default AdminCategories;

