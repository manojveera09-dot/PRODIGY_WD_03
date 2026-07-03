import API from "../api/axiosConfig";

export const register = async (userData) => {

    const response = await API.post(
        "/auth/register",
        userData
    );

    return response.data;

};

export const login = async (loginData) => {

    const response = await API.post(
        "/auth/login",
        loginData
    );

    return response.data;

};