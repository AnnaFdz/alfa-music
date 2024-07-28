import { useEffect, useState } from "react";
import defaultImage from "./imgs/userIMGDefault.png";
import { useAuth } from "../contexts/AuthContext";

function UserImage() {
    const { token, userID } = useAuth("state");
    const [imgURL, setImgURL] = useState(defaultImage);

    useEffect(()=> {
        if (token && userID) {
        fetch(`https://sandbox.academiadevelopers.com/users/profiles/${userID}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            if (data.image) {
                setImgURL(data.image);
            } else {
                console.warn('No image found in the response.');
                setImgURL(defaultImage);
            }
        }).catch((e) => {
            console.error('Error:', e);
        })}
    }, [token, userID]);

    return (
        <div>
            <img src={imgURL} alt="User Image" />
        </div>
    );
 
}

export default UserImage;
