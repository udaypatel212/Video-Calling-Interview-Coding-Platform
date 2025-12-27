import axios from 'axios'

const axiosInstanc=axios.create(
    {
        baseURL:import.meta.env.VITE_API_URL,
        withCredentials:true //browser will send cookies to server automatically with every single request 
    }

)

export default axiosInstanc;