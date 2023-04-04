import axios from "./config";

export const getHots = (params) => {
    return axios.get('/Hots' + '?' + params)
}