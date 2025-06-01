import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api/parent",
  
});

const api2 = axios.create({
    baseURL: "http://localhost:3001/api/auth",
  
});

const parentService = {
        async registerParent(data) {
    try {
        const response = await api.post('/register', data);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Error registering student'
        );
    }
 
},
    async loginParent(data){
        try{
            const response = await api.post('/login', data);
            const token = response.data.token
            if(token){
                localStorage.setItem('token', token);
            }
            return response.data;
        }catch(error){
            throw new Error(
            error.response?.data?.message || 'Error login parent'
        );
        }
    },

    async getClubsByParentChild(){
    try {
        const token = localStorage.getItem('token');
        const response = await api.get('/getclubsp', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Error getting user by id'
        );
    }
    },

    async forgotPassword(data){
        try{
            const response = await api2.post('/forgot-password', data);
            return response.data;
        }catch(error){
            throw new Error(
            error.response?.data?.message || 'Error login parent'
        );
        }
    },

    async verifyOTPAndPassword(data){
        try{
            const response = await api2.post('/verifyOTP', data);
            return response.data;
        }catch(error){
            throw new Error(
            error.response?.data?.message || 'Error login parent'
        );
        }
    },
       async updatePassword(data){
        try{
            const response = await api2.post('/updatePassword', data);
            return response.data;
        }catch(error){
            throw new Error(
            error.response?.data?.message || 'Error login parent'
        );
        }
    },

}

export default parentService;