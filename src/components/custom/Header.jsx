"use client";

import React, { useEffect, useState } from 'react'
import { Button } from "../ui/Button";
import { Popover } from '../ui/PopOver';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import CustomDialog from '../ui/CustomDialog';

function Header() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

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
      localStorage.setItem('user', JSON.stringify(response?.data));
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-centre px-5'>
      <img height={80} width={80} src='/logo.svg' />
      <div>
        {user ?
          <div className='flex items-center gap-3' >
            <a href="/my-trips" >
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover
              trigger={<img src={user?.picture} className='h-10 w-[45px] rounded-full' />}
              content={<h2 className="cursor-pointer" onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>}
            />
          </div>
          : <Button onClick={() => setOpenDialog(true)}>Sign In</Button>}
      </div>
      {openDialog && <CustomDialog isOpen={true} onClose={() => setOpenDialog(false)} login={login} />}
    </div>
  )
}

export default Header