import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1601027847943-3c1afeabd2ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHx0cmFmZmljJTIwbGlnaHR8ZW58MHx8MHx8fDA%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-16 ml-8 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWR7YHPVpJosZRCRBiah2DQ6c4jAejTG2_pg&s" alt="" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-2xl font-medium'>Get Started with TravelWithMe</h2>
                <Link to ='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start