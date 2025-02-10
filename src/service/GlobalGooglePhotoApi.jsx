import axios from "axios";

const GOOGLE_PHOTO_API_BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const GooglePhotoConfig = {
  headers: { 
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyBXJyV1buQw-1IIjZqugurbWRJroNWGw2s',
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
  }
};

export const GetGooglePlacesPics = (data) =>
  axios.post(GOOGLE_PHOTO_API_BASE_URL, data, GooglePhotoConfig);
