import API from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAllCategories = async () => {

    const response = await API.get(
        "/categories"
    );

    return response.data;

};

export const getCategoryById = async (id) => {

    const response = await API.get(
        `/categories/${id}`
    );

    return response.data;

};

export const createCategory = async (category) => {

    const response = await API.post(
        "/categories",
        category,
        getAuthHeader()
    );

    return response.data;

};

export const updateCategory = async (id, category) => {

    const response = await API.put(
        `/categories/${id}`,
        category,
        getAuthHeader()
    );

    return response.data;

};

export const deleteCategory = async (id) => {

    const response = await API.delete(
        `/categories/${id}`,
        getAuthHeader()
    );

    return response.data;

};