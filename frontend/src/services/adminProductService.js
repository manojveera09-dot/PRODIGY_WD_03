import API from "../api/axiosConfig";

const getAuthHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
};

export const getAllProducts = async () => {

    const response = await API.get(
        "/products",
        getAuthHeader()
    );

    return response.data;
};

export const createProduct = async (productData) => {

    const response = await API.post(
        "/products",
        productData,
        getAuthHeader()
    );

    return response.data;
};

export const updateProduct = async (
    productId,
    productData
) => {

    const response = await API.put(
        `/products/${productId}`,
        productData,
        getAuthHeader()
    );

    return response.data;
};

export const deleteProduct = async (
    productId
) => {

    const response = await API.delete(
        `/products/${productId}`,
        getAuthHeader()
    );

    return response.data;
};

export const getProductById = async (
    productId
) => {

    const response = await API.get(
        `/products/${productId}`,
        getAuthHeader()
    );

    return response.data;
};