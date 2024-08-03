import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function AddSong() {
    const { token } = useAuth("state");
    const location = useLocation();
    const navigate = useNavigate();
    const playlistID = location.state?.playlistID;
    const [title, setTitle] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState("");
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
    const [isErrorAlbum, setIsErrorAlbum] = useState(false);
    const [isLoadingArtist, setIsLoadingArtist] = useState(false);
    const [isErrorArtist, setIsErrorArtist] = useState(false);

    // Para el combobox de albums
    const fetchAllAlbums = async (url) => {
        setIsLoadingAlbum(true);
        setIsErrorAlbum(false);
        try {
            let allAlbums = [];
            let nextUrl = url;

            while (nextUrl) {
                const response = await fetch(nextUrl);
                if (!response.ok) throw new Error('La respuesta del server fue erronea');
                const data = await response.json();
                allAlbums = [...allAlbums, ...data.results];
                nextUrl = data.next;
            }
            setAlbums(allAlbums);
        } catch (error) {
            setIsErrorAlbum(true);
        } finally {
            setIsLoadingAlbum(false);
        }
    };

    // Para el combobox de artists
    const fetchAllArtists = async (url) => {
        setIsLoadingArtist(true);
        setIsErrorArtist(false);
        try {
            let allArtists = [];
            let nextUrl = url;

            while (nextUrl) {
                const response = await fetch(nextUrl);
                if (!response.ok) throw new Error('La respuesta del server fue erronea');
                const data = await response.json();
                allArtists = [...allArtists, ...data.results];
                nextUrl = data.next;
            }
            setArtists(allArtists);
        } catch (error) {
            setIsErrorArtist(true);
        } finally {
            setIsLoadingArtist(false);
        }
    };

    useEffect(() => {
        fetchAllAlbums(`https://sandbox.academiadevelopers.com/harmonyhub/albums/`);
        fetchAllArtists(`https://sandbox.academiadevelopers.com/harmonyhub/artists/`);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Creo nuevo canción
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('artist', selectedArtist);
            formData.append('album', selectedAlbum);
            formData.append('playlist', playlistID);
            formData.append('file', songFile);

            const songResponse = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/songs/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData
            });

            if (!songResponse.ok) throw new Error('La respuesta del server fue erronea');
            const songResult = await songResponse.json();

            // agrego la canción a la playlist
            const updateResponse = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: 1,
                    playlist: playlistID,
                    song: songResult.id
                })
            });
            console.log("ID song: ", songResult.id)
            if (!updateResponse.ok) throw new Error('La respuesta del server fue erronea');
            navigate(`/customPlaylist`, { state: { playlistID } });
        } catch (error) {
            console.error('Error al agregar la canción:', error);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    if (isLoadingAlbum || isLoadingArtist) return <h1>Cargando...</h1>;
    if (isErrorAlbum) return <h1>Error loading albums</h1>;
    if (isErrorArtist) return <h1>Error loading artists</h1>;

    return (
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
                <label className="label">Álbum</label>
                <div className="control">
                    <div className="select">
                        <select
                            value={selectedAlbum}
                            onChange={(e) => setSelectedAlbum(e.target.value)}
                            required
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
                <label className="label">Artista</label>
                <div className="control">
                    <div className="select">
                        <select
                            value={selectedArtist}
                            onChange={(e) => setSelectedArtist(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un artista</option>
                            {artists.length > 0 ? (
                                artists.map((artist) => (
                                    <option key={artist.id} value={artist.id}>
                                        {artist.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No artists available</option>
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
    );
}

export default AddSong;
