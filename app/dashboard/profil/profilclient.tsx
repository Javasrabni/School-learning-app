// "use client"

// import { useState, } from 'react'
import { User2Icon, TrophyIcon, FlameIcon, CheckCircleIcon } from 'lucide-react'

// interface Stat {
//     label: string
//     value: number
//     icon: React.ReactNode
// }

const ProfileClient = () => {
    // const [loading, setLoading] = useState(false)


    // Dummy data untuk statistik (bisa diganti dengan data dari API atau state management)
    const stats=([
        { label: "Latihan Soal", value: 150, icon: <CheckCircleIcon width={24} /> },
        { label: "Membaca Materi", value: 7, icon: <FlameIcon width={24} /> },
        // { label: "Pencapaian"   , value: 12, icon: <TrophyIcon width={24} /> },
    ])

    return (
        <div className="w-full relative">
            {/* Statistik */}
            <div className="absolute z-10 bottom-0 w-full max-w-md bg-white rounded-lg p-6">
                {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistik Anda</h2> */}
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
            </div>
            {/* Karakter 3D Interaktif dari Spline */}

            <div className="w-full h-[80%] overflow-hidden rounded-lg relative">
                {/* {!loading && ( */}
                    {/* <div className="relative w-full h-full z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <button
                                type="button"
                                className="inline-flex items-center text-body text-white rounded-md bg-blue-600 focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none gap-2"
                            >

                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <p>
                                    Loading
                                </p>
                            </button>
                        </div>
                    </div> */}

                {/* )} */}
                <iframe src='https://my.spline.design/draganddropbookpencilschoolcopy-14b15323c1a437273560c531ee1b834b/' frameBorder="0"
                    width="100%"
                    height="600px"
                    // onLoad={() => setLoading(true)}
                    // style={{ opacity: loading ? 1 : 0 }}
                    className="absolute top-[-40px] left-0 outline-none border-none transition-opacity duration-500"></iframe>

                {/* <iframe
            src="https://my.spline.design/molang3dcopy-742cc29ac3aa041deb88ce0f81820bef/"
            frameBorder="0"
            width="100%"
            height="430"
            className="absolute top-[-30px] left-0"
          ></iframe> */}
            </div>

        </div >
    )
}

export default ProfileClient
