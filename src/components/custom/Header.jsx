"use client";

import React from 'react'
import { Button } from "../ui/Button"; 

function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-centre px-5'>
            <img height={80} width={80} src='/logo.svg'/>
            <div>
                <Button>Sign In</Button>
            </div>
    </div>
  )
}

export default Header