import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_url } from '../config/apiConfig';

function Perfil() {
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState('');

    const { token, logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const response = await fetch(`${API_BASE_url}/auth/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudo cargar perfil, inicie sesion nuevamente')
                }

                const datos = await response.json()

                setDatosPerfil(datos);

            } catch (err) {
                setError(err.message);
            }
        };
        cargarPerfil();
    }, [token]);

    const manejarLogOut = async()=>{
        try{
            await fetch(`${API_BASE_url}/auth/logout`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }catch(err){
            console.log('Error de red al intentar revocar el token'+err)
        }

        logout();

        navigate('/login')
    }

    return (
    <div className="profile-container">
        <div className="profile-header">
            <h2 className="profile-title">
                <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Perfil del usuario
            </h2>
            <button className="logout-btn" onClick={manejarLogOut}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Cerrar Sesión
            </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {datosPerfil && (
            <div className="profile-card">
                <p className="profile-info"><strong>Mensaje:</strong> {datosPerfil.Mensaje}</p>
                <p className="profile-info"><strong>Usuario:</strong> {datosPerfil.Usuario}</p>
                <p className="profile-info"><strong>Rol:</strong> {datosPerfil.rol_detectado}</p>
                <p className="profile-info"><strong>Status:</strong> {datosPerfil.status}</p>
            </div>
        )}
    </div>
)

}

export default Perfil;