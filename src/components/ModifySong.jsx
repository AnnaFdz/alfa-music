import SelectedSong from "./SelectedSong";

function ModifySong () {
    const handleSelectSong = (songID) => {
        console.log("Song selected with ID:", songID);
    };

    return (
        <SelectedSong onSelectSong={handleSelectSong} />
    );
}

export default ModifySong;
