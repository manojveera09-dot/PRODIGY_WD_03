import API from "../api/axiosConfig";

export const getAllProducts = async () => {

    const response = await API.get("/products");

    return response.data;

};

export const getProductById = async (id) => {

    const response = await API.get(`/products/${id}`);

    return response.data;

};

export const searchProducts = async (keyword) => {

    const response = await API.get(`/products/search?keyword=${keyword}`);

    return response.data;

};