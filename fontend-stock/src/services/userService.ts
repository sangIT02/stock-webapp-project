// File: src/services/userService.js
import axios from "axios";

interface ApiResponse {
    code: number;
    message: string;
    data?: any;
}


// 1. Cấu hình đường dẫn gốc của Backend Spring Boot
const API_URL = "http://localhost:8080/api/users"; 

// 2. Định nghĩa object userService chứa các hàm gọi API
const userService = {
    
    // Hàm đăng ký
    sentOtp: (email: string) => {
        // Gọi API POST lên Backend
        return axios.post(`${API_URL}/sent-otp?email=${email}`);
    },

    // Bạn có thể viết thêm các hàm khác ở đây
    login: (username: string, password: string) => {
        return axios.post(`${API_URL}/login`, { username, password });
    },
    
    verifyOtp: (email: string, otp: string) => {
        const body = {email, otp};
        // const config = {
        //     headers:{
        //         'Authorization': `Bearer ${token}`, // Token thường có tiền tố Bearer
        //         'Content-Type': 'application/json'
        //     }
        // }
        return axios.post(`${API_URL}/verify-otp`,body);
    }
};

// 3. Xuất nó ra để các nơi khác dùng
export default userService;