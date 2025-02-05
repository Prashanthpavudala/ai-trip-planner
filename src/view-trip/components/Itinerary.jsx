import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItineraryCardItem from './ItineraryCardItem';

function Itinerary({ trip }) {
    const [itineraryDays, setItineraryDays] = useState([]);

    useEffect(() => {
        if (trip?.tripData?.travelPlan?.itinerary) {
            const itineraryData = trip.tripData.travelPlan.itinerary;

            if (Array.isArray(itineraryData)) {
                setItineraryDays(itineraryData);
            } else if (typeof itineraryData === 'object' && itineraryData !== null) {
                const itineraryArray = Object.entries(itineraryData).map(([day, places]) => ({
                    day: parseInt(day),
                    places: Array.isArray(places) ? places : (typeof places === 'object' && places !== null ? [places] : []),
                }));
                setItineraryDays(itineraryArray);
            } else {
                console.warn("Itinerary data is in an unexpected format:", itineraryData);
                setItineraryDays([]);
            }
        } else {
            console.warn("tripData or travelPlan or itinerary is missing");
            setItineraryDays([]);
        }
    }, [trip]);

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">🌍 Daily Itinerary</h2>
            <div className="space-y-6 mt-4">
                {itineraryDays.map((dayData, index) => (
                    <div key={index}>
                        <h3 className="font-medium text-lg text-blue-600 mb-4">📅 Day {dayData.day}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                            {dayData.places.map((place, placeIndex) => (
                               <ItineraryCardItem  place={place}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Itinerary;