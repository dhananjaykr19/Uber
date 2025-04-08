import React from 'react'
import { Link } from 'react-router-dom'
const CaptainHome = () => {
    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16 rounded-full' src="data:image/png;base64,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" alt="" />
                <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full '>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-2/5 p-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-3'>
                        <img className='h-10 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/man-having-video-call-with-his-family_23-2149120895.jpg" alt="" />
                        <h4 className='text-lg font-medium'>Harsh Patel</h4>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold'>₹295.19</h4>
                        <p className='text-sm text-gray-600'>Earned</p>
                    </div>
                </div>
                <div className='flex p-3 mt-6 bg-gray-100 rounded-xl items-start justify-center gap-5'>
                    <div className='text-center'>
                        <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                        <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                        <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptainHome