import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,{},{
        headers: {
        Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies are sent
    }).then((response) => {
        if (response.status === 200) {
            // console.log("UserLogout Successfully");
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
    .catch(error => console.error("🔴 Logout failed:", error.response?.data || error));
    return (
        <div>UserLogout</div>
    )
}

export default UserLogout