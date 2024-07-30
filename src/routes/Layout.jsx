import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



export default function Layout() {
    return (
        <div>
            <AuthProvider>
                <Navbar/>
                <Outlet />
                <Footer />
            </AuthProvider>
        </div>
        
    );
}
