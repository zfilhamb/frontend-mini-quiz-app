import { instance } from "../axios/index.js";

async function getAllChoice() {
    try {
        const response = await instance.get("/choices");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getChoiceDetail(id) {
    try {
        const response = await instance.get(`/choices/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewChoice(data) {
    try {
        const response = await instance.post("/choices", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editChoice(id, data) {
    try {
        const response = await instance.put(`/choices/${id}`, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteChoiceById(id) {
    try {
        const response = await instance.delete(`/choices/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllChoice,
    getChoiceDetail,
    createNewChoice,
    editChoice,
    deleteChoiceById
}  