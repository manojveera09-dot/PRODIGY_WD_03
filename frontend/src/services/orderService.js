import API from "../api/axiosConfig";

export const placeOrder = async () => {

    const response = await API.post(
        "/orders/place",
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;

};

export const getMyOrders = async () => {

    const response = await API.get(
        "/orders/my-orders",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;

};

export const cancelOrder = async (orderId) => {

    const response = await API.delete(
        `/orders/${orderId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;

};
