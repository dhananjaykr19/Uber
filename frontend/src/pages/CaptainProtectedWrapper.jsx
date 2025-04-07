import React , { useState, useEffect, useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
    }) => {
        const token = localStorage.getItem('token')
        const navigate = useNavigate();
        const { captain, setCaptain } = useContext(CaptainDataContext);
        const [ isLoading, setIsLoading ] = useState(true)

        useEffect(() => {
            if(!token){
                navigate('/captain-login')
            }
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true  // Optional but useful if you're using cookies too
                }
            ).then((response) => {
                if(response.status === 200){
                    setCaptain(response.data.data)
                    setIsLoading(false)
                }
            }).catch((err) => {
                console.error("Failed to fetch captain profile:", err.message);
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
        }, [token])

        if(isLoading){
            return (
                <div>Loading....</div>
            )
        }
        return (
            <div>
                {children}
            </div>
        )
}

export default CaptainProtectedWrapper