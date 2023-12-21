import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [formData, setFormData] = useState({
        image: null,
        ideas: '', 
    });

    const navigate = useNavigate;
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Fetch user data after component mounts
        const fetchUserData = async () => {
            try {
            const token = localStorage.getItem('authToken');
            console.log("Token:", token) 
            const response = await axios.get('http://localhost:5000/users/profile', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setUserName(response.data.first_name);
            localStorage.setItem('userId', response.data.id); 

            } catch (error) {
            console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserData(); 
    }, []);

    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        const fetchIdeas = async () => {
        try {
        const response = await axios.get('http://localhost:5000/ideas');
        setIdeas(response.data);
        } catch (error) {
        console.error('Error fetching ideas:', error);
        }
    };

    fetchIdeas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image);
        formDataToSend.append('ideas', formData.ideas); // Change 'description' to 'ideas'
        formDataToSend.append('userId', localStorage.getItem('userId'));
    
        try {
            const response = await axios.post('http://localhost:5000/ideas', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
    
            console.log(response.data);
            setIdeas((prevIdeas) => [...prevIdeas, response.data]);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
        
    const handleLogout = () => {
        localStorage.removeItem('authToken');
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
            <div className="d-flex justify-content-between align-items-center border border-solid border-dark">
            <h2>Hi, {userName}</h2>
                <div className='p-1 text-end'>
                <Link to={`/users/${localStorage.getItem('userId')}`} className="btn btn-primary m-2">Profile</Link>
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

            <div className='col-5 my-auto mx-auto m-4 p-5 border border-solid border-dark text-center' id='newidea'>
                <h3>Add an Idea</h3>
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
                            Story Idea:
                        </label>
                        <textarea
                            className='form-control'
                            id='ideas'
                            name='ideas'
                            value={formData.ideas}
                            onChange={handleChange}
                            placeholder='Add your new story idea here!'
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>
                    Submit
                    </button>
                </form>
            </div>
            <div className="mt-4 my-auto mx-auto">
                <h3 className='text-center'>All Story Ideas:</h3>
                <ul>
                {ideas.map((idea) => (
                    <li key={idea.id}>{idea.ideas}</li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;