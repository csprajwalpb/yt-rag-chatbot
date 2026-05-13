import axios from "axios";

//Base URL for backend API
const API = "https://yt-rag-chatbot-1.onrender.com"

// Process video by sending URL to backend
export const processVideo = async (url) => {
  return axios.post(`${API}/process_video`, null, {
    params: {url} 
  })
}

// Answer Question
export const askQuestion = async (question) => {
  return axios.post(`${API}/ask`, null, {
    params: {question}
  })
}