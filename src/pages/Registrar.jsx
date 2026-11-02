
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

        <div>

            <h1>Crear cuenta</h1>

            <form onSubmit={manejarRegistro}>

                <div>
                    <label>Nombre de usuario</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingrese su usuario"
                        required
                    />
                </div>

                <div>
                    <label>Contraseña</label>

                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        required
                    />
                </div>

                <div>
                    <label>Rol en el sistema</label>

                    <select
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
                        style={{
                            color: tipoMensaje === "exito"
                                ? "green"
                                : "red"
                        }}
                    >
                        {mensaje}
                    </p>
                )}

                <button type="submit" disabled={cargando}>
                    {cargando ? "Registrando..." : "Registrarse"}
                </button>

            </form>
            <button
                type="button"
                onClick={() => navigate("/login")}
            >
                Volver al login
            </button>

        </div>

    );
}

export default Registrar;
