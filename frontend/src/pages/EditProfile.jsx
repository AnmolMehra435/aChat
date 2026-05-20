import { sendAccessToken } from "../services/verifyJwtService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/editprofile.css'

function EditProfile(){
    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [validate, setValidate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if(file){
            setAvatar(file);

            const imageUrl = URL.createObjectURL(file);
            setAvatarPreview(imageUrl);
        }
    }


    useEffect(() => {
        const validateUser = async () => {
            try{
                const validation = await sendAccessToken();

                if(validation){
                    
                    const token = localStorage.getItem('accessToken');
                    const response = await axios.get(
                        `${url}/api/users/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )

                    setUser(response.data.user);
                    setName(response.data.user.name);
                    setUsername(response.data.user.username)

                    setValidate(true);
                }
            }catch(err){
                console.log(err.message);
            }finally{
                setLoading(false);
            }
        }
        validateUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('email', user.email);
        formdata.append('username', username);
        
        if(avatar){
            formdata.append('avatar', avatar)
        }
        try{
            await axios.put(
                `${url}/api/users/updateprofile`,
                formdata,
                {
                    headers: {
                        'content-type': 'multipart/form-data' 
                    }
                }
            )

            navigate('/dashboard')
        }catch(err){
            alert('error ocurred')
            console.log(err.message)
        }
    }

    const navigateBack = () => {
        navigate('/dashboard')
    }



    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }
    if(validate){

    return(
        <div className="edit-profile-container">

            <div className="edit-profile-card">

                <h1 className="edit-title">
                    Edit Profile
                </h1>

                <form className="edit-profile-form" onSubmit={handleUpdate}>

                    <div className="avatar-section">

                        <img
                            src= { avatarPreview || user?.avatar || "https://placehold.co/120x120"}
                            alt="avatar"
                            className="profile-avatar"
                        />

                        <input
                            type="file"
                            className="avatar-input"
                            onChange={handleAvatarChange}
                        />

                    </div>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={(e) => {setUsername(e.target.value)}}
                        />
                    </div>
                    <div className="buttons">
                        <button className="exit-btn" onClick={navigateBack}>Go back</button>
                        <button
                        type="submit"
                        className="save-btn"
                    >
                        Save Changes
                    </button>
                    </div>
                    

                </form>

            </div>

        </div>
    )
}

    return(
        <h1>Forbidden</h1>
    )
}

export default EditProfile