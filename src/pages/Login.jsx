import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_url } from '../config/apiConfig';

function Login() {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [err, setErr] = useState('');

    const navigate = useNavigate()

    const { login } = useAuth();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        try {
            console.log("Enviando solicitud de login...");

            const response = await fetch(`${API_BASE_url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            console.log("Estado de respuesta:", response.status);

            const texto = await response.text();

            console.log("Respuesta del servidor:", texto);

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const datos = JSON.parse(texto);

            console.log("Datos recibidos:", datos);

            login(datos.token);
            navigate('/perfil');

        } catch (error) {
            console.error("Error en el login:", error);
            setErr(error.message);
        }
    };

    return (
    <div className="auth-container">
        <h1 className="auth-title">
            <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3"/></svg>
            Iniciar Sesión
        </h1>
        <form className="auth-form" onSubmit={manejarSubmit}>
            <div className="form-group">
                <label className="form-label">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Usuario
                </label>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Contraseña
                </label>
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {err && <p className="error-message">{err}</p>}

            <button className="auth-button primary-btn" type="submit">Ingresar</button>
        </form>
        <button className="auth-button secondary-btn" type="button" onClick={() => navigate('/registrar')}>Crear cuenta</button>
    </div>
)

}

export default Login;