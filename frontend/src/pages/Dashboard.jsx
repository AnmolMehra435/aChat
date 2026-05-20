import { useState, useEffect } from 'react';
import { sendAccessToken } from '../services/verifyJwtService.js'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import axios from 'axios'

function Dashboard(){
    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [validate, setValidate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

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

    const logout = () =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken')
        navigate('/')
    }

    const editPage = () => {
        navigate('/editprofile')
    }


  if(loading){
    return(
        <h1>Loading....</h1>
    )
  }

  if(validate){
    return (
        <div className="dashboard-container">

            <div className="sidebar">

                <div className="profile-section">
                    <div className="avatar-placeholder">
                        {user.avatar || user.name.charAt(0).toUpperCase()}
                    </div>

                    <h2 className="username">
                        {user?.name}
                    </h2>
                    <div className='buttons'>
                        <button className='edit-btn' onClick={editPage}>
                            Edit
                        </button>

                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="search-input"
                    />
                </div>

                <div className="chat-list">
                    <p className="empty-chat">
                        No chats yet
                    </p>
                </div>

            </div>

            <div className="chat-area">
                <div className="no-chat-selected">
                    <h1>No chat selected</h1>
                    <p>Select a user to start chatting</p>
                </div>
            </div>

        </div>
    )
}

  return(
    <h1>Forbidden</h1>
  )
}


export default Dashboard;   