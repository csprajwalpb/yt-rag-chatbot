# Store configuration values for the server here
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Embedding model configuration for vector embeddings
EMBEDDING_MODEL = "text-embedding-3-small"

# LLM model configuration for generating responses
LLM_MODEL = "gpt-4o-mini"
