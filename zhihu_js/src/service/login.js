import axios from "./config";

export const login = (pramas) => {
    return axios.post('/login',pramas)
}

export const register = (pramas) => {
    return axios.post('/register',pramas)
}