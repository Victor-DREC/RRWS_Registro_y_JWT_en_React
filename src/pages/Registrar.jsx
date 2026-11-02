
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_url } from "../config/apiConfig";

function Registrar() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("USER");

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const [cargando, setCargando] = useState(false);

    const manejarRegistro = async (e) => {

        e.preventDefault();

        setMensaje("");
        setTipoMensaje("");
        setCargando(true);

        try {

            const response = await fetch(`${API_BASE_url}/auth/registrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                    rol
                })
            });

            const texto = await response.text();

            if (response.status === 201) {

                setTipoMensaje("exito");
                setMensaje("¡Usuario registrado correctamente!");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            } else {

                let errorServidor = texto;

                try {
                    const datosError = JSON.parse(texto);
                    errorServidor = datosError.message
                        || datosError.error
                        || datosError.mensaje
                        || texto;
                } catch (error) {
                    error.message;
                }

                throw new Error(
                    errorServidor || "No se pudo registrar el usuario"
                );
            }

        } catch (error) {

            setTipoMensaje("error");
            setMensaje(
                error.message || "Error al conectar con el servidor"
            );

        } finally {

            setCargando(false);

        }
    };

    return (
    <div className="auth-container">
        <h1 className="auth-title">
            <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            Crear cuenta
        </h1>
        <form className="auth-form" onSubmit={manejarRegistro}>
            <div className="form-group">
                <label className="form-label">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Nombre de usuario
                </label>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingrese su usuario"
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
                    placeholder="Ingrese su contraseña"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.752 1.077 1.37 1.3l.09.03h.09a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    Rol en el sistema
                </label>
                <select
                    className="form-input"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    required
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>

            {mensaje && (
                <p
                    className="status-message"
                    style={{
                        color: tipoMensaje === "exito"
                            ? "#2e7d32"
                            : "#d32f2f"
                    }}
                >
                    {mensaje}
                </p>
            )}

            <button className="auth-button primary-btn" type="submit" disabled={cargando}>
                {cargando ? "Registrando..." : "Registrarse"}
            </button>
        </form>
        <button
            className="auth-button secondary-btn"
            type="button"
            onClick={() => navigate("/login")}
        >
            Volver al login
        </button>
    </div>
);
}

export default Registrar;
