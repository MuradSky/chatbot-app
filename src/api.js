import axios from "axios"

export const api = {
    async postUserData(data) {
        const res = await axios.post('https://komusart.ru/workstatus', data);
        return res.data;
    }
}