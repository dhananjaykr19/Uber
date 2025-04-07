import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props);
    
    // sample array for location
    const locations = [
        "24B, Near Kapoor's cafe, Sheryians coding School, Bhopal",
        "22B, Near Malhotra's cafe, Sheryians coding School, Bhopal",
        "20B, Near Singhai's cafe, Sheryians coding School, Bhopal",
        "164B, Near Gupta's cafe, Sheryians coding School, Bhopal"
    ]

    return (
        <div>
            {/* this is just a sample data */}
            {
                locations.map(function(elem, idx){
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPannelOpen(false)
                    }}  className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center jsutify-start'>
                        <h2 className='bg-[#eee] h-6 flex items-center my-4 justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                </div>
                })
            }
            
        </div>
    )
}

export default LocationSearchPanel