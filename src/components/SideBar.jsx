import SideBarChoice from "./SideBarChoice";
import { useEffect, useState } from "react";
import "../styles/sidebar.css"
import UserImage from "./UserImage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SideBar({playlistUpdated, setPlaylistUpdated}) {
    const { userID } = useAuth("state");
    const navigate = useNavigate();
    const [isPlaylistExtended, setIsPlaylistExtended] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const handlePlaylistCreate = () => {
        navigate("/form");
    }

    const handlePlaylistModify = () => {
        navigate("/modPlaylist", { state: { userPlaylists}});
    }

    const handlePlaylistDelete = () => {
        navigate("/delPlaylist", { state: { userPlaylists}});
    }

    const fetchPlaylists = async (url) => {
        setIsLoading(true);
        setIsError(false);

        try {
            let allPlaylists = [];
            let nextUrl = url;

            while (nextUrl) {
                const response = await fetch(nextUrl);
                const data = await response.json();
                allPlaylists = [...allPlaylists,...data.results];
                nextUrl = data.next;
            }
            setPlaylists(allPlaylists);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPlaylists(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/`);
    }, []);

    useEffect(() => {
        if (playlistUpdated) {
            fetchPlaylists('https://sandbox.academiadevelopers.com/harmonyhub/playlists/');
            setPlaylistUpdated(false);
        }
    }, [playlistUpdated, setPlaylistUpdated])

    const handlePlaylistToggle = () => {
        setIsPlaylistExtended(!isPlaylistExtended);
    };

    if (isLoading) return <h1>Cargando...</h1>
    if (isError) return <h1>Error al traer las playlists</h1>
    if (!playlists) return <h1>No hay playlists Disponibles</h1>
    
    const userPlaylists = playlists.filter(playlist => playlist.owner === userID);

    return (
        <aside className="menu">
            <UserImage />
            <ul className="menu-list">
                <li>
                    <SideBarChoice title={"Playlists"} onClick={handlePlaylistToggle}/>
                    {isPlaylistExtended && (
                        <ul>
                            <li>
                                <SideBarChoice title={"Crear Playlist"} onClick={handlePlaylistCreate}/>
                            </li>
                            <li>
                                <SideBarChoice title={"Modificar Playlist"} onClick={handlePlaylistModify}/>
                            </li>
                            <li>
                                <SideBarChoice title={"Eliminar Playlist"} onClick={handlePlaylistDelete}/>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
            <p className="menu-label">Playlist</p>
            <ul className="menu-list">
                {userPlaylists.length > 0 ? userPlaylists.map((playlist) => (
                    <li key={playlist.id}>
                        <SideBarChoice title={playlist.name} />
                    </li>
                )) : <p>No hay playlists disponibles.</p>}
            </ul>
        </aside>
    );
}

export default SideBar;