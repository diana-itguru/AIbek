from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests
from typing import Dict, Any

router = APIRouter()

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "HuggingFaceH4/zephyr-7b-beta")


class NewsCheckRequest(BaseModel):
    text: str


def query_huggingface(prompt: str, model: str = MODEL_NAME) -> Dict[str, Any]:
    """Универсальная функция для запросов к Hugging Face API"""
    try:
        response = requests.post(
            f"https://api-inference.huggingface.co/models/{model}",
            headers={"Authorization": f"Bearer {HF_API_KEY}"},
            json={
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": 500,
                    "temperature": 0.7,
                    "do_sample": True
                }
            },
            timeout=60
        )

        if response.status_code == 200:
            return {"success": True, "response": response.json()[0]["generated_text"]}
        return {
            "success": False,
            "error": f"API Error {response.status_code}",
            "details": response.text
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


@router.post("/check_news/")
async def check_news(data: NewsCheckRequest):
    prompt = (
        "Проанализируй текст на достоверность. Формат ответа:\n"
        "1. Вердикт: фейк/правда/требует проверки\n"
        "2. Критические аргументы\n"
        "3. Рекомендации по проверке\n\n"
        f"Текст: {data.text}"
    )

    result = query_huggingface(prompt)
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return {"analysis": result["response"]}