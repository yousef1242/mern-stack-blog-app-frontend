import axios from "axios";


const request = axios.create({
    baseURL : "https://mern-stack-blog-app-api.onrender.com/"
})

export default request