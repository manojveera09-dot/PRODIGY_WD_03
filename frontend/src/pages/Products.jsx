import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import {
    getAllProducts,
    searchProducts
} from "../services/productService";

function Products() {

    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const data = await getAllProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

            alert("Failed to load products.");

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadProducts();

            return;

        }

        try {

            const data = await searchProducts(keyword);

            setProducts(data);

        } catch (error) {

            console.error(error);

            alert("Search failed.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4 text-center">

                    Our Products

                </h2>

                <div className="row mb-4">

                    <div className="col-md-10">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleSearch}
                        >

                            Search

                        </button>

                    </div>

                </div>

                {

                    loading ? (

                        <h4 className="text-center">

                            Loading Products...

                        </h4>

                    ) : (

                        <div className="row">

                            {

                                products.length > 0 ? (

                                    products.map(product => (

                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />

                                    ))

                                ) : (

                                    <h4 className="text-center">

                                        No Products Found

                                    </h4>

                                )

                            }

                        </div>

                    )

                }

            </div>

        </>

    );

}

export default Products;