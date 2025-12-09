"use client"

import { useState } from 'react'
import { User2Icon, TrophyIcon, FlameIcon, CheckCircleIcon } from 'lucide-react'

interface Stat {
  label: string
  value: number
  icon: React.ReactNode
}

const ProfilPage = () => {
  // Dummy data untuk statistik (bisa diganti dengan data dari API atau state management)
  const [stats, setStats] = useState<Stat[]>([
    { label: "Tugas Selesai", value: 150, icon: <CheckCircleIcon width={24} /> },
    { label: "Streak Harian", value: 7, icon: <FlameIcon width={24} /> },
    { label: "Pencapaian", value: 12, icon: <TrophyIcon width={24} /> },
  ])

  return (
    <div className="w-full">
      {/* Karakter 3D Interaktif dari Spline */}
      <div className="w-full h-full flex justify-center">
        <div className="w-full h-full overflow-hidden rounded-lg relative">
          <iframe src='https://my.spline.design/draganddropbookpencilschoolcopy-14b15323c1a437273560c531ee1b834b/' frameBorder="0"
            width="100%"
            height="100%"
            className="absolute top-[90px] left-0 "></iframe>
    
        {/* <iframe
            src="https://my.spline.design/molang3dcopy-742cc29ac3aa041deb88ce0f81820bef/"
            frameBorder="0"
            width="100%"
            height="430"
            className="absolute top-[-30px] left-0"
          ></iframe> */}
      </div>
    </div>



      {/* Statistik */ }
  {/* <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistik Anda</h2>
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">{stat.icon}</div>
            <span className="text-sm font-medium text-gray-700">{stat.label}</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{stat.value}</span>
        </div>
      ))}
    </div>
  </div> */}

  {/* Footer atau Navigasi (opsional, bisa integrasi dengan FooterClient sebelumnya) */ }
  <div className="mt-8">
    {/* Jika perlu, tambahkan FooterClient di sini */}
  </div>
    </div >
  )
}

export default ProfilPage
