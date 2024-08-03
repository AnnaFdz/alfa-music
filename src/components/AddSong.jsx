import { useState } from "react";

function AddSong() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [songFile, setSongFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleBack = () => {
        // Handle navigation back
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="box">
                <div className="field">
                    <label className="label">Título</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Título de la canción"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            maxLength={255}
                            minLength={1}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Año de lanzamiento</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Año de lanzamiento"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            min="-2147483648"
                            max="2147483647"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Archivo de canción</label>
                    <div className="control">
                        <input
                            className="input"
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setSongFile(e.target.files[0])}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Agregar Canción
                        </button>
                    </div>
                    <div className="control m-4">
                        <button type="button" className="button is-primary" onClick={handleBack}>
                            Volver
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AddSong;
