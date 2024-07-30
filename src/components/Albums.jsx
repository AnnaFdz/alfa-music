//import "../index.css";
import Card from "./Card"
import Songs from "./Songs";
import Paginacion from "./Paginacion";
import Tabs from "./Tabs";
import SideBar from "../components/SideBar";
import { useState } from "react";

export default function Albums() {
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isModifyingPlaylist, setIsModifyingPlaylist] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);

  const handlePlaylistCreate = (showForm) => {
    setShowPlaylistForm(showForm);
  };

  const handleModifyPlaylist = () => {
    setIsModifyingPlaylist(true);
  }
  return (
    <>
    <div className="containerT">
         <Tabs/>
         </div>
      
     
        <div className="columns">
                <div className="column-start body is-one-fifth">
                     <SideBar
                        onPlaylistCreate={handlePlaylistCreate}
                        onModifyingPlaylist={handleModifyPlaylist}
                        setPlaylistUpdated={setPlaylistUpdated}  
                    /> 
                      </div>
                 <div className="column is-10">
                    <div className="containerDos">
                        <div className='box box2 has-background-danger-60'>
                          <div className="columns">
                          
                            
                        {/* --------- */}
                            <div className="column">
                              <div className='box'>
                              <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                        <img
                                            src="https://bulma.io/assets/images/placeholders/1280x960.png"
                                            alt="Placeholder image"
                                        />
                                        </figure>
                                    </div>
                                    
                                        <div class="media-content">
                                            <p class="title is-4">album</p>
                                            <p class="subtitle is-6">titulo</p>
                                        </div>
                                        </div>
                              </div>
                            </div> 
                        {/*---------*/}
                            <div className="column">
                              <div className='box'>
                              <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                        <img
                                            src="https://bulma.io/assets/images/placeholders/1280x960.png"
                                            alt="Placeholder image"
                                        />
                                        </figure>
                                    </div>
                                    
                                        <div class="media-content">
                                            <p class="title is-4">album</p>
                                            <p class="subtitle is-6">titulo</p>
                                        </div>
                                        </div>
                              </div>
                            </div> 
                        {/*---------*/}
                            <div className="column">
                              <div className='box'>
                              <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                        <img
                                            src="https://bulma.io/assets/images/placeholders/1280x960.png"
                                            alt="Placeholder image"
                                        />
                                        </figure>
                                    </div>
                                    
                                        <div class="media-content">
                                            <p class="title is-4">album</p>
                                            <p class="subtitle is-6">titulo</p>
                                        </div>
                                        </div>
                              </div>
                            </div> 
          </div>
        </div>
      </div>
    </div>
    
    </div>
    </>
    
  );
}
