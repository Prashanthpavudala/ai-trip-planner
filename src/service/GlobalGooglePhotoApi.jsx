import axios from "axios";

const GOOGLE_PHOTO_API_BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const GooglePhotoConfig = {
  headers: {  // ✅ Use lowercase 'headers'
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyBXJyV1buQw-1IIjZqugurbWRJroNWGw2s',  // ✅ Make sure this key is restricted in Google Cloud Console
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'  // ✅ Use a comma-separated string
  }
};

export const GetGooglePlacesPics = (data) =>
  axios.post(GOOGLE_PHOTO_API_BASE_URL, data, GooglePhotoConfig);
