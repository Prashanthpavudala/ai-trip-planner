import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/Input';
import { SelectBudgetOptions, SelectTravelsList, AI_PROMPT } from '../constants/options';
import { Button } from '../components/ui/Button';
import { CustomToast } from '../components/ui/CustomToast'
import { CustomDialog } from '../components/ui/CustomDialog'
import { generateTripPlan } from '../service/AiModal'
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom';

function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  // Google Login function and user profile retrieval
  const login = useGoogleLogin({
    onSuccess: (codeRes) => getUserProfile(codeRes),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    }).then((response) => {
      // console.log(response);
      localStorage.setItem('user', JSON.stringify(response?.data));
      onSubmitOfGenerateTrip();
    }).catch((error) => {
      console.log(error);
    });
  };

  const onSubmitOfGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.noOfDays || formData?.noOfDays > 50 || !formData?.location || !formData?.budget || !formData?.traveler) {
      setToastMessage('Please fill all details !!');
      setToastOpen(true);
      return;
    }
    setLoading(true);
    // console.log(formData);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replaceAll('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)

    console.log(FINAL_PROMPT);


    try {
      const tripPlan = await generateTripPlan(FINAL_PROMPT);
      console.log("final response from gemini is : " + tripPlan);
      saveAITripDetailsToFirebase(tripPlan);
      setLoading(false);
    } catch (error) {
      setToastMessage("Error generating trip plan. Please try again.");
      setToastOpen(true);
      setLoading(false);
    }

  }

  const saveAITripDetailsToFirebase = async (tripDetails) => {
    setLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: tripDetails,
      userEmailId: JSON.parse(localStorage.getItem('user')),
    });
    setLoading(false);
    navigation('/view-trip/'+docId);
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 '>
      <h2 className='font-bold text-3xl'>
        Tell us yout travel preferences 🏕️🌴
      </h2 >
      <p className='mt-3 text-gray-500 text-xl'> Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences. </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'> What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey='AIzaSyBXJyV1buQw-1IIjZqugurbWRJroNWGw2s'
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value); handleInputChange('location', value);
              }
            }}
          />
        </div>
      </div>


      <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip ?</h2>
        <Input placeholder={'Ex.3'} type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        ></Input>
      </div>


      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your budget ?</h2>
        <div className='grid grid-cols-3  gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) =>
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget === item.title ? 'shadow-2xl border-black border-2' : ''}
              `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg '>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure ?</h2>
        <div className='grid grid-cols-3  gap-5 mt-5'>
          {SelectTravelsList.map((item, index) =>
            <div key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow
              ${formData?.traveler == item.people ? 'shadow-2xl border-black border-2' : ''}
              `}
              onClick={() => handleInputChange('traveler', item.people)}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg '>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          )}
        </div>
      </div>

      <div className='my-10 flex justify-end right-11 '>
        <Button onClick={onSubmitOfGenerateTrip} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"}</Button>
      </div>

      <CustomToast message={toastMessage} open={toastOpen} setOpen={setToastOpen} />

      {openDialog && <CustomDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} login={login} />
      }

    </div>
  )
}

export default CreateTrip;