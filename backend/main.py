from pydantic.v1 import BaseModel

from fastapi import FastAPI
from rag_utils import *
from rag_utils import extract_video_id
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global storage
chunks = []
index = None

class VideoRequest(BaseModel):
    url: str

class QuestionRequest(BaseModel):
    question: str

# Endpoint to process YouTube video URL
@app.post("/process_video")
def process_video(request: VideoRequest):
    global chunks, index

    # Extract video ID
    video_id = extract_video_id(request.url)
    if not video_id:
        return {"error": "Invalid YouTube URL"}

    # Fetch transcript
    transcript = get_transcript(video_id)
    if transcript is None:
        return {"error": "Could not fetch transcript"}

    # Split transcript, generate embeddings, and build FAISS index
    chunks = split_text(transcript)
    embeddings = generate_embeddings(chunks)
    index = build_faiss_index(embeddings)

    return {"message": "Video processed successfully"}

# 2. Endpoint to handle user queries
@app.post("/ask")
def ask(request: QuestionRequest):
    if index is None:
        return {"error": "No video processed yet"}
    
    try:
        question = request.question
        # Generate embedding for the question
        query_embedding = generate_embeddings([question])[0]

        # Search for relevant chunks using FAISS
        top_chunks = retrieve_chunks(index, query_embedding)
        if len(top_chunks) == 0:
            return {"error": "No relevant information found"}
        
        # Combine Context
        context_chunks = []
        for i in top_chunks:
            if i < len(chunks):
                context_chunks.append(chunks[i])

        context = " ".join(context_chunks)

        print("Retrieved chunks: ", top_chunks)
        print("Context Preview: ", context[:300])

        # Generate response using LLM
        answer = ask_llm(context, question)
        return {"answer": answer}
    
    except Exception as e:
        print("Ask error: ", e)
        return {"error": str(e)}