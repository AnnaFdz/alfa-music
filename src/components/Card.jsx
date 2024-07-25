export default function Card() {
    

    return (
        <div>
            <div className="card">
            <div className="card-image">
            <figure className="image is-4by3">
                <img
                src="https://bulma.io/assets/images/placeholders/1280x960.png"
                alt="Placeholder image"
                />
            </figure>
            </div>
            <div className="card-content">
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
                <p className="title is-4">Titulo</p>
                
                </div>
            </div>
    
            <div className="content">
            <p className="subtitle">Artista</p>
                
            </div>
            </div>
                </div>
        </div>
    );
}