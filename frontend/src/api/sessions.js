import axiosInstance from "../lib/axios";


export const sessionAPI = {
  createSession: async (data) => {
    const response = await axiosInstance.post("/sessions/create", data);
    return response.data;
  },
    getActiveSessions: async () => {
        const response=await axiosInstance.get("/sessions/active");
        return response.data;
    },
    getMyRecentSessions: async () => {
        const response=await axiosInstance.get("/sessions/my-recent");
        return response.data;
    },
    joinSession: async (sessionId) => {
        const response = await axiosInstance.post(`/sessions/${sessionId}/join`);
        return response.data;
    },  
    getSessionById: async (sessionId) => {
        const response = await axiosInstance.get(`/sessions/${sessionId}`);
        return response.data;
    },
    endSession: async (sessionId) => {
        const response = await axiosInstance.post(`/sessions/${sessionId}/end`);
        return response.data;
    }  ,
    getStreamToken: async () => {
        const response = await axiosInstance.post(`/chat/token`);
        return response.data;
    }
};
