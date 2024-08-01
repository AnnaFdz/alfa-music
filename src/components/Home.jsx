//import "../index.css";
import Card from "./Card"
import Songs from "./Songs";
import Paginacion from "./Paginacion";
import Tabs from "./Tabs";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";


export default function Home() {
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isModifyingPlaylist, setIsModifyingPlaylist] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);
  const {isAuthenticated} = useAuth("state");

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
                {isAuthenticated? (
                  <SideBar
                    onPlaylistCreate={handlePlaylistCreate}
                    onModifyingPlaylist={handleModifyPlaylist}
                    setPlaylistUpdated={setPlaylistUpdated}  
                  />
                  ): null}
                </div>
                 <div className="column is-10">
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
