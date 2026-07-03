import { Link } from "react-router-dom";
import { addToCart } from "../services/cartService";
function ProductCard({ product }) {
const handleAddToCart = async () => {

    try {

        await addToCart(product.id, 1);

        alert("Product added to cart successfully!");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to add product to cart."
        );

    }

};
    return (

        <div className="col-md-4 mb-4">

            <div className="card h-100 shadow">

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                        height: "250px",
                        objectFit: "cover"
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/600x400?text=No+Image";
                    }}
                />

                <div className="card-body d-flex flex-column">

                    <h5>{product.name}</h5>

                    <p>{product.description}</p>

                    <h4 className="text-success">
                        ₹ {product.price}
                    </h4>

                    <div className="mt-auto">

                        <Link
                            to={`/products/${product.id}`}
                            className="btn btn-primary w-100"
                        >
                            View Details
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;