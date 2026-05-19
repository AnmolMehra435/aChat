import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

const sendRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try{
        const response = await axios.get(
            `${url}/api/auth/refresh`,
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            }
        )

        const token = response.data.accessToken;

        if(token){
            return token;
        }

        return false;

    }catch(err){
        console.log(err.message);
    }
}

const sendAccessToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios.get(
            `${url}/api/dashboard`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            }
        )

        const verification = response.data.verified;

        if(verification){
            return true;
        }

        return false;

    }catch(err){
        console.log(err.message);

        const newToken = await sendRefreshToken();

        if(newToken){
            localStorage.setItem('accessToken', newToken);
            return sendAccessToken();
        }

        return false;
    }
}


export { sendAccessToken }