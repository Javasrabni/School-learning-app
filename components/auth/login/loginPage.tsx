"use client"
import React, { useState } from 'react'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

interface LoginProps {
    identifier: string
    setIdentifier: (val: string) => void
    password: string
    setPassword: (val: string) => void
}

const LoginPage = ({ identifier, setIdentifier, password, setPassword }: LoginProps) => {
    const [viewPassInput, setViewPassInput] = useState(false)

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-1 items-center  bg-stone-100 rounded-sm pr-4 w-full' id='UsernameRegister'>
                <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm w-full outline-none" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={"username atau email"} />
                {/* <p className='text-xs w-8 text-stone-400 grow-0'>{username?.length}/20</p> */}
            </div>
            <div className='flex flex-row gap-1 items-center justify-between bg-stone-100 rounded-sm pr-4 w-full' id='Password'>
                <input type={viewPassInput ? 'text' : 'password'} className="bg-stone-100 h-12 rounded-sm px-4 text-sm outline-none w-full" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"} minLength={8} />
                <button onClick={() => setViewPassInput(prev => !prev)}>
                    {viewPassInput ? <EyeClosedIcon width={16} className='text-stone-400' /> : <EyeIcon width={16} className='text-stone-400' />}
                </button>
            </div>
        </div>
    )
}

export default LoginPage
