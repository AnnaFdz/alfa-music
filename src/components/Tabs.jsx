import { Link } from "react-router-dom";

export default function Tabs() {
    return (
        <p className="panel-tabs">
            <Link to="/" className="is-active">Songs</Link>
            <Link to="/albums">Albums</Link>
            <Link to="/artists">Artists</Link>
            
        </p>
    );
}
