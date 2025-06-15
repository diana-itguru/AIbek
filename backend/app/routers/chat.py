from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)  # Включаем режим отладки
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .ai import query_huggingface
from typing import List, Dict

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "HuggingFaceH4/zephyr-7b-beta"


@router.post("/chat/")
async def chat(request: ChatRequest):
    print("Получен запрос:", request)
    # Форматируем историю сообщений в промпт
    prompt = "\n".join([f"{m.role}: {m.content}" for m in request.messages])

    result = query_huggingface(prompt, request.model)
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])

    return {
        "choices": [{
            "message": {
                "role": "assistant",
                "content": result["response"]
            }
        }]
    }