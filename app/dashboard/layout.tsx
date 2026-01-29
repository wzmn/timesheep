'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import { IoChevronDown } from "react-icons/io5";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-gray-100">
        <div className="flex bg-white mb-8">
          <div className="w-full flex p-6 gap-4 justify-between items-center">
            <Link href='/dashboard'><h1>Timesheep</h1></Link>
            <div className="relative">
              <Dropdown>
                <Dropdown.Trigger>{session?.user?.name} <IoChevronDown /></Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => signOut()}>Signout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="mb-4">{children}</div>
        <footer className="container mx-auto bg-white py-8 shadow-sm rounded-md text-center mb-10 text-gray-400 font-light">
          &copy; 2026 tentwenty. All rights reserved.
        </footer>
      </div>
    </>
  );
}
