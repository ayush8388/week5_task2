"use client"
import React from 'react'
import { ClipLoader } from 'react-spinners'

function Spinner() {
  return (
    <div className='h-screen w-screen flex justify-center items-center h-40"'>
        <ClipLoader color="#fff" loading={true} />
    </div>
  )
}

export default Spinner