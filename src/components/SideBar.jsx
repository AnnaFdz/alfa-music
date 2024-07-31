import logo from "./imgs/Logointro.jpeg";
import SideBarChoice from "./SideBarChoice";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import "../styles/sidebar.css"
import UserImage from "./UserImage";
import { useAuth } from "../contexts/AuthContext";
function SideBar({onPlaylistCreate, onModifyingPlaylist, playlistUpdated, setPlaylistUpdated}) {
    const { userID } = useAuth("state");
    console.log(userID);

    const [{data, isError, isLoading}, doFetch] = useFetch('https://sandbox.academiadevelopers.com/harmonyhub/playlists/',
        {}
    );
    const [isPlaylistExtended, setIsPlaylistExtended] = useState(false);
    
    const handlePlaylistCreate = () => {
        onPlaylistCreate(true);
    }

    useEffect(() => {
            doFetch();   
    },[]);

    useEffect(() => {
        if (playlistUpdated) {
            doFetch();
            setPlaylistUpdated(false);
        }
    }, [playlistUpdated, doFetch, setPlaylistUpdated])

    const handlePlaylistToggle = () => {
        setIsPlaylistExtended(!isPlaylistExtended);
    };

    if (isLoading) return <h1>Cargando...</h1>
    if (isError) return <h1>Error al traer las playlists</h1>
    if (!data) return <h1>No hay canciones Disponibles</h1>
    

    const userPlaylists = data.results?data.results.filter(playlist => playlist.owner === userID): [];

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
                                <SideBarChoice title={"Modificar Playlist"} onClick={onModifyingPlaylist}/>
                            </li>
                            <li>
                                <SideBarChoice title={"Eliminar Playlist"} onClick={onModifyingPlaylist}/>
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