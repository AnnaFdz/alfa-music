import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";



export default function Layout() {
    return (
        <div>
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </div>
        
    );
}
