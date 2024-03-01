import axios from "axios";
// var baseUrl = "http://localhost:8000";
var baseUrl = "https://task-manage-backend-ypmq.onrender.com";


const token = localStorage.getItem("accessToken");
var config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    withCredentials: true,
};

export const postApiCall = async (url, data) => {

    try {
        const response = await axios.post(`${baseUrl}/${url}`, data, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return {
                errors: [error.response.data.message]
            };
        }
        return {
            errors: [error.message]
        }
    }
}


export const getApiCall = async (url, params) => {

    try {
        const response = await axios.get(`${baseUrl}/${url}`, {
            params,
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return {
                errors: [error.response.data.message]
            };
        }
        return {
            errors: [error.message]
        }
    }
};