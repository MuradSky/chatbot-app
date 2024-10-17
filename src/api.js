import axios from "axios"

export const api = {
    async postUserData(data) {
        const res = await axios.post(import.meta.env.VITE_BACKEND_API, data);
        return res.data;
    }
}