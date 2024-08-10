import { useState, useEffect } from "react";
import "../styles/song.css";
import Card from "./Card";
import useTheme from "../hooks/useTheme";
import '../index.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SongsID({ onSelectSong }) {
    const { theme } = useTheme();
    const { userID } = useAuth("state");
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [searchTitle, setSearchTitle] = useState({});
    const [inputValue, setInputValue] = useState("");
    const [inputWidth, setInputWidth] = useState(100);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setInputWidth(Math.max(100, e.target.value.length * 10));
    };
   
    const fetchSongs = async (page) => {
        setIsLoading(true);
        setIsError(false);
        let query = new URLSearchParams({
            page: page,
            page_size: 4,
            ...searchTitle,
            owner: userID
        }).toString();
        try {
            let url = `https://sandbox.academiadevelopers.com/harmonyhub/songs/?${query}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("No se pudieron cargar las canciones");
            }
            const data = await response.json();
            if (data.next && data.next.startsWith('http://')) {
                data.next = data.next.replace('http://', 'https://');
            }
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
    }, [page, searchTitle]);

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
    function handleSearch(event) {
        event.preventDefault();
        const searchForm = new FormData(event.target);

        const newSearchTitle = {};

        searchForm.forEach((value, key) => {
            
            if (value) {
                newSearchTitle[key] = value;
            }
        });

        setSearchTitle(newSearchTitle);
        setSongs([]);
        setPage(1);
        setInputValue("");
    }
    const handleClearSearch = () => {
        setSearchTitle({});
        setInputValue("");
        setPage(1);
        setSongs([]);
    };
        
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className= "box2 main-content">
            <div className={`box ${
                theme === 'pink'
                ? 'pinkBackground'
                : 'blueBackground'
            }`}>
            <form className= "box has-background-danger-70 search-form "
           
             onSubmit={handleSearch}>
                    <div className="field " >
                        
                        <label className="label">Buscar Por Título:</label>
                        
                        <div className="control ">
                            <input className="input cardinput has-background-grey-dark has-text-white" type="text" name="title"
                             value={inputValue}
                             placeholder="Search..."
                             style={{transition: 'width 0.3s ease',width: `${inputWidth}px` }}
                             onChange={handleChange}/>
                        </div>
                    </div>
                        <button className="button is-primary" type="submit"
                        style={{padding: '3%' }}   >
                        <i className="fa fa-search" aria-hidden="true"></i>
                        
                        </button>
                        <button className="button is-primary has-text-weight-semibold"  type="button" onClick={handleClearSearch}>
                        Clear
                        </button>
                </form>
                            <div className={`box ${
                                theme === 'pink'
                                ? 'pinkBackground'
                                : 'blueBackground'
                              }`}>
                              <div className="box2" style={{backgroundColor: '#e98686', borderRadius: '0.75rem'}}>
                                <h2 className="title">Canciones</h2>
                                <div className="columns" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content', minHeight: '200px' }}>
                                {songs.length > 0 ? (
                                    songs.map((song) => (
                                    <div key={song.id} className=" box2 column is-one-quarter" onClick={() => onSelectSong(song.id)}>
                                        <Card song={song} />
                                    </div>
                                 ))
                                ) : (
                                    !isLoading && <p className="title m-6 has-text-weight-medium">No se encontraron canciones con ese título.</p>
                                )}
                                </div>
                                {isLoading && <p>Cargando más canciones...</p>}
                              {isError && <p>Error al cargar canciones...</p>}
                              </div>
                              
                            </div>
            
                
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
            <button className="button is-danger" onClick={handleBack}>
                Volver
            </button>
            </div>
        </div>
    );
}

