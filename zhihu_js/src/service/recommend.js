import axios from "./config";

export const getRecommend = () => {
    return axios.get('/recommend')  // 原本用于获得二级导航的路径列表现在没用了
}

export const getRecommendIndex = () => {  // 获得'全站'的数据
    return axios.get('/indexOfRecommend')
}