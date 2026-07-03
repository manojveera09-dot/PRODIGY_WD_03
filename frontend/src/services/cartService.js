import API from "../api/axiosConfig";

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const addToCart = async (productId, quantity) => {

    const response = await API.post(
        "/cart/add",
        {
            productId,
            quantity
        },
        getAuthHeaders()
    );

    return response.data;

};

export const getCart = async () => {

    const response = await API.get(
        "/cart",
        getAuthHeaders()
    );

    return response.data;

};

export const updateCartItem = async (cartItemId, quantity) => {

    const response = await API.put(
        `/cart/${cartItemId}`,
        {
            quantity
        },
        getAuthHeaders()
    );

    return response.data;

};

export const removeCartItem = async (cartItemId) => {

    const response = await API.delete(
        `/cart/${cartItemId}`,
        getAuthHeaders()
    );

    return response.data;

};

export const clearCart = async () => {

    const response = await API.delete(
        "/cart/clear",
        getAuthHeaders()
    );

    return response.data;

};