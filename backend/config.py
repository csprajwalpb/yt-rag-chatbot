# Store configuration values for the server here
import os
from dotenv import load_dotenv

# Get absolute path to backend/.env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(BASE_DIR, ".env")

# Load environment variables from .env file
load_dotenv(dotenv_path=env_path)

# Get the OpenAI API key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Embedding model configuration for vector embeddings
EMBEDDING_MODEL = "text-embedding-3-small"

# LLM model configuration for generating responses
LLM_MODEL = "gpt-4o-mini"
