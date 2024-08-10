import { useState, useEffect } from "react";
import useTheme from "../hooks/useTheme";
import { useAuth } from "../contexts/AuthContext";

export default function DeleteSongModal({ isOpen, onClose, song_id, onDelete, onSongDeleted }) {
    const { token } = useAuth("state");
    const { theme } = useTheme();

    const [isSuccess, setIsSuccess] = useState(false);

    const handleDeleteSong = (event) => {
        event.preventDefault();

        onDelete.doFetch(
            `https://sandbox.academiadevelopers.com/harmonyhub/songs/${song_id}/`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
        .then(() => {
            setIsSuccess(true);
        })
        .catch(() => {
            setIsSuccess(false);
        });
    };

    useEffect(() => {
        if (!onDelete.isLoading && isSuccess) {
            onSongDeleted();
            onClose();
        }
    }, [onDelete.isLoading, isSuccess, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-danger-70">
                    <p className="modal-card-title">Eliminar Canción</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section
                    className={`modal-card-body ${
                        theme === "pink" ? "pinkBackground" : "blueBackground"
                    }`}
                >
                    <div className="box">
                        <form onSubmit={handleDeleteSong}>
                            <div className="field">
                                <p className="subtitle">
                                    ¿Estas seguro que deseas eliminar esta canción?
                                    El cambio es permanente!!!
                                </p>
                            </div>
                            <button
                                className="button is-primary"
                                type="submit"
                                disabled={onDelete.isLoading}
                            >
                                {onDelete.isLoading
                                    ? "Eliminando..."
                                    : "Confirmar"}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
