import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetGooglePlacesPics } from '../../service/GlobalGooglePhotoApi';

function HotelCardItem({item}) {

    const PHOTO_REFERENCE_ID = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=600&key=' + 'AIzaSyBXJyV1buQw-1IIjZqugurbWRJroNWGw2s';

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        item && getplacephoto()
    }, [item])

    const getplacephoto = async () => {
        const data = {
            textQuery: item?.hotelName,
        }
        const result = await GetGooglePlacesPics(data).then(resp => {
            console.log(resp?.data?.places[0]?.photos[3]?.name);
            const photoUrl = PHOTO_REFERENCE_ID.replace('{NAME}', resp?.data?.places[0]?.photos[3]?.name)
            setPhotoUrl(photoUrl);
            console.log("Google photo api response is with trip?.userSelection?.location?.label is :  : " + resp.data + " " + trip?.userSelection?.location?.label);
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + item.hotelName + "," + item.hotelAddress} target="_blank">
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl?photoUrl:'/pic.jpg'} alt={item.hotelName} className='rounded-xl' />
                <div className='my-2 flex flex-col gap-2 '>
                    <h2 className='font-medium'>{item.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {item.hotelAddress}</h2>
                    <h2 className='text-xs'>💰 {item.price}</h2>
                    <h2 className='text-xs'>⭐ {item.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem