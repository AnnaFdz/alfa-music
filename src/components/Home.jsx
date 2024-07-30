import "../index.css";
import Card from "./Card"
import { Paginacion } from "./Paginacion";
import SideBar from "./SideBar";
import Tabs from "./Tabs";
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
    <div className="body">
      {isAuthenticated? (
        <SideBar
          onPlaylistCreate={handlePlaylistCreate}
          onModifyingPlaylist={handleModifyPlaylist}
          setPlaylistUpdated={setPlaylistUpdated}  
        />
      ): null}
      <Paginacion/>
      <div>
        <Tabs/>
      </div>
      <div className="container">
          <div className='box has-background-danger-60'>
            <div className="columns">
              <div className="column">
                <div className='box'>
                  <Card/>
                </div>
              </div>
        {/*---------*/}
            <div className="column">
              <div className='box'>
                <Card/>
              </div>
            </div>
        {/*---------*/}
            <div className="column">
              <div className='box'>
                <Card/>
              </div>
            </div>
        {/*---------*/}
            <div className="column">
              <div className='box'>
                <Card/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}
