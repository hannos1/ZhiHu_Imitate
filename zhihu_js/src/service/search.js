import axios from "./config";

export const getHotwords = () => {
    return axios.get('/Hotwords')  
}