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
        <div>
            <h1>Iniciar Secion</h1>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {err && <p>{err}</p>}

                <button type="submit">Ingresar</button>

            </form>
            <button type="button" onClick={() => navigate('/registro')}>Crear cuenta</button>
        </div>
    )

}

export default Login;