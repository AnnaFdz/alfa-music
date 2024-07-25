import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterBar from "../components/Footer";
// import "../App.css"



export default function Layout() {
    return (
       <>
       <div >
            <Navbar appName={"AlfA Music"} />
            </div>
            <div className="container">
            <Outlet />
            </div>
            <div className="footer">
            
            <FooterBar appName={"AlfA Music"}/>
            </div>
        </>
        
    );
}
