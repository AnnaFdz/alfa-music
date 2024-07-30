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
        <>
            <div className="container">
                <UserImage/>
                <SideBarChoice title={"Inicio"}>
                    <i className="fa-solid fa-house"></i>
                </SideBarChoice>
                <SideBarChoice title={"Playlists"} onClick={handlePlaylistToggle}>
                    <i className="fa-solid fa-music"></i>
                </SideBarChoice>
                {isPlaylistExtended && (
                    <>
                        <div className="submenu">
                            <SideBarChoice title={"Crear Playlist"} onClick={handlePlaylistCreate}>
                                <i className="fa-solid fa-plus"></i>
                            </SideBarChoice>
                        </div>
                        <div className="submenu">
                            <SideBarChoice title={"Modificar Playlist"} onClick={onModifyingPlaylist}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </SideBarChoice>
                        </div>
                        <div className="submenu">
                            <SideBarChoice title={"Eliminar Playlist"} onClick={onModifyingPlaylist}>
                                <i className="fa-solid fa-eraser"></i>
                            </SideBarChoice>
                        </div>
                    </>
                    
                )}

                <div className="playlist">Playlist</div>
                <hr />
                {userPlaylists.length > 0 ? userPlaylists.map((playlist) => (
                    <SideBarChoice key={playlist.id} title={playlist.name} />
                )) : <p>No hay playlists disponibles.</p>}

            </div>
        </>
    )
}

export default SideBar;