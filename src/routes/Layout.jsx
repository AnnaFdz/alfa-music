import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import FooterBar from "../components/Footer";


import "../index.css";
import Tabs from "../components/Tabs";

export default function Layout() {
    
  
    return (
        <>
        <div >
             <Navbar appName={"AlfA Music"} />
             </div>
             
             <div >
            <AuthProvider>

            
                    <div className="containerDos" >
                        
                        <Outlet />
                       
                        </div>
                        
                    
            </AuthProvider>
            </div>
            <div className="footer">

            <FooterBar appName={"AlfA Music"}/>
            </div>
        </>
        
    );
}
