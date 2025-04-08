import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import UserContext from '../context/userContext'
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState('')

  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: { 
          firstname : firstname, 
          lastname : lastname
        },
        email,
        password
      };
  
      // console.log("Requesting:", `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`);
      // console.log("Data:", newUser);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        newUser,
        // { headers: { "Content-Type": "application/json" } }
      );
  
      // console.log("Response:", response.data);
      if (response.status === 201) {
        const data = response.data
        const user = data.token;
        console.log(user.token);
        setUser(data.user);
        localStorage.setItem('token', user.token);
        navigate('/home');
      }
      setEmail('')
      setFirstname('')
      setLastname('')
      setPassword('')
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-4 rounded-full'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWR7YHPVpJosZRCRBiah2DQ6c4jAejTG2_pg&s" alt="" />
          <form onSubmit={ (e) => {
            submitHandler(e)
          }}>
            <h3 className='text-lg w-1/2 font-medium mb-2'> what's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input 
                required 
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text"
                placeholder='First name'
                value={firstname}
                onChange={ (e) => {
                  setFirstname(e.target.value)
                }} 
              />
              <input 
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text" 
                placeholder='Last name'
                value={lastname}
                onChange={ (e) => {
                  setLastname(e.target.value)
                }}
              />
            </div>
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input 
              required
              placeholder='email@example.com'
              value={email}
              onChange={ (e) => {
                setEmail(e.target.value)
              }}
              type="email" 
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            />
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input 
              required
              placeholder='password'
              value={password}
              onChange={ (e) => {
                setPassword(e.target.value)
              }}
              type="password" 
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            />
            <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:tex-base'>Create account</button>
          </form>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div> 
        <div>
          <p className='text-[10px] leading-tight'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup