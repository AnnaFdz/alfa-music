import { Link, useLocation } from "react-router-dom";


export default function SongOptions() {
    const location = useLocation();
    const currentPath = location.pathname;
    
    return (
        <>
        <nav className="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
        <ul>
            <Link 
                    to="/createSong" 
                    className={currentPath === "/createSong" ? "is-active" : ""}
                    title="Crear canción"

                >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    
                </Link>
            
            <Link 
                    to="/modifySong" 
                    className={currentPath === "/modifySong" ? "is-active" : ""}
                    title="Editar canción"
                >
                    <i className="fas fa-pencil-alt"></i>
                </Link>
               
            <Link 
                    to="/deleteSong" 
                    className={currentPath === "/deleteSong" ? "is-active" : ""}
                    title="Eliminar canción"
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </Link>
            
            
        </ul>
        </nav>
           
        </>
        
    );
}
{/* <p className="panel-tabs">
<Link 
    to="/" 
    className={currentPath === "/" ? "is-active" : ""}
    title="Crear canción"

>
    <i className="fa fa-plus" aria-hidden="true"></i>
    
</Link>
<Link 
    to="/editSong" 
    className={currentPath === "/editSong" ? "is-active" : ""}
    title="Editar canción"
>
    <i className="fas fa-pencil-alt"></i>
</Link>
<Link 
    to="/deleteSong" 
    className={currentPath === "/deleteSong" ? "is-active" : ""}
    title="Eliminar canción"
>
    <i className="fa fa-trash" aria-hidden="true"></i>
</Link>
</p> */}