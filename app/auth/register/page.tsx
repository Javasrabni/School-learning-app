"use client"
import React, { useState } from 'react'

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [grade, setGrade] = useState("")
    const [password, setPassword] = useState("")

    const GradeOption = ["Kelas 7", "Kelas 8", "Kelas 9"]

    return (
        <div>
            <div className="flex flex-col gap-8 ">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={"Username"} />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"you@gmail.com"} />
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                    {GradeOption.map((i, idx) =>
                        <option value={i} key={idx}>{i}</option>
                    )}
                </select>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"•••••"} />
            </div>

        </div>
    )
}

export default RegisterPage
