import axios from 'axios'

axios.interceptors.response.use(data => {
    // console.log(data.data)
    return data.data
})

export default axios

