import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useTheme from "../hooks/useTheme";
import { useState, useEffect } from "react";

function CreateSong() {
    const { token } = useAuth("state");
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const songData = location.state?.songData || null;
    const [title, setTitle] = useState(songData ? songData.title : '');
    const [selectedAlbum, setSelectedAlbum] = useState(songData ? songData.album : '');
    const [songFile, setSongFile] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
    const [isErrorAlbum, setIsErrorAlbum] = useState(false);

    const fetchAllAlbums = async (url) => {
        setIsLoadingAlbum(true);
        setIsErrorAlbum(false);
        try {
            let allAlbums = [];
            let nextUrl = url;

            while (nextUrl) {
                if (nextUrl.startsWith('http://')) {
                    nextUrl = nextUrl.replace('http://','https://');
                }
                const response = await fetch(nextUrl);
                if (!response.ok) throw new Error('La respuesta del server fue erronea');
                const data = await response.json();
                allAlbums = [...allAlbums, ...data.results];
                nextUrl = data.next;
                if (nextUrl && nextUrl.startsWith('http://')) {
                    nextUrl = nextUrl.replace('http://', 'https://');
                }
            }
            setAlbums(allAlbums);
        } catch (error) {
            setIsErrorAlbum(true);
        } finally {
            setIsLoadingAlbum(false);
        }
    };

    useEffect(() => {
        fetchAllAlbums(`https://sandbox.academiadevelopers.com/harmonyhub/albums/`);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('album', selectedAlbum);
            if (songFile) formData.append('song_file', songFile);

            const songResponse = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${songData ? songData.id : ''}`, {
                method: songData ? 'PATCH' : 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData
            });

            if (!songResponse.ok) throw new Error('La respuesta del server fue erronea');
            alert('Canción guardada con éxito');
            navigate('/');
        } catch (error) {
            console.error('Error al guardar la canción:', error);
        }
    }

    const handleBack = () => {
        navigate('/');
    };

    if (isLoadingAlbum) return <h1>Cargando...</h1>;
    if (isErrorAlbum) return <h1>Error loading albums</h1>;

    return (
        <div className={`box box3  ${
            theme === 'pink'
            ? 'pinkBackground'
            : 'blueBackground'
        }`} >
        <div className='card' 
            
        style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            marginBottom: "0.5rem",
            flexDirection: "column",
            backgroundColor: '#e98686'
        }}>
        <form onSubmit={handleSubmit} className="card-content">
            <div className="title">{songData ? 'Modificar Canción' : 'Sube una canción nueva'}</div>
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
                <label className="label">Álbum</label>
                <div className="control">
                    <div className="select">
                        <select
                            value={selectedAlbum || ''}
                            onChange={(e) => setSelectedAlbum(e.target.value)}
                        >
                            <option value="">Seleccione un álbum</option>
                            {albums.length > 0 ? (
                                albums.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.title}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No albums available</option>
                            )}
                        </select>
                    </div>
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
                        required={!songData}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-primary">
                        {songData ? 'Guardar Cambios' : 'Agregar Canción'}
                    </button>
                </div>
                <div className="control m-4">
                    <button type="button" className="button is-primary" onClick={handleBack}>
                        Volver
                    </button>
                </div>
            </div>
        </form>
        </div>
        </div>
    )
}

export default CreateSong;
