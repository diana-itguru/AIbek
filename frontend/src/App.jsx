import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import LogIn from './pages/LogIn.jsx';
import Register from './pages/Register.jsx';
import Chat from './chat/Chat.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;