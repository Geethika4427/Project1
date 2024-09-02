import './CSS/LoginSignup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
const LoginSignUp = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign-up and login forms
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignUp = async () => {
        if (!agreed) {
            alert('You must agree to the terms of use & privacy policy.');
            return;
        }

        const userData = { username, email, password };
        try {
            const response = await axios.post('http://localhost:8080/register', userData);
            console.log('User registered successfully:', response.data);
            // Switch to login form after successful registration
            setIsSignUp(false);
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle registration error (e.g., show error message)
        }
    };

    const handleLogin = async () => {
        const userData = { username, password };
        try {
            const response = await axios.post('http://localhost:8080/login', userData);
            console.log('User logged in successfully:', response.data);

            const token = response.data.token;
        if (token) {
            // Store the token in localStorage
            localStorage.setItem('authToken', token);
            console.log('Token stored in localStorage:', token);  
            // Redirect to home page after successful login
            navigate('/');
          } else {
            console.error('No token received from the server.');
            // Handle the case where no token is received
        }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error (e.g., show error message)
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>

                {isSignUp ? (
                    <>
                        <div className="loginsignup-fields">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSignUp}>Continue</button>
                        <p className="loginsignup-login">
                            Already have an account? <span onClick={() => setIsSignUp(false)}  style={{ cursor: 'pointer', color: 'blue', textDecoration:'underline' }}>Login here</span>
                        </p>
                        <div className="loginsignup-agree">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                            />
                            <p>By continuing, I agree to the terms of use & privacy policy.</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="loginsignup-fields">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleLogin}>Login</button>
                        <p className="loginsignup-login">
                            Don't have an account? <span onClick={() => setIsSignUp(true)}>Sign up here</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;