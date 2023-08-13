import { instance } from "../axios/index.js";

async function getAllAnswer() {
    try {
        const response = await instance.get("/answers");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getAnswerDetail(id) {
    try {
        const response = await instance.get(`/answers/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewAnswer(data) {
    try {
        const response = await instance.post("/answers", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editAnswer(id, data) {
    try {
        const response = await instance.put(`/answers/${id}`, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteAnswerById(id) {
    try {
        const response = await instance.delete(`/answers/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllAnswer,
    getAnswerDetail,
    createNewAnswer,
    editAnswer,
    deleteAnswerById
}  