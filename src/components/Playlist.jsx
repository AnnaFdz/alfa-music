import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../styles/customPlaylist.css";
import SideBar from "./SideBar";
import Card from "./Card";

function Playlist() {
    const location = useLocation();
    const { playlistID } = location.state;
    const [songs, setSongs] = useState([]);
    
    const [{ data: playlistData, isError: playlistError, isLoading: playlistLoading }, doFetchPlaylist] = useFetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${playlistID}/`, {});

    useEffect(() => {
        if (playlistID) {
            doFetchPlaylist();
        }
    }, []);

     useEffect(() => {
         if (playlistData) {
             const fetchSongs = async () => {
                 try {
                     const songPromises = playlistData.entries.map(songId => 
                         fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}/`)
                             .then(response => response.json())
                     );
                     const songData = await Promise.all(songPromises);
                     setSongs(songData);
                 } catch (error) {
                     console.error("Error fetching songs:", error);
                 }
             };
             fetchSongs();
         }
     }, [playlistData]);

    const handleAddSong = async (songId) => {
        // Lógica para agregar la canción a la playlist
    };

    const handleRemoveSong = async (songId) => {
        // Lógica para eliminar la canción de la playlist
    };

    if (playlistLoading) return <h1>Cargando...</h1>;
    if (playlistError) return <h1>Error al traer la playlist</h1>;
    if (!playlistData) return <h1>No hay datos de la playlist disponibles</h1>;

    return (
        <div className="columns is-gapless">
            <div className="column is-narrow sidebar-column">
                <SideBar />
            </div>
            <div className="column playlist-container">
                <button className="button is-link mt-5" onClick={handleAddSong}>Agregar canción</button>
                <h1 className="title">Canciones de {playlistData.name}</h1>
                <div className="columns is-multiline">
                    {songs.length > 0 ? (
                        songs.map((song) => (
                            <div className="column is-one-quarter" key={song.id}>
                                <span className="remove" onClick={handleRemoveSong}>X</span>
                                <Card song={song}/>
                            </div>
                        ))
                    ) : (
                        <p>No hay canciones disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
