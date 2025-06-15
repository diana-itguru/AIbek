import time
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError


def wait_for_db():
    engine = create_engine("postgresql+psycopg2://postgres:postgres@db:5432/mydatabase")
    max_retries = 10
    retry_delay = 5

    for _ in range(max_retries):
        try:
            conn = engine.connect()
            conn.close()
            return True
        except OperationalError:
            time.sleep(retry_delay)

    return False