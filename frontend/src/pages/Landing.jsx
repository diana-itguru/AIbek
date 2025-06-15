import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ornament1 from "../assets/ornament_1.png";
import ornament2 from "../assets/ornament_2.png";
import ornament3 from "../assets/ornament_3.png";
import ornament4 from "../assets/ornament_4.png";
import aibekAvatar from "../assets/aibek_avatar.png";
import "../style/App.css";

const Landing = () => {
   const navigate = useNavigate();

   useEffect (() => {
       console.log('component did mount');
       return () => {
           console.log('component will unmount');
       }
   }, [])

   const handlelogin = useCallback((e) => {
       e.preventDefault();
       console.log('button clicked');
       try {
           navigate('/login');
       } catch (error) {
           console.error('Navigation error:', error);
       }
   }, [navigate])

   console.log('navigate function:', navigate);
    return (
        <main className="landing">
            <div className="landing__container">
                <img
                    className="landing__avatar"
                    alt="Фотография AI-бека"
                    src={aibekAvatar}
                />

                <h1 className="landing__title">
                    <span>Салам алейкум родной(-ая), я </span>
                    <span className="landing__title-accent">AI-бек</span>
                    <span>, виртуальный охотник за фейком!</span>
                </h1>

                <div className="landing__actions">
                    <button
                        onClick={handlelogin}
                        className="landing__button"
                        style={{cursor: 'pointer'}}>
                        Вход
                    </button>
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            console.log('button clicked');
                            try {
                                navigate('/register');
                            } catch (error) {
                                console.error('Navigation error:', error);
                            }
                        }}
                        className="landing__button landing__button--secondary">
                        Регистрация
                    </button>
                </div>

                <p className="landing__description">
                    Ты просто не представляешь как обнаглели фейки, ...,
                    <br />
                    так что надо от них избавиться, поможешь по-братски?
                </p>

                <div className="landing-ornaments-container">
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
        </main>
    );
};

export default Landing;