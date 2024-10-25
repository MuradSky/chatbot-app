import axios from "axios"

export const api = {
    async postUserData(data) {
        const res = await axios.post('/api', data);
        return res.data;
    }
}