import Songs from "./Songs";
import Tabs from "./Tabs";
import SideBar from "../components/SideBar";
import { useState } from "react";


export default function Home() {
  const [playlistID, setPlaylistID] = useState(null);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isModifyingPlaylist, setIsModifyingPlaylist] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);

  const handlePlaylistCreate = (showForm) => {
    setShowPlaylistForm(showForm);
  };

  const handleModifyPlaylist = () => {
    setIsModifyingPlaylist(true);
  }

  const handlePlaylistSelect = (id) => {
    setPlaylistID(id);
  }

  return (
    <>
    <div className="containerT">
         <Tabs/>
         </div>
      
     
        <div className="columns is-gapless">
                <div className="column is-narrow">
                  <SideBar
                    onPlaylistSelect={handlePlaylistSelect}
                    onPlaylistCreate={handlePlaylistCreate}
                    onModifyingPlaylist={handleModifyPlaylist}
                    setPlaylistUpdated={setPlaylistUpdated}  
                  />
                </div>
                 <div className="column is-full">
                    <div className="containerDos">
                        <div className='box box2 has-background-danger-60'>
                          <div className="columns">
                          <Songs/>
                            {/* <div className="column">
                              <div className='box'>
                                 <Card/>  
                                
                              </div>
                            </div> */}
                        {/* --------- */}
                            {/* <div className="column">
                              <div className='box'>
                                <Card/>
                              </div>
                            </div>  */}
                        {/*---------*/}
                            {/* <div className="column">
                              <div className='box'>
                                <Card/>
                              </div>
                            </div>  */}
                        {/*---------*/}
                            {/* <div className="column">
                              <div className='box'>
                                <Card/>
                              </div>
                            </div>  */}
          </div>
        </div>
      </div>
    </div>
    
    </div>
    </>
    
  );
}
