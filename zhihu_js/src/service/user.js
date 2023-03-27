import axios from "./config";

export const getUser = (pramas) => {
    return axios.get('/getuser',pramas)
}