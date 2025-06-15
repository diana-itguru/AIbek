import requests
from dotenv import load_dotenv
import os
from typing import Dict, Any

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")


def query_huggingface(prompt: str, model: str = "HuggingFaceH4/zephyr-7b-beta") -> Dict[str, Any]:
    """
    Отправляет запрос к Hugging Face API и возвращает ответ

    Параметры:
        prompt: Текст запроса
        model: Идентификатор модели (по умолчанию Mistral 7B)

    Возвращает:
        Словарь с ответом или ошибкой
    """
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
        else:
            return {
                "success": False,
                "error": f"API Error {response.status_code}",
                "details": response.text
            }

    except Exception as e:
        return {"success": False, "error": str(e)}


# Пример использования
if __name__ == "__main__":
    prompt = """Ты - физик-эксперт. Объясни квантовую физику простыми словами:
1. Основной принцип
2. Пример из повседневной жизни
3. Почему это важно"""

    result = query_huggingface(prompt)

    if result["success"]:
        print("Успешный ответ:\n", result["response"])
    else:
        print("Ошибка:", result["error"])