import { useState, useEffect } from 'react';
import { sendAccessToken } from '../services/verifyJwtService.js'
import axios from 'axios'

function Dashboard(){
    const url = import.meta.env.VITE_BACKEND_URL;

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

  if(loading){
    return(
        <h1>Loading....</h1>
    )
  }

  if(validate){
    return (
        <h1>Welcome {user?.name}</h1>
    )
  }

  return(
    <h1>Forbidden</h1>
  )
}


export default Dashboard;   