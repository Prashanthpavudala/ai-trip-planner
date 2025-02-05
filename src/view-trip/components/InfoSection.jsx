import React, { useEffect } from 'react'
import { Button } from '../../components/ui/Button';
import { IoIosSend } from "react-icons/io";
import {GetGooglePlacesPics} from "../../service/GlobalGooglePhotoApi"
import { useState } from 'react';

function InfoSection({ trip }) {

    const PHOTO_REFERENCE_ID='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=600&key='+'AIzaSyBXJyV1buQw-1IIjZqugurbWRJroNWGw2s';

    const [photoUrl,setPhotoUrl]= useState();
    console.log(" InfoSection :: trip is :- " + trip);

    useEffect(()=>{
        trip && getplacephoto()
    },[trip])

    const getplacephoto =async ()=>{
        const data = {
            textQuery :trip?.userSelection?.location?.label,
        }
        const result = await GetGooglePlacesPics(data).then(resp=>{
            console.log(resp?.data?.places[0]?.photos[3]?.name);
            const photoUrl = PHOTO_REFERENCE_ID.replace('{NAME}',resp?.data?.places[0]?.photos[3]?.name)
            setPhotoUrl(photoUrl);
            console.log("Google photo api response is with trip?.userSelection?.location?.label is :  : " +resp.data+" " +trip?.userSelection?.location?.label);
        })
    }

    return (

        <div>
            <img src={photoUrl?photoUrl:'/pic.jpg'} className='h-[340px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md '>📅 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button> <IoIosSend /> </Button>

            </div>
        </div>

    );
}

export default InfoSection