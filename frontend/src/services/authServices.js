import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL

const registerUser = async (name, email, password) => {
    const newUser = {
        name: name,
        email: email,
        password: password
    }

    try{
        const response = await axios.post(
            `${url}/api/auth/register`,
            newUser
        )

        console.log(response.data);
    }catch(err){
        console.log(err.response?.data || err.message)
    }
}

const loginUser = async (email, password, navigate) => {
    try{
        const response = await axios.post(
             `${url}/api/auth/login`,
             {
                email: email,
                password: password
             }
        )

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        if(accessToken && refreshToken){
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/dashboard', {
                state: email
            })
        }
    }catch(err){
        console.log(err.response?.data || err.message);
    }
}

export { registerUser, loginUser }