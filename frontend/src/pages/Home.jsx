import React ,{ useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { use } from 'react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pannelOpen, setPannelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)


  const confirmRidePanelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const submitHandler = () => {
    e.preventDefault();
  }

  useGSAP(function(){
    if (pannelOpen) {
      gsap.to(panelRef.current,{
        height : '70%',
        padding : 24
        // opacity : 1
      })
      gsap.to(panelCloseRef.current, {
        opacity : 1
      })
    }else{
      gsap.to(panelRef.current,{
        height : '0%',
        // opacity : 0
      })
      gsap.to(panelCloseRef.current, {
        opacity : 0
      })
    }
  },[pannelOpen])

  useGSAP(function(){
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current,{
        transform : 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform : 'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current,{
        transform : 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform : 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function(){
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current,{
        transform : 'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current,{
        transform : 'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform : 'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform : 'translateY(100%)'
      })
    }
  },[waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 rounded-full' src="data:image/png;base64,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" alt="" />
      <div className='h-screen w-screen '>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPannelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
          <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <div className='line absolute h-16 w-1 top-[49%] left-10 bg-gray-900 rounded-full'></div>
            <input
              onClick={() => {
                setPannelOpen(true)
              }} 
              required className='bg-[#eee] px-12 py-2 text-lg rounded-lg border w-full mt-5' type="text" 
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              placeholder='Add a pickup location' 
            />
            <input 
              onClick={() => {
                setPannelOpen(true)
              }}
              required className='bg-[#eee] px-12 py-2 text-lg rounded-lg border w-full mt-5' type="text" 
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          <LocationSearchPanel setPannelOpen={setPannelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-10 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        < ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        < LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        < WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  )
}

export default Home