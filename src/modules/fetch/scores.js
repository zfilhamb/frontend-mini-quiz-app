import { instance } from "../axios/index.js";

async function getAllScore() {
    try {
        const response = await instance.get("/scores");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getScoreDetail(id) {
    try {
        const response = await instance.get(`/scores/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewScore(data) {
    try {
        const response = await instance.post("/scores", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editScore(id, data) {
    try {
        const response = await instance.put(`/scores/${id}`, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteScoreById(id) {
    try {
        const response = await instance.delete(`/scores/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllScore,
    getScoreDetail,
    createNewScore,
    editScore,
    deleteScoreById
}  