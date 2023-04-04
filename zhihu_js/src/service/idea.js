import axios from "./config";

export const getIdeas = () => {
    return axios.get('/Ideas')
}