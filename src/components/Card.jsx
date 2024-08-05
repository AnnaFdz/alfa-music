import imgDefault from "../components/imgs/AT.jpeg";
export default function Card({ song }) {
    

    return (
        <div className="column">
            <div className="card">
            <div className="card-image">
            <figure className="image is-4by3">
                <img
                src={imgDefault}
                alt="image cancion"
                />
            </figure>
            </div>
            {/* <div className="card-content"> */}
            <div >
            <div className="media">
                {/* <div className="media-left">
                <figure className="image is-48x48">
                    <img
                    src="https://bulma.io/assets/images/placeholders/96x96.png"
                    alt="Imagen Artista"
                    />
                </figure>
                </div> */}
                <div className="media-content">
                <p className="title is-4">{song.title}</p>
                
                </div>
            </div>
    
            <div className="content">
            {/* <p className="subtitle">Artista</p> */}
            <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                
            </div>
            </div>
                </div>
        </div>
    );
}