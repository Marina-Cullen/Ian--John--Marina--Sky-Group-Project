import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";

const UserInfo = () => {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    console.log('User ID:', userId);


    const fetchUserData = async () => {
        try {
            if (userId) {
                const token = localStorage.getItem('authToken'); // Get the authentication token from local storage
                const response = await axios.get('http://localhost:5000/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };

    useEffect(() => {
        fetchUserData(); 
    }, [userId]);

    useEffect(() => {
        console.log(user.first_name);
    }, [user]);

    return (
        <div>
            <div className="text-center d-flex justify-content-between my-auto mx-auto border border-bottom border-solid border-dark">
                <h1>Profile Page</h1>
                <Link to="/home">
                    <button className="btn btn-primary m-2">Home</button>
                    <button onClick={handleLogout} className='btn btn-danger m-2'>Logout</button>
                </Link>
            </div>
            <div className="col-5 mt-5 my-auto mx-auto p-5">
                <h3>
                    Name: {user.first_name} {user.last_name}
                </h3>
                <h3>Alias: {user.alias}</h3>
                <h3>Email: {user.email}</h3>
                {/* You need to replace these placeholders with the actual data */}
                <h3>Total Number of Posts: {user.totalPosts}</h3>
                <h3>Total Number of Likes: {user.totalLikes}</h3>
            </div>
        </div>
    );
};

export default UserInfo;
