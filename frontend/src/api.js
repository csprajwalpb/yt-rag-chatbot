import axios from "axios";

//Base URL for backend API
const API = "http://127.0.0.1:8000"

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