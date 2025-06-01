import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api/gamification",
  
});

const gamificationService = {

    async getGamification() {
        try {
        const token = localStorage.getItem('token');
        const response = await api.get('/', {
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

    async getGamificationForChild() {
        try {
        const token = localStorage.getItem('token');
        const response = await api.get('/child/gamification', {
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
    }
}

export default gamificationService;