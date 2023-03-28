import axios from "./config";

export const getRecommend = () => {
    return axios.get('/recommend')
}

export const getRecommendIndex = () => {
    return axios.get('/indexOfRecommend')
}