#  YouTube Chatbot with RAG

A full-stack AI-powered web application that enables users to process YouTube videos and ask contextual questions using **Retrieval-Augmented Generation (RAG)**.

---

##  Features

*  **YouTube Video Processing**
  Extracts and processes transcripts from YouTube videos

*  **Intelligent Q&A**
  Ask questions and get accurate answers based on video content

*  **FastAPI Backend**
  High-performance backend for handling requests and AI processing

*  **Modern React Frontend**
  Clean and responsive UI built with React + Vite

*  **Semantic Search (FAISS)**
  Efficient vector-based retrieval of relevant transcript chunks

*  **OpenAI Integration**
  Uses LLMs for generating natural, context-aware responses

---

##  Tech Stack

###  Backend

* **Python**
* **FastAPI**
* **FAISS**
* **OpenAI API**
* **YouTube Transcript API**
* **Uvicorn**

###  Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **Axios**

---

##  Prerequisites

Make sure you have:

* Python 3.8+
* Node.js 16+
* npm or yarn
* OpenAI API Key

---

##  Installation

### Backend Setup

```bash
cd backend
python -m venv venv
```

Activate environment:

**Windows**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

---

##  Usage

### Start Backend

```bash
cd backend
uvicorn main:app --reload
```

Backend runs on:
 http://localhost:8000

---

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:
 http://localhost:5173

---

##  How It Works

1. User submits a YouTube URL
2. Transcript is extracted and split into chunks
3. Embeddings are generated using OpenAI
4. FAISS index is created for semantic search
5. User asks a question
6. Relevant chunks are retrieved
7. LLM generates a contextual answer

---

##  API Endpoints

### 🔹 POST `/process_video`

Process a YouTube video

* Query Param:

```
url: YouTube video URL
```

---

### 🔹 POST `/ask`

Ask a question about the processed video

* Query Param:

```
question: User question
```

---

##  Limitations

* Depends on availability of YouTube transcripts
* Some videos may not provide captions
* Cloud environments may restrict transcript access

---

##  Future Improvements

*  Whisper-based transcription (works for all videos)
*  Chat history persistence
*  Deployment (Vercel + Render)
*  Multi-video support

---

##  Demo

<img width="1919" height="1121" alt="Screenshot 2026-04-10 110146" src="https://github.com/user-attachments/assets/1e32b334-9b3d-4a86-ab1a-fee8a6293515" />
<img width="1919" height="1123" alt="Screenshot 2026-04-10 110212" src="https://github.com/user-attachments/assets/908e79f9-b8cb-4a01-9372-eb5584a5fe0b" />



---

##  Author

**Prajwal P Bailkeri**
