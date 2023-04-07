import axios from "./config";

export const getHotwords = () => {
    return axios.get('/Hotwords')  
}

export const getSearchwords = (words) => {  // 获取seo的关键词
    return axios.get('/Searchwords?words=' + words)  
}