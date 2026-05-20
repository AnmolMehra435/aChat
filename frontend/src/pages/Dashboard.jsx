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

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchUser = async (query) => {

        if(!query.trim()){

            setSearchResults([]);

            return;
        }

        try{
            const response = await axios.get(
                `${url}/api/users/search?query=${query}`
            )

            console.log(response.data)

            setSearchResults(response.data.users)
        }catch(err){
            console.log(err.message)
            setSearchResults([])
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

    const searchedConversation = async (recieverId) => {
        try{
            const response = await axios.post(
                `${url}/api/conversations/create`,
                {
                    senderId: user._id,
                    recieverId: recieverId

                }
            )
            console.log(response.data);
        }catch(err){
            console.log(err.console)
        }
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
                         {
                                user?.avatar ? (

                                    <img
                                        src={user.avatar}
                                        alt="profile"
                                        className="profile-image"
                                    />

                                ) : (

                                    <span>
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>

                                )
                        }
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
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            searchUser(e.target.value)
                        }}
                    />
                </div>

                <div className="chat-list">

                    {
                        searchResults.length > 0 ? (

                            searchResults.map((searchedUser) => (

                                <div
                                    key={searchedUser._id}
                                    onClick={searchedConversation(searchedUser._id)}
                                    className="searched-user"
                                >

                                    <div className="searched-avatar">

                                        {
                                            searchedUser.avatar ? (

                                                <img
                                                    src={searchedUser.avatar}
                                                    alt="avatar"
                                                    className="searched-avatar-image"
                                                />

                                            ) : (

                                                <span>
                                                    {searchedUser.name.charAt(0).toUpperCase()}
                                                </span>

                                            )
                                        }

                                    </div>

                                    <div className="searched-user-info">

                                        <h4>{searchedUser.name}</h4>

                                        <p>@{searchedUser.username}</p>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <p className="empty-chat">
                                No users found
                            </p>

                        )
                    }

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