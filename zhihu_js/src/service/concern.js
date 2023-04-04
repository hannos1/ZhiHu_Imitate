import axios from "./config";

export const getConcernList = () => {
    return axios.get('/ConcernList')
}