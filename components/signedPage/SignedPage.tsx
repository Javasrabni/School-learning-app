"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@/context/userDataCookie'
const SignedPage = () => {
    const { user, loading } = useUser()
    console.log(user)
    return (
        <div>
            <p>ini di dashboard</p>
            {user && (
                <p>{user.username}</p>
            )}
        </div>
    )
}

export default SignedPage
