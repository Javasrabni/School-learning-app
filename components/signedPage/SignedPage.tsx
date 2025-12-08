"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@/context/userDataCookie'
const SignedPage = () => {
    const { user, loading } = useUser()
    console.log(user)
    return (
        <div>
            <h1 className='font-bold '>Halo, {user?.username}!</h1>
            <p className='text-sm text-stone-400 font-[inter]'>Siap belajar hari ini?</p>
        </div>
    )
}

export default SignedPage
