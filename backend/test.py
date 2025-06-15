from dotenv import load_dotenv
import os
load_dotenv()  # Загрузит ваш .env
print("Ключ загружен:", os.getenv("HF_API_KEY") is not None)