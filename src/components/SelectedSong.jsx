import { useNavigate } from "react-router-dom";
import Songs from "./Songs";

export default function SelectedSong() {
    const navigate = useNavigate();

    const handleClick = (songID) => {
        fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${songID}`)
            .then(response => response.json())
            .then(data => {
                navigate("/createSong", { state: { songData: data } });
            })
            .catch(error => console.error('Error fetching song data:', error));
    };

    return (
        <div>
            <Songs onSelectSong={handleClick}/>
        </div>
    );
}
