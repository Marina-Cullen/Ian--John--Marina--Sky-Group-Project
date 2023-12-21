import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';

const HomePage = () => {
    const [formData, setFormData] = useState({
        image: null,
        description: '',
    });

    const navigate = useNavigate;
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Fetch user data after component mounts
        const fetchUserData = async () => {
            try {
            const token = localStorage.getItem('authToken');
            console.log("Token:", token) // Replace with your actual token key
            const response = await axios.get('http://localhost:5000/users/profile', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setUserName(response.data.first_name);
            } catch (error) {
            console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserData(); // If you are using the function
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image);
        formDataToSend.append('description', formData.description);

        try {
        const response = await axios.post('/api/submit', formDataToSend);
        console.log(response.data); // Handle the response as needed
        } catch (error) {
        console.error('Error submitting form:', error);
        }
    };


    const handleLogout = () => {
        // Clear the authentication token from local storage
        localStorage.removeItem('authToken');
        
        // Redirect the user to the login page
        window.location.href = '/';
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files ? files[0] : value,
        }));
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center p-2 border border-solid border-dark">
            <h2>Hi, {userName}</h2>
                <div className='p-1 text-end'>
                <Link to="/bright-ideas" className="me-3">Bright Ideas</Link>
                <Link to="/profile" className="me-3">Profile</Link>
                <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
                </div>
            </div>
            <div className='mb-3'>
            <h2 className='text-center m-2'>Bright Ideas</h2>
            <h5 className='my-auto mx-auto col-8 text-center'>
                This app allows you to post an image with a 
                short description that acts as a story prompt. 
                Your image and description can encourage people 
                to reply with their own story ideas, or you can 
                start a story and ask people to continue the narrative.
            </h5>
            </div>

            <div className='col-5 my-auto mx-auto m-4' id='newpost'>
                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label htmlFor='image' className='form-label'>
                            Upload Image:
                        </label>
                        <input
                            type='file'
                            className='form-control'
                            id='image'
                            name='image'
                            accept='image/*'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>
                            Description:
                        </label>
                        <textarea
                            className='form-control'
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Add your description here!'
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>
                    Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;