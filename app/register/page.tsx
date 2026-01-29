'use client'
import { useState, FormEvent, use } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setResponse("")
        setIsError(false)
        fetch("/register/api", {
            method: "POST",
            body: JSON.stringify({
                name,
                username,
                password
            })
        }).then(res => {
            let data = res.json()
            data.then(s => {
                if (s.error) {
                    setResponse(s.error)
                    setIsError(true)
                } else {
                    router.push('/login')
                }
            }).finally(() => {
                setIsLoading(false)
            })
        })
    }

    return (
        <div className="flex min-h-screen stretch">
            <div className="w-full sm:w-1/2 px-10 lg:px-20 flex-col flex items-start justify-center">
                <h1 className="text-xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit} className="white flex flex-col w-full mb-4">
                    <label className="font-semibold text-sm flex flex-col gap-2 mb-4">
                        Name
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            className="border-2 p-2 border-gray-200 rounded-lg"
                            value={name}
                            disabled={isLoading}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="font-semibold text-sm flex flex-col gap-2 mb-4">
                        Username
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            className="border-2 p-2 border-gray-200 rounded-lg"
                            value={username}
                            disabled={isLoading}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label className="font-semibold text-sm flex flex-col gap-2 mb-4">
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="border-2 p-2 border-gray-200 rounded-lg"
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <input type="submit" value="Register" disabled={isLoading} className="border bg-blue-700 text-white rounded-lg p-3 text-sm mb-4" />
                    <p className={isError ? "text-red-600 text-sm mb-4" : "text-green-600 text-sm mb-4"}>{response}</p>
                </form>
                <p className="text-sm">Have an account? <Link className=" text-blue-700" href={"/login"}>Login</Link></p>
            </div>
            <div className="bg-blue-600 text-white w-1/2 px-10 lg:px-20  flex-col hidden sm:flex items-start justify-center">
                <h1 className="text-4xl font-bold mb-4">TimeSheep</h1>
                <p className="font-light">Introducing TimeSheep, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With TimeSheep, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.</p>
            </div>
        </div>
    )
}