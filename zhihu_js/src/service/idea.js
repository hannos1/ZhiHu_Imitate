import axios from "./config";

export const getIdeas = () => {
    // console.log('hhhhh')
    return axios.get('/Ideas')
}