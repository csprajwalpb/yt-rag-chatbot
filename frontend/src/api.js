import axios from "axios";

//Base URL for backend API
const api = "http://127.0.0.1:8000"

// Process video by sending URL to backend
export const processVideo = async (url) => {
  return await axios.post(`${api}/process_video`, {
    url: url 
  })
}

// Answer Question
export const askQuestion = async (question) => {
  return await axios.post(`${api}/ask`, {
    question: question
  })
}