import axios from "./config";

export const getPathList = () => {  // 二级导航的路径信息
    return axios.get('/getPathList')
}