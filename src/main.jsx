import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import { RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from '../src/view-trip/[tripId]/ViewTrip.jsx'

const router =createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  }
]) 



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="161310703836-egbdv2tdf1fjckgpl8cp098f1nqri3v0.apps.googleusercontent.com">
        <Header/>
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
