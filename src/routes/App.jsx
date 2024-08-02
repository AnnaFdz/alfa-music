import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Layout from "./Layout";
import Login from "../components/Login";
import Songs from "../components/Songs";
import Albums from "../components/Albums";
import Artists from "../components/Artists";
import PlaylistForm from "../components/PlaylistForm";
import ModifyForm from "../components/ModifyForm";
import ModifyPlaylist from "../components/ModifyPlaylist";
import DeletePlaylist from "../components/DeletePlaylist";
import ConfirmDelete from "../components/ConfirmDelete";

const App = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
                
            },
            {
                path: "albums",
                element: 
                    
                    <Albums/>,
                    
                
            },
            {
                path: "artists",
                element: 
                    
                    <Artists/>,
                    
                
            },
            {
                path: "artists",
                element: 
                    
                    <h1>artists</h1>,
                    
                
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/form",
                element: <PlaylistForm />,
            },
            {
                path: "/modPlaylist",
                element: <ModifyPlaylist />,
            },
            {
                path: "/modForm",
                element: <ModifyForm />,
            },
            {
                path: "/delPlaylist",
                element: <DeletePlaylist />,
            },
            {
                path: "confirmDelete",
                element: <ConfirmDelete/>
            },
            {
                path: "*",
                element: <h1>Not Found</h1>,
            }
        ],
    },
]);

export default App;
