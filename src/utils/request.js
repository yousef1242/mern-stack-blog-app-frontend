import axios from "axios";


const request = axios.create({
    baseURL : "https://blog-app-mern-stack.onrender.com"
})

export default request