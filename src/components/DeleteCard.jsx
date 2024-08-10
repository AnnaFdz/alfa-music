import DeleteSongModal from "./DeleteSongModal";
import imgDefault from "../components/imgs/AT.jpeg";
// import useFetchProfile from "../hooks/useFetchProfile";
import { useEffect, useState } from "react";
import useFetchDelete from "../hooks/useFetchDelete";

export default function DeleteCard({song, onSongDeleted}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetchDelete();
    
    return (
        <>
          <div className="column">
            <div className="card">
            <div className="card-image">
            <figure className="image is-4b3">
                <img
                src={imgDefault}
                alt="image cancion"
                />
            </figure>
            </div>
            <div >
            <div className="media">
                <div className="media-content">
                <p className="title is-4">{song.title}</p>
                
                </div>
            </div>
    
            <div className="content">
            <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                
            </div>
            </div>
                </div>
        </div>
        
           <div className="column" onClick={() => setIsModalOpen(true)}>
                <button className="button is-primary is-fullwidth">
                
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
           </div>
           {isModalOpen ? (
                <DeleteSongModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    song_id={song.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                    onSongDeleted={onSongDeleted}
                />
            ) : null}
           
        </>
        
    );
}