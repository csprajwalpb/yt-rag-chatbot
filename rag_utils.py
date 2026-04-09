from youtube_transcript_api import YouTubeTranscriptApi
from openai import OpenAI
import re
import faiss
import numpy as np
from config import OPENAI_API_KEY, EMBEDDING_MODEL, LLM_MODEL

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# 1. Extract video ID from YouTube URL
def extract_video_id(url):
    patterns = [
        r"?:v|\/)([0-9A-Za-z_-]{11}).*",
        r"youtu\.be\/([0-9A-Za-z_-]{11})",
        r"shorts\/([0-9A-Za-z_-]{11})"
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

# 2. Fetch transcript using YouTube Transcript API
def get_transcript(video_id):
    try:
        yt_api = YouTubeTranscriptApi()
        try:
            # Try fetching the transcript in English first
            transcript_data = yt_api.fetch(video_id, languages=['en'])
        except Exception:
            transcript_list = yt_api.list(video_id)

            # Fetch the first available transcript if English is not available
            transcript_data = next(iter(transcript_list)).fetch()  

        full_text = " ".join(item.text for item in transcript_data)
        return re.sub(r"\s+", " ", full_text)
    
    except Exception as e:
        print(f"Error fetching transcript: {e}")
        return None
    
# 3. Splitte transcript into chunks
def split_text(text, chunk_size=150):
    words = text.split()
    return [
        " ".join(words[i:i+chunk_size]) 
        for i in range(0, len(words), chunk_size)
    ]

# 4. Generate embeddings for chunks
def generate_embeddings(text_list):
    response = client.embeddings.create(
        input=text_list,
        model=EMBEDDING_MODEL
    )

    # Convert the list of embeddings to a NumPy array
    return np.array(item.embedding for item in response.data).astype("float32")

# 5. Create FAISS index
def build_faiss_index(embeddings):
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    return index

# 6. Retrieve relevant chunks based on query
def retrieve_chunks(index, query_embedding, k=3):
    distances, indices = index.search(
        np.array([query_embedding]).astype("float32"), k)
    return indices[0]

# 7. Generate response 
def ask_llm(context, question):
    if not context.strip():
        return "Sorry, I couldn't find any relevant information in the video."
    
    # Truncate context to fit within token limits (approx. 6000 characters)
    context = context[:6000]

    prompt = f"""You are an AI assistant that answers questions based on the provided youtube video. 
    The transcript may be in any language. Always answer in English using the provided context.
    context:\n\n{context}\n\nQuestion: {question}\nAnswer clearly in English: """

    # Generate response using the LLM
    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": "You answer questions about the provided youtube video"},
            {"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content