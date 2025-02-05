
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CustomToast } from '../../components/ui/CustomToast'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/FirebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';
import Footer from '../components/footer';

function ViewTrip() {

    const { tripId } = useParams();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [trip, setTrip] = useState()

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data: " + docSnap.data());
            // console.log("Document data JSON: " + JSON.stringify(docSnap.data(), null, 2));
            setTrip(docSnap.data());
        } else {
            // console.log("No Such Doc Found!!");
            setToastOpen(true);
            setToastMessage("No Trip Found!!");
        }
    }

    return (
        <>

            <div className='p-10 md:px-20 lg:px-44 xl:px:56'>


                {/* Info Section*/}
                <InfoSection trip={trip} />
                <Hotels trip={trip}/>
                <Itinerary trip={trip}/>
                <Footer/>
                <CustomToast message={toastMessage} open={toastOpen} setOpen={setToastOpen} />

            </div >

        </>

    )
}

export default ViewTrip;