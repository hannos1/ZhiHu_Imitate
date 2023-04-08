import axios from "./config";

export const getTypeList = () => {  // 获得'全站'的数据
    return axios.get('/searchdetail')
}