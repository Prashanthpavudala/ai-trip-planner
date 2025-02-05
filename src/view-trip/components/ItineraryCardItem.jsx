import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetGooglePlacesPics } from '../../service/GlobalGooglePhotoApi';

function ItineraryCardItem({ place }) {

    const PHOTO_REFERENCE_ID = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=600&key=' + 'AIzaSyBXJyV1buQw-1IIjZqugurbWRJroNWGw2s';

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && getplacephoto()
    }, [place])

    const getplacephoto = async () => {
        const data = {
            textQuery: place.placeName,
        }
        const result = await GetGooglePlacesPics(data).then(resp => {
            console.log(resp?.data?.places[0]?.photos[3]?.name);
            const photoUrl = PHOTO_REFERENCE_ID.replace('{NAME}', resp?.data?.places[0]?.photos[3]?.name)
            setPhotoUrl(photoUrl);
            console.log("Google photo api response is with trip?.userSelection?.location?.label is :  : " + resp.data + " " + trip?.userSelection?.location?.label);
        })
    }
    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="hover:scale-105 transition-all cursor-pointer bg-white rounded-xl shadow-sm">
                <img
                    src={photoUrl?photoUrl:"/pic.jpg"}
                    alt={place.placeName}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-3 flex flex-col gap-2">
                    <h2 className="font-medium text-sm line-clamp-1">
                        {place.placeName}
                    </h2>
                    <h2 className="text-xs text-gray-500 line-clamp-2">
                        📍 {place.placeDetails}
                    </h2>
                    <div className="flex justify-between text-xs">
                        <h2>🎟️ {place.ticketPricing}</h2>
                        <h2>⭐ {place.rating}/5</h2>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <h2>🕒 {place.travelTime}</h2>
                        <h2>📅 {place.bestTimeToVisit}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItineraryCardItem