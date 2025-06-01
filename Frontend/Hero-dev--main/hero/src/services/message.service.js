import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api/message",
  
});

const messageService = {
    async sendMessage(data) {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/send',data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || 'Error sending message'
            );
        }
    },

      async getMessages(chatId) {
        try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/${chatId}`, {
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
};

export default messageService;