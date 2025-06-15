import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import ornament1 from "../assets/ornament_1.png";
import ornament2 from "../assets/ornament_2.png";
import ornament3 from "../assets/ornament_3.png";
import ornament4 from "../assets/ornament_4.png";
import aibekPhoto from "../assets/aibek_avatar.png";
import { ToastContainer } from 'react-toastify';
import "../style/in_style.css";
import axios from 'axios';

function LoginForm() {
    const [form, setForm] = useState({username: '', password: ''});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const login = async () => {
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post('http://localhost:5000/login/', form);
            setSuccess('Вход выполнен');
            console.log('Вошли как ID:', response.data.id);
            setTimeout(() => navigate('/chat'), 1000);
        } catch (err) {setError (err.response?.data?.detail || 'Ошибка входа')}
    };
    return (
        <main className="log-in-page">
            <div className="log-in-container">
                <div className="log-in-content">
                    <img className="aibek-photo" alt="Aibek photo" src={aibekPhoto}/>

                    <h1 className="login_title">
                        Салам алейкум,
                        <br/>
                        брат/сестра!
                    </h1>

                    <form onSubmit={(e) => { e.preventDefault(); login();}}>
                        <div className="input-group">
                            <label className="input-label">Имя пользователя:</label>
                            <input
                                required
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                className="auth-input"
                                placeholder="Введите имя пользователя"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Пароль:</label>
                            <input
                                required
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="auth-input"
                                placeholder="Введите пароль"
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Войти
                        </button>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        {success && <p style={{color: 'green'}}>{success}</p>}
                    </form>

                    <p className="register-text">
                        Ещё не зарегестрирован(-а)? {' '}
                        <Link to="/Register" className="sign-in-link">
                            Зарегайся!
                        </Link>
                    </p>

                    <div className="log-in-ornaments-container">
                        <img
                            className="ornament ornament_1"
                            alt="угловой орнамент"
                            src={ornament1}
                        />
                        <img
                            className="ornament ornament_2"
                            alt="угловой орнамент"
                            src={ornament2}
                        />
                        <img
                            className="ornament ornament_3"
                            alt="угловой орнамент"
                            src={ornament3}
                        />
                        <img
                            className="ornament ornament_4"
                            alt="угловой орнамент"
                            src={ornament4}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
}
export default LoginForm;