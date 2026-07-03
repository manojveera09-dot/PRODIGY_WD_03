import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProduct();

    }, []);

    const loadProduct = async () => {

        try {

            const data = await getProductById(id);

            setProduct(data);

        } catch (error) {

            console.error(error);

            alert("Failed to load product.");

        } finally {

            setLoading(false);

        }

    };

    const handleAddToCart = async () => {

        if (!localStorage.getItem("token")) {

            alert("Please login first.");

            return;

        }

        try {

            await addToCart(product.id, 1);

            alert("Product added to cart successfully!");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to add product to cart."
            );

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container mt-5">

                    <h3 className="text-center">
                        Loading Product...
                    </h3>

                </div>

            </>

        );

    }

    if (!product) {

        return (

            <>
                <Navbar />

                <div className="container mt-5">

                    <h3 className="text-center">
                        Product not found.
                    </h3>

                </div>

            </>

        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="row">

                    <div className="col-md-5">

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid rounded shadow"
                            style={{
                                width: "100%",
                                maxHeight: "500px",
                                objectFit: "cover"
                            }}
                            onError={(e) => {

                                e.target.onerror = null;

                                e.target.src =
                                    "https://placehold.co/600x600?text=No+Image";

                            }}
                        />

                    </div>

                    <div className="col-md-7">

                        <h2>

                            {product.name}

                        </h2>

                        <h3 className="text-success mt-3">

                            ₹ {product.price}

                        </h3>

                        <p className="mt-4">

                            {product.description}

                        </p>

                        <h5>

                            Category :
                            {" "}
                            {product.categoryName}

                        </h5>

                        <h5 className="mt-3">

                            Stock :
                            {" "}
                            {product.stock}

                        </h5>

                        <button
                            className="btn btn-primary btn-lg mt-4"
                            onClick={handleAddToCart}
                        >

                            Add To Cart

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ProductDetails;