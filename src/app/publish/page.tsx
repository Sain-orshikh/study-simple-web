"use client"

import { FaNewspaper, FaTrash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdAdd, MdSettings } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar/navbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const AdminPage = () => {

  const {data:blogs} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/blogs/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
  });

  const Blogs = blogs?.data.length;
  console.log("Blogs data:", Blogs);
  const [status] = useState("active");

  const [delId, setDelId] = useState("");

  const { mutate: deleteBlog } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:5000/api/blogs/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete blog");
      return data;
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      setDelId("");
    },  
    onError: (error) => {
      toast.error((error as Error).message || String(error));
      toast.error("Get Blog Id from the URL to delete it.");
    },
  });

  const handleDel = async () => {
    if (!delId || delId.length === 0) {
      toast.error("Please enter a blog ID to delete.");
      return;
    }
    deleteBlog(delId);
    setDelId("");
  }

  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = () => {
    setDelOpen(true);
  };

  const handleUnfinished = () => {
    toast.error("This feature is not available yet.");
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <div className='w-full h-full flex flex-col pt-6 px-10'>
        <div className='w-full flex justify-between space-x-10'>
          <button className='h-[5rem] w-[50%] border bg-white flex justify-center items-center shadow-sm hover:shadow-md'>
            <Link href={"/publish/news"}>
              <div className="flex flex-row items-center">
                <FaNewspaper className='text-4xl' />
                <span className='text-4xl ml-2'>News Management</span>
              </div>
            </Link>
          </button>
        </div>
        <div className="w-[50%] flex flex-row justify-between space-x-10 mt-10">
          <div className="flex flex-row justify-between border bg-white shadow-sm hover:shadow-md p-4 w-[50%]">
            <div className="flex flex-col">
              <span>
                Total Blogs
              </span>
              <span className="font-bold text-xl">
                {Blogs}
              </span>
            </div>
            <div>
              <FaNewspaper className='text-4xl' />
            </div>
            
          </div>
          <div className="flex flex-row justify-between border bg-white shadow-sm hover:shadow-md p-4 w-[50%]">
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
        </div>
        <div className="flex flex-row w-full space-x-10 mt-10">
          <div className="flex flex-col w-[50%] border bg-white shadow-sm hover:shadow-md p-4">
            <span className="text-2xl font-bold">
              Quick Actions
            </span>
            <div className="flex flex-row">
              <Link href={"/publish/news"} className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <MdAdd className='text-2xl mr-1' />
                Create Blog
              </Link>
              <button onClick={handleDelOpen} className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <FaTrash className='text-lg mr-1' />
                Delete Blogs
              </button>
            </div>
            <div className="flex flex-row">
              <button onClick={handleUnfinished} className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <BiSolidReport className='text-xl mr-1' />
                View Reports
              </button>
              <button onClick={handleUnfinished} className="flex flex-row items-center justify-center w-[50%] bg-black hover:bg-gray-900 text-white p-2 rounded-md shadow-sm hover:shadow-md mt-4 mr-4">
                <MdSettings className='text-xl mr-1' />
                Settings
              </button>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer h-[4rem] mt-22 flex flex-row justify-between items-center border-t px-4">
        <div className="flex">
          <span className="text-gray-500 text-sm border-r border-gray-300 pr-2">
            Version 2.0.0
          </span>
          <span className="text-gray-500 text-sm pl-2">
            © 2025 MAIS. All rights reserved.
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          Developed by Study Simple Team
        </span>
      </div>
      <Modal
        open={delOpen}
        onClose={() => setDelOpen(false)}
        className="flex items-center justify-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-[30%] bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Delete Blogs</h2>
          <input
            type="text"
            value={delId}
            onChange={(e) => setDelId(e.target.value)}
            placeholder="Enter blog ID to delete"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button onClick={() => setDelOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md">
              Cancel
            </button>
            <button onClick={handleDel} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AdminPage