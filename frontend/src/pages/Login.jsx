import { useState } from "react";
import "../styles/login.css";
import { registerUser, loginUser } from "../services/authServices.js"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [toggle, setToggle] = useState(true);

    const handleToggler = () => {
        setToggle(!toggle);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        await registerUser(name, email, pass);

        setName("");
        setEmail("");
        setPass("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        await loginUser(email, pass, navigate);
   
        setEmail("");
        setPass("");
    };

    if (!toggle) {

        return (
            <>
                <div className="container">
                    <h1 className="heading">Welcome to aChat :- A real time chat app</h1>

                    <div className="auth-card">

                        <form className="auth-form" onSubmit={handleRegister}>

                            <h1>Create Account</h1>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Create your password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />

                            <button type="submit">
                                Register
                            </button>

                        </form>

                        <p className="toggle-text">
                            Already have an account?
                            <button onClick={handleToggler}>
                                Login
                            </button>
                        </p>

                    </div>

                </div>
            </>
        );
    } else {

        return (
            <>
                <div className="container">
                    <h1 className="heading">Welcome to aChat :- A real time chat app</h1>
                    
                    <div className="auth-card">

                        <form className="auth-form" onSubmit={handleLogin}>

                            <h1>Login to your account</h1>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />

                            <button type="submit">
                                Login
                            </button>

                        </form>

                        <p className="toggle-text">
                            Don't have an account?
                            <button onClick={handleToggler}>
                                Register
                            </button>
                        </p>

                    </div>

                </div>
            </>
        );
    }
}

export default Login;