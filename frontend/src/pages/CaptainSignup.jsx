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
        <img className='w-16 mb-4 rounded-full' src="data:image/png;base64,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" alt="" />
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