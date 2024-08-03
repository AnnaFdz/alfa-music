import { useState, useEffect } from "react";

import Card from "./Card";

export default function Songs() {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
   
    const fetchSongs = async (pageNumber) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(
                `http://sandbox.academiadevelopers.com/harmonyhub/songs/?page=${pageNumber}&page_size=4`
            );
            if (!response.ok) {
                throw new Error("No se pudieron cargar las canciones");
            }
            const data = await response.json();
            setSongs(data.results || []);
            setHasNextPage(!!data.next);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs(page);
    }, [page]);

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="box2">
            <div className="box2">
                              <div className='box box2'>
                              <div className="box2">
                <h2 className="title">Canciones</h2>
                <div className="columns">
                    {songs.map((song) => (
                        <div key={song.id} className="column is-one-quarter ">
                            <Card song={song} />
                        </div>
                    ))}
                </div>
                                
                              </div>
                            </div>
            
                {isLoading && <p>Cargando más canciones...</p>}
                <div className="buttons ">
                <button
                    className="button is-link "
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    className="button is-link"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                >
                    Next
                </button>
                </div>
            </div>
        </div>
    );
}

