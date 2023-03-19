import axios from "./config";

export const getRecommend = () => {
    return axios.get('/recommend')
}