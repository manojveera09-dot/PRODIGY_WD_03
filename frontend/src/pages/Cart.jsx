import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../services/cartService";
import { placeOrder } from "../services/orderService";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {

        try {

            const data = await getCart();

            setCart(data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 400) {

                setCart(null);

            } else {

                alert(
                    error.response?.data?.message ||
                    "Unable to load cart."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCart();

    }, []);

    const increaseQuantity = async (item) => {

        try {

            await updateCartItem(
                item.cartItemId,
                item.quantity + 1
            );

            loadCart();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const decreaseQuantity = async (item) => {

        if (item.quantity === 1) {

            return;

        }

        try {

            await updateCartItem(
                item.cartItemId,
                item.quantity - 1
            );

            loadCart();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const deleteItem = async (cartItemId) => {

        if (!window.confirm("Remove this product from cart?")) {

            return;

        }

        try {

            await removeCartItem(cartItemId);

            loadCart();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const clearEntireCart = async () => {

        if (!window.confirm("Clear entire cart?")) {

            return;

        }

        try {

            await clearCart();

            loadCart();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const handlePlaceOrder = async () => {

        if (!window.confirm("Place this order?")) {

            return;

        }

        try {

            await placeOrder();

            alert("Order Placed Successfully!");

            navigate("/orders");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to place order."
            );

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container mt-5">

                    <h3>Loading Cart...</h3>

                </div>

            </>

        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="fw-bold mb-4">

                    My Shopping Cart

                </h2>

                {

                    !cart ||

                    !cart.items ||

                    cart.items.length === 0 ?

                        <div className="alert alert-info">

                            Your cart is empty.

                        </div>

                        :

                        <>

                            <table className="table table-bordered table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        cart.items.map(item => (

                                            <tr key={item.cartItemId}>

                                                <td width="120">

                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.productName}
                                                        style={{
                                                            width: "80px",
                                                            height: "80px",
                                                            objectFit: "cover"
                                                        }}
                                                    />

                                                </td>

                                                <td>{item.productName}</td>

                                                <td>₹ {item.price}</td>

                                                <td>

                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => decreaseQuantity(item)}
                                                    >

                                                        -

                                                    </button>

                                                    <span className="mx-3">

                                                        {item.quantity}

                                                    </span>

                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => increaseQuantity(item)}
                                                    >

                                                        +

                                                    </button>

                                                </td>

                                                <td>

                                                    ₹ {item.totalPrice}

                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => deleteItem(item.cartItemId)}
                                                    >

                                                        Remove

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                            <div className="d-flex justify-content-between align-items-center mt-4">

                                <h3>

                                    Grand Total : ₹ {cart.grandTotal}

                                </h3>

                                <div>

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={handlePlaceOrder}
                                    >

                                        Place Order

                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={clearEntireCart}
                                    >

                                        Clear Cart

                                    </button>

                                </div>

                            </div>

                        </>

                }

            </div>

        </>

    );

}

export default Cart;