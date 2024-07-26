import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import "../styles/login.css";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);
    
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/api-auth/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }
    );

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        setTriggerFetch(true);
        doFetch();
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    }

    useEffect(() => {
        if (data && !isError && triggerFetch) {
            login(data.token);
        }
    }, [data, isError, triggerFetch]);

    return (
        <div className="page-background">
            <div className="form-container">
                <form id="loginForm" onSubmit={handleSubmit} className="box has-background-dark has-text-white">
                    <h2 className="title is-4 has-text-centered has-text-white">Inicio de Sesión</h2>

                    <div className="field">
                        <label className="label has-text-white">Username</label>
                        <div className="control has-icons-left">
                            <input
                                className="input has-background-grey-dark has-text-white"
                                type="text"
                                name="username"
                                id="username"
                                required
                                onChange={handleChange}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label has-text-white">Password</label>
                        <div className="control has-icons-left">
                            <input
                                className="input has-background-grey-dark has-text-white"
                                type="password"
                                name="password"
                                id="password"
                                required
                                onChange={handleChange}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary is-fullwidth">
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>

                    {isLoading && triggerFetch && <p className="has-text-centered has-text-white">Cargando...</p>}
                    {isError && <p className="has-text-centered has-text-danger">Error al cargar los datos.</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
