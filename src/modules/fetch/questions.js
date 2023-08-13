import { instance } from "../axios/index.js";
import Swal from "sweetalert2";


async function getAllQuestion() {
    try {
        const response = await instance.get("/questions");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getQuestionDetail(id) {
    try {
        const response = await instance.get(`/questions/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function createNewQuestion(data) {
    try {
        const response = await instance.post("/questions", data, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteQuestionById(id) {
    try {
        const response = await instance.delete(`/questions/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editQuestion(id, data) {
    try {
        const response = await instance.put(`/questions/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message || "Something went wrong"
          });
    }
}

export {
    getAllQuestion,
    createNewQuestion,
    deleteQuestionById,
    editQuestion,
    getQuestionDetail
}