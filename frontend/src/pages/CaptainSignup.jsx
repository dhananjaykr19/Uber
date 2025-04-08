import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState('')

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain} = React.useContext(CaptainDataContext);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname : {
        firstname : firstname,
        lastname : lastname
      },
      email : email,
      password : password,
      vehicle : {
        color : vehicleColor,
        plate : vehiclePlate,
        capacity : vehicleCapacity,
        vehicleType : vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/captains/register`, captainData);

    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstname('')
    setLastname('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className='p-8 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-4 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWR7YHPVpJosZRCRBiah2DQ6c4jAejTG2_pg&s" alt="" />
        <form onSubmit={ (e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's our captain name</h3>
          <div className='flex gap-4 mb-7'>
            <input 
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg py-2 px-4
               border text-lg placeholder:text-base'
              type="text" 
              placeholder='First name'
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
            />
            <input 
              className='bg-[#eeeeee] w-1/2 rounded-lg border px-4 py-2 text-lg placeholder:text-base'
              type="text" 
              placeholder='last name'
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value)
              }}
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input 
            required
            className='bg-[#eeeeee] w-full rounded-lg border px-4 py-2 text-lg placeholder:text-base mb-7'
            type="email" 
            placeholder='email@example.com'
            value={email}
            onChange={(e) =>{
              setEmail(e.target.value)
            }}
          /> 
          <h3 className='text-lg font-medium mb-2'>Enter your Password</h3> 
          <input 
            required
            className='bg-[#eee] w-full text-lg rounded-lg border px-4 py-2 mb-7 placeholder:text-base'
            type="password" 
            placeholder='password'
            value={password}
            onChange={(e) =>{
              setPassword(e.target.value)
            }}
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'> 
            <input 
              required
              className='bg-[#eee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
              type="text" 
            />
            <input 
              required
              className='bg-[#eee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text" 
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
              placeholder='Vehicle Plate'
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input 
              required
              className='bg-[#eee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number" 
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
              placeholder='Vehicle Capacity'
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" >Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
        </form>
        <p 
          className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>
        <div>
        <p 
          className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup