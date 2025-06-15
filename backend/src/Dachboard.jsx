import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');  // Если токена нет, перенаправляем на вход
        }
    }, [navigate]);

    return (
        <div>
            <h1>Личный кабинет</h1>
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>
                Выйти
            </button>
        </div>
    );
};