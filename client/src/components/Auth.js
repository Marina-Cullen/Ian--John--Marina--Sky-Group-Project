import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthComponent = () => {
    const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({
        name: '',
        alias: '',
        email: '',
        password: '',
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleRegistrationInputChange = (e) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    };

    const handleLoginInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
        const response = await axios.post('/users/register', registrationData);

        console.log(response.data); 
        navigate('/home');
        } catch (error) {
        console.error('Error registering user:', error);
        }
    };

    const handleLogin = async () => {
        try {
        const response = await axios.post('/login', loginData);
        console.log(response.data); 
        } catch (error) {
        console.error('Error logging in:', error);
        }
    };



    return (
        <div className="container">
            <div className='text-center border-bottom border-solid border-dark mb-5'>
                <h1>Bright Ideas</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h2>User Registration</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                            Name:
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alias" className="form-label">
                            Alias:
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="alias"
                            name="alias"
                            onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                            Email:
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                            Password:
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>User Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                            Email:
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            name="email"
                            onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                            Password:
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            name="password"
                            onChange={handleLoginInputChange}
                            />
                        </div>
                        <button type="button" className="btn btn-success" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;

