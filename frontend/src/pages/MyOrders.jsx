import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyOrders, cancelOrder } from "../services/orderService";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {

        try {

            const data = await getMyOrders();
            setOrders(data);

        } catch (error) {

            console.log(error);
            alert("Failed to load orders.");

        }

    };

    useEffect(() => {

        loadOrders();

    }, []);

    const handleCancel = async (orderId) => {

        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }

        try {

            await cancelOrder(orderId);

            alert("Order Cancelled Successfully");

            loadOrders();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to cancel order."
            );

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2
                    className="fw-bold mb-4"
                    style={{ color: "#212529" }}
                >
                    My Orders
                </h2>

                {

                    orders.length === 0 ? (

                        <div className="alert alert-info">

                            You have not placed any orders yet.

                        </div>

                    ) : (

                        orders.map(order => (

                            <div
                                className="card shadow mb-4"
                                key={order.orderId}
                            >

                                <div className="card-header d-flex justify-content-between">

                                    <strong>

                                        Order # {order.orderId}

                                    </strong>

                                    <span
                                        className={`badge ${
                                            order.status === "DELIVERED"
                                                ? "bg-success"
                                                : order.status === "CANCELLED"
                                                ? "bg-danger"
                                                : "bg-warning text-dark"
                                        }`}
                                    >

                                        {order.status}

                                    </span>

                                </div>

                                <div className="card-body">

                                    {

                                        order.items.map((item, index) => (

                                            <div
                                                className="row align-items-center mb-3"
                                                key={index}
                                            >

                                                <div className="col-md-2">

                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.productName}
                                                        className="img-fluid rounded"
                                                        style={{
                                                            height: "100px",
                                                            objectFit: "cover"
                                                        }}
                                                    />

                                                </div>

                                                <div className="col-md-6">

                                                    <h5>

                                                        {item.productName}

                                                    </h5>

                                                    <p>

                                                        Quantity :
                                                        {" "}
                                                        {item.quantity}

                                                    </p>

                                                    <p>

                                                        Price :
                                                        ₹ {item.price}

                                                    </p>

                                                </div>

                                                <div className="col-md-4 text-end">

                                                    <h5>

                                                        ₹ {item.totalPrice}

                                                    </h5>

                                                </div>

                                            </div>

                                        ))

                                    }

                                    <hr />

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <strong>

                                                Ordered On :

                                            </strong>

                                            {" "}

                                            {

                                                new Date(
                                                    order.orderedAt
                                                ).toLocaleString()

                                            }

                                        </div>

                                        <div>

                                            <strong>

                                                Total :

                                            </strong>

                                            {" "}

                                            ₹ {order.totalAmount}

                                        </div>

                                    </div>

                                    {

                                        order.status !== "DELIVERED" &&
                                        order.status !== "CANCELLED" && (

                                            <div className="mt-3 text-end">

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleCancel(
                                                            order.orderId
                                                        )
                                                    }
                                                >

                                                    Cancel Order

                                                </button>

                                            </div>

                                        )

                                    }

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </>

    );

}

export default MyOrders;