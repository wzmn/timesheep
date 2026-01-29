'use client'
import Link from "next/link"
import { useState, FormEvent, useEffect } from "react"
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const login = async (e: FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
            callbackUrl,
        });

        if (!result?.error) {
            router.push(callbackUrl);
        } else {
            setResponse("Invalid username or password");
        }
    }

    return (
        <>
            <div className="flex min-h-screen stretch">
                <div className="w-full sm:w-1/2 px-10 lg:px-20 flex-col flex items-start justify-center">
                    <h1 className="text-xl font-bold mb-4">Welcome back</h1>
                    <form onSubmit={login} className="flex flex-col w-full mb-4">
                        <label className="font-semibold text-sm flex flex-col gap-2 mb-4">
                            Username
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 p-2 border-gray-200 rounded-lg" />
                        </label>
                        <label className="font-semibold text-sm flex flex-col gap-2 mb-4">
                            Password
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 p-2 border-gray-200 rounded-lg" />
                        </label>
                        <label className="font-medium text-sm flex gap-2 mb-4 text-gray-500">
                            <input type="checkbox" name="remember" className="border-2 p-2 border-gray-200 rounded-lg" />
                            Remember me
                        </label>
                        <p className="text-red-600 text-sm mb-4">{response}</p>
                        <input type="submit" value="Sign in" className="border bg-blue-700 text-white rounded-lg p-3 text-sm" />
                    </form>
                    <Link className="text-sm text-blue-700" href={"/register"}>Create account</Link>
                </div>
                <div className="bg-blue-600 text-white w-1/2 px-10 lg:px-20  flex-col hidden sm:flex items-start justify-center">
                    <h1 className="text-4xl font-bold mb-4">TimeSheep</h1>
                    <p className="font-light">Introducing TimeSheep, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With TimeSheep, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.</p>
                </div>
            </div>
        </>
    )
}