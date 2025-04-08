import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(true)

    const ridePopupPanelRef = useRef(null)
    useGSAP(function(){
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current,{
                transform : 'translateY(0)'
            })
        }else{
            gsap.to(ridePopupPanelRef.current,{
                transform : 'translateY(100%)'
            })
        }
    },[ridePopupPanel])
    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWR7YHPVpJosZRCRBiah2DQ6c4jAejTG2_pg&s" alt="" />
                <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full '>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
                <RidePopUp  setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome