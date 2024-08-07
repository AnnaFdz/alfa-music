import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import FooterBar from "../components/Footer";
import "../index.css";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Layout() {
    
    return (
        <>
            <AuthProvider>
                <ThemeProvider>
                    <div>
                        <Navbar appName={"AlfA Music"} />
                    </div>
                    <div>
                        <div className="containerDos" >
                            <Outlet />
                        </div>
                    </div>
                </ThemeProvider>
            </AuthProvider>
            <div className="footer">
                <FooterBar appName={"AlfA Music"}/>
            </div>
        </>
        
    );
}
