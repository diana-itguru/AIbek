import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import ornament1 from "../assets/ornament_1.png";
import ornament2 from "../assets/ornament_2.png";
import ornament3 from "../assets/ornament_3.png";
import ornament4 from "../assets/ornament_4.png";
import aibekPhoto from "../assets/aibek_avatar.png";
import "../style/up_style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function RegisterForm() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = async () => {
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post('http://localhost:5000/register/', form);
            setSuccess('Регистрация успешна!');
            console.log(response.data);
            setTimeout(() => navigate('/chat'), 1000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Ошибка регистрации');
        }
    };

    return (
        <main className="sign-up-page">
            <div className="sign-up-container">
                <img className="aibek-photo" alt="Aibek photo" src={aibekPhoto} />

                <h1 className="greeting-text">
                    Приятно познакомиться!
                </h1>
                <form onSubmit={(e) => { e.preventDefault(); register(); }}>
                    <div className="input-group">
                        <label className="input-label">Email:</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="auth-input"
                            placeholder="Введите адрес электронной почты"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Имя пользователя:</label>
                        <input
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            className="auth-input"
                            placeholder="Введите имя пользователя"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Пароль:</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            className="auth-input"
                            placeholder="Введите пароль"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Зарегистрироваться
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <p className="sign-in-text">
                    Мы уже знакомы? {' '}
                    <Link to="/LogIn" className="sign-in-link">
                        Входи брат/сестра!
                    </Link>
                </p>

                <div className="sign-up-ornaments-container">
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
            <ToastContainer />
        </main>
    );
}

export default RegisterForm;