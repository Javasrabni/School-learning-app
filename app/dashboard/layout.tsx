import React from 'react'
import Footer from '../partials/footer/footer'
import Navbar from '../partials/navbar'

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex flex-col m-auto max-w-[32rem] h-screen w-full bg-white'>
            <Navbar />
            <div className='w-full max-h-screen h-full flex p-6'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DashboardLayout
