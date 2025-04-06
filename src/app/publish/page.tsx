"use client"

import { FaNewspaper, FaUsers } from "react-icons/fa6";
import { FaCheckCircle, FaUserPlus, FaUserEdit } from "react-icons/fa";
import { MdOutlineAccessTimeFilled, MdAdd, MdSettings } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar/navbar";

const AdminPage = () => {

  const [users] = useState(100);
  const [news] = useState(50);
  const [status] = useState("active");
  const [lastlogin] = useState("2h ago");

  return (
    <>
      <Navbar />
      <div className='w-full h-full flex flex-col py-6 px-10'>
        <div className='w-full flex justify-between space-x-10'>
          <button className='h-[5rem] w-[50%] border bg-white flex justify-center items-center shadow-sm hover:shadow-md'>
            <Link href={"/publish/news"}>
              <div className="flex flex-row items-center">
                <FaNewspaper className='text-4xl' />
                <span className='text-4xl ml-2'>News Management</span>
              </div>
            </Link>
          </button>
          <button className='h-[5rem] w-[50%] border bg-white flex justify-center items-center shadow-sm hover:shadow-md'>
            <Link href={"/"}>
              <div className="flex flex-row items-center">
                <FaUsers className='text-4xl' />
                <span className='text-4xl ml-2'>User Management</span>
              </div>
            </Link>
          </button>
        </div>
        <div className="w-full flex flex-row justify-between space-x-10 mt-10">
          <div className="flex flex-row justify-between border bg-white shadow-sm hover:shadow-md p-4 w-[25%]">
            <div className="flex flex-col">
              <span>
                Total Users
              </span>
              <span className="font-bold text-xl">
                {users}
              </span>
            </div>
            <div>
              <FaUsers className='text-4xl' />
            </div>
          </div>
          <div className="flex flex-row justify-between border bg-white shadow-sm hover:shadow-md p-4 w-[25%]">
            <div className="flex flex-col">
              <span>
                Total News
              </span>
              <span className="font-bold text-xl">
                {news}
              </span>
            </div>
            <div>
              <FaNewspaper className='text-4xl' />
            </div>
          </div>
          <div className="flex flex-row justify-between border bg-white shadow-sm hover:shadow-md p-4 w-[25%]">
            <div className="flex flex-col">
              <span>
                System Status
              </span>
              <span className="font-bold text-xl capitalize text-green-500">
                {status}
              </span>
            </div>
            <div>
              <FaCheckCircle className='text-4xl' />
            </div>
          </div>
          <div className="flex flex-row justify-between border bg-white shadow-sm hover:shadow-md p-4 w-[25%]">
            <div className="flex flex-col">
              <span>
                Last Login
              </span>
              <span className="font-bold text-xl">
                {lastlogin}
              </span>
            </div>
            <div>
              <MdOutlineAccessTimeFilled className='text-4xl' />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full space-x-10 mt-10">
          <div className="flex flex-col w-[50%] border bg-white shadow-sm hover:shadow-md p-4">
            <span className="text-2xl font-bold">
              Quick Actions
            </span>
            <div className="flex flex-row">
              <button className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <MdAdd className='text-xl mr-1' />
                Create News
              </button>
              <button className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <FaUserPlus className='text-xl mr-1' />
                Add User
              </button>
            </div>
            <div className="flex flex-row">
              <button className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <BiSolidReport className='text-xl mr-1' />
                View Reports
              </button>
              <button className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <MdSettings className='text-xl mr-1' />
                Settings
              </button>
            </div>
            <div>

            </div>
          </div>
          <div className="flex flex-col w-[50%] border bg-white shadow-sm hover:shadow-md p-4">
            <span className="text-2xl font-bold">
              Recent Activities
            </span>
            <div className="flex flex-row items-center mt-4">
              <FaUserEdit className='text-2xl mr-2' />
              <div className="flex flex-col">
                <span>User profile updated</span>
                <span className="text-gray-500 text-sm">1h ago</span>
              </div>
            </div>
            <div className="flex flex-row items-center mt-4">
              <FaUserEdit className='text-2xl mr-2' />
              <div className="flex flex-col">
                <span>User profile updated</span>
                <span className="text-gray-500 text-sm">1h ago</span>
              </div>
            </div>
            <div className="flex flex-row items-center mt-4">
              <FaUserEdit className='text-2xl mr-2' />
              <div className="flex flex-col">
                <span>User profile updated</span>
                <span className="text-gray-500 text-sm">1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer flex flex-row justify-between items-center mt-5 border-t pt-4 px-4">
        <div className="flex">
          <span className="text-gray-500 text-sm border-r border-gray-300 pr-2">
            Version 1.0.0
          </span>
          <span className="text-gray-500 text-sm pl-2">
            © 2023 MAIS. All rights reserved.
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          Developed by MAIS Team
        </span>
      </div>
    </>
  )
}

export default AdminPage