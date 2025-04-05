import Link from "next/link"
import logo from "@/assets/logo.png"
import { IoSearch } from "react-icons/io5"
import Menu from "@/components/navbar/menu"

export function Navbar() {


  return (
    <header className="flex flex-row mb-8 border">
      <button>
        <Link href="/" className="flex items-center space-x-2 py-2 px-4">
          <img src={logo.src} alt="Logo" className="h-10 w-10" />
          <span className="font-semibold text-xl">Study Simple</span>
        </Link>
      </button>
      <div className="flex flex-row items-center ml-auto mr-4 space-x-4">
        <div className="flex flex-row items-center">
          <div className="h-8 border-l p-1 hover:bg-gray-100 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
            <IoSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-48 h-8 border border-gray-500 rounded-r-md pl-2 focus:outline-none"
          />
        </div>

        <Menu />
      </div>
    </header>
  )
}

