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

    const [conversations, setConversations] = useState([]);

    const [selectedConversation, setSelectedConversation] = useState(null);


    const fetchConversations = async () => {
        try{
            const response = await axios.get(
                `${url}/api/conversations?userId=${user._id}`
            )

            setConversations(response.data.conversations)
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        if(user?._id){
            fetchConversations();
        }
    }, [user])

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

    const searchedConversation = async (receiverId) => {
        try{
            await axios.post(
                `${url}/api/conversations/create`,
                {
                    senderId: user._id,
                    receiverId: receiverId

                }
            )
            fetchConversations();
        }catch(err){
            console.log(err.message)
        }
    }

    const selectedUser =
    selectedConversation?.members.find(

        (member) =>
            member._id !== user._id

    );


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
            
                <div className='chat-list'>
                    {
                        search.trim().length > 0 ? (

                            searchResults.length > 0 ? (

                                searchResults.map((searchedUser) => (

                                    <div
                                        key={searchedUser._id}
                                        className="searched-user"
                                        onClick={() =>
                                            searchedConversation(searchedUser._id)
                                        }
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
                                                        {searchedUser.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>

                                                )
                                            }

                                        </div>

                                        <div className="searched-user-info">

                                            <h4>{searchedUser.name}</h4>

                                            <p>
                                                @{searchedUser.username}
                                            </p>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p className="empty-chat">
                                    No users found
                                </p>

                            )

                        ) : (

                            conversations.length > 0 ? (

                                conversations.map((conversation) => {

                                    const otherUser =
                                        conversation.members.find(

                                            (member) =>
                                                member._id !== user._id

                                        );

                                    return(

                                        <div
                                            key={conversation._id}
                                            className="conversation-item"
                                            onClick={() =>
                                                setSelectedConversation(conversation)
                                            }
                                        >

                                            <div className="conversation-avatar">

                                                {
                                                    otherUser?.avatar ? (

                                                        <img
                                                            src={otherUser.avatar}
                                                            alt="avatar"
                                                            className="conversation-avatar-image"
                                                        />

                                                    ) : (

                                                        <span>
                                                            {otherUser?.name
                                                                ?.charAt(0)
                                                                .toUpperCase()}
                                                        </span>

                                                    )
                                                }

                                            </div>

                                            <div className="conversation-info">

                                                <h4>
                                                    {otherUser?.name}
                                                </h4>

                                                <p>
                                                    @{otherUser?.username}
                                                </p>

                                            </div>

                                        </div>

                                    )

                                })

                            ) : (

                                <p className="empty-chat">
                                    No conversations yet
                                </p>

                            )

                        )
                    }
                </div>

            </div>

            <div className="chat-area">

                {
                    selectedConversation ? (

                        <>

                            <div className="chat-header">

                                <div className="chat-user">

                                    <div className="chat-user-avatar">

                                        {
                                            selectedUser?.avatar ? (

                                                <img
                                                    src={selectedUser.avatar}
                                                    alt="avatar"
                                                    className="chat-user-avatar-image"
                                                />

                                            ) : (

                                                <span>
                                                    {selectedUser?.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                            )
                                        }

                                    </div>

                                    <div className="chat-user-info">

                                        <h3>
                                            {selectedUser?.name}
                                        </h3>

                                        <p>
                                            @{selectedUser?.username}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="messages-area">

                                <p className="no-messages">
                                    No messages yet
                                </p>

                            </div>

                            <div className="message-input-container">

                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="message-input"
                                />

                                <button className="send-btn">
                                    Send
                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="no-chat-selected">

                            <h1>No chat selected</h1>

                            <p>
                                Select a conversation to start chatting
                            </p>

                        </div>

                    )
                }

            </div>

    </div>
    )
}


  return(
    <h1>Forbidden</h1>
  )
}


export default Dashboard;   