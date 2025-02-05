
import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({trip}) {
    console.log("Trip hotel details:", trip?.tripData);

    
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.travelPlan?.hotels?.map((item, index) => (
                    // <Link to={'https://www.google.com/maps/search/?api=1&query='+item.hotelName+","+item.hotelAddress} target="_blank">
                    //     <div className='hover:scale-105 transition-all cursor-pointer'>
                    //         <img src='/pic.jpg' alt={item.hotelName} className='rounded-xl' />
                    //         <div className='my-2 flex flex-col gap-2 '>
                    //             <h2 className='font-medium'>{item.hotelName}</h2>
                    //             <h2 className='text-xs text-gray-500'>📍 {item.hotelAddress}</h2>
                    //             <h2 className='text-xs'>💰 {item.price}</h2>
                    //             <h2 className='text-xs'>⭐ {item.rating}</h2>
                    //         </div>
                    //     </div>
                    // </Link>
                    <HotelCardItem item={item}/>
                ))}
            </div>
        </div>
    );


}
export default Hotels;
