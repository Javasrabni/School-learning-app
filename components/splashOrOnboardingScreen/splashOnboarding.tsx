"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { vibrateBtn } from "../vibrateBtn/ButtonVibrate"

const SplashOnboarding = () => {
    const [onboarding, setOnBoarding] = useState(true)

  return (
    <div className="absolute flex flex-col items-center justify-between p-8 inset-0 top-0 left-0 h-screen w-full bg-white">
      <p>INI ONBOARDING</p>
      <Image 
        src={'/Assets/OnBoarding/boarding1.png'}
        width={240}
        height={240}
        className="object-cover animate-pulse"
        alt="Boarding"
      />
      <button className="w-full h-13 bg-[var(--accentColor)] text-white font-bold rounded-full cursor-pointer" onClick={vibrateBtn}>Selanjutnya</button>
    </div>
  )
}

export default SplashOnboarding
