import React, { useState, userEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserInfo = (props) => {

    return (
        <div>
            <header>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <h1>Hi {users.alias}!</h1>
                        <div className="d-flex justify-content-around w-10">
                            <Link to={"/"}>Home</Link>
                        </div>
                    </div>
                </nav>
            </header>

            <div>
                <h3>
                    Name: {users.first_name} {users.last_name}
                </h3>
                <h3>Alias: {users.alias}</h3>
                <h3>Email: {users.email}</h3>
                <h3>Total Number of Posts: {}</h3>
                <h3>Total Number of Likes: {}</h3>
            </div>
        </div>
    );
};

export default UserInfo;
