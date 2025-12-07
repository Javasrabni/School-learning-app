"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { vibrateBtn } from "../vibrateBtn/ButtonVibrate"

const SplashOnboarding = () => {
    const [onboarding, setOnBoarding] = useState(true)
    const [progressBar, setProgressBar] = useState(1)

    function handleButton() {
        vibrateBtn()
        setProgressBar(prev => prev +1)
        if(progressBar === 3) {
            setProgressBar(1)
        }
    }

    return (
        <div className="absolute flex flex-col items-center justify-between p-8 inset-0 top-0 left-0 h-screen w-full bg-white">
            <div className="flex flex-col items-center gap-8 justify-between h-full pt-8 pb-8">
                <span className="flex flex-col gap-1 text-center ">
                    <h1 className="text-2xl font-bold">E-Learning School</h1>
                    <p>Belajar matematika Sekolah Menengah Pertama (SMP) menyenangkan bersama sch-learning!</p>
                </span>
                <Image
                    src={'/Assets/OnBoarding/boarding1.png'}
                    width={240}
                    height={240}
                    className="object-cover animate-pulse"
                    alt="Boarding"
                />
                <div className="w-[50%] flex flex-row gap-1 items-center justify-center">
                    <div className={`${progressBar === 1 ? "w-12 bg-stone-400" : "w-6 bg-stone-200"} h-1 rounded-full transition-all duration-200 ease-in-out`} />
                    <div className={`${progressBar === 2 ? "w-12 bg-stone-400" : "w-6 bg-stone-200"} h-1 rounded-full transition-all duration-200 ease-in-out`} />
                    <div className={`${progressBar === 3 ? "w-12 bg-stone-400" : "w-6 bg-stone-200"} h-1 rounded-full transition-all duration-200 ease-in-out`} />
                </div>
            </div>
            <button className="relative z-2 w-full h-13 bg-[var(--accentColor)] text-white font-bold rounded-full cursor-pointer" onClick={handleButton}>Selanjutnya</button>
            {/* <div className="absolute bottom-0 h-[60%]  w-full bg-gradient-to-t from-blue-500 to-blue-white opacity-20" /> */}
        </div>
    )
}

export default SplashOnboarding
