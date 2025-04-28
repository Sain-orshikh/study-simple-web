"use client"

import { FaNewspaper, FaTrash, FaStore, FaTachometerAlt, FaClock } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar/sidebar"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const AdminPage = () => {
  // Fetch blogs data
  const {data:blogs, refetch: refetchBlogs} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/blogs/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
  });

  // Fetch listings data
  const {data:listings, refetch: refetchListings} = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/listings/fetch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch listings");
      return data;
    },
  });

  const blogCount = blogs?.data?.length || 0;
  const listingCount = listings?.data?.length || 0;
  const [status] = useState("active");

  // Blog management states
  const [delId, setDelId] = useState("");
  const [delOpen, setDelOpen] = useState(false);
  
  // Listing management states
  const [listingDelId, setListingDelId] = useState("");
  const [listingDelOpen, setListingDelOpen] = useState(false);
  
  // Coming soon modal state
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  // Blog delete mutation
  const { mutate: deleteBlog, isPending: isDeleteBlogPending } = useMutation({
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
      refetchBlogs();
      setDelOpen(false);
    },  
    onError: (error) => {
      toast.error((error as Error).message || String(error));
    },
  });

  // Listing delete mutation
  const { mutate: deleteListing, isPending: isDeleteListingPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:5000/api/listings/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete listing");
      return data;
    },
    onSuccess: () => {
      toast.success("Listing deleted successfully");
      setListingDelId("");
      refetchListings();
      setListingDelOpen(false);
    },  
    onError: (error) => {
      toast.error((error as Error).message || String(error));
    },
  });

  // Handle blog delete
  const handleBlogDelete = async () => {
    if (!delId || delId.length === 0) {
      toast.error("Please enter a blog ID to delete.");
      return;
    }
    deleteBlog(delId);
  }

  // Handle listing delete
  const handleListingDelete = async () => {
    if (!listingDelId || listingDelId.length === 0) {
      toast.error("Please enter a listing ID to delete.");
      return;
    }
    deleteListing(listingDelId);
  }

  // Handle coming soon notification
  const handleComingSoon = () => {
    setComingSoonOpen(true);
  };

  return (
    <>
      <Sidebar>
        <Toaster position="top-center" />
        <div className="min-h-screen bg-gray-50">
          {/* Dashboard Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">Content Management Dashboard</h1>
            <p className="text-sm text-gray-500">Manage blogs and marketplace listings</p>
          </div>

          <div className="p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <FaTachometerAlt className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          System Status
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900 capitalize">
                            {status}
                          </div>
                          <div className="ml-2 flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <FaNewspaper className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Blogs
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {blogCount}
                          </div>
                          <div className="ml-2 flex items-center">
                            <Link href="/blogs" className="text-xs text-blue-600 hover:text-blue-800">
                              View all
                            </Link>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <FaStore className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Listings
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {listingCount}
                          </div>
                          <div className="ml-2 flex items-center">
                            <Link href="/market" className="text-xs text-purple-600 hover:text-purple-800">
                              View all
                            </Link>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Blog Management */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <div className="flex items-center">
                    <FaNewspaper className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Blog Management</h3>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={handleComingSoon}
                      className="inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaClock className="mr-2 h-5 w-5" />
                      More Blog Features Coming Soon
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setDelOpen(true)}
                      className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-2 h-4 w-4" />
                      Delete Blog
                    </button>
                  </div>
                </div>
              </div>

              {/* Listing Management */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <div className="flex items-center">
                    <FaStore className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Listing Management</h3>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={handleComingSoon}
                      className="inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FaClock className="mr-2 h-5 w-5" />
                      More Listing Features Coming Soon
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setListingDelOpen(true)}
                      className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-2 h-4 w-4" />
                      Delete Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white mt-8">
            <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-2">Version 2.0.0</span>
                <span className="border-l border-gray-300 pl-2">© 2025 MAIS. All rights reserved.</span>
              </div>
              <span>Developed by Study Simple Team</span>
            </div>
          </div>
        </div>
      
        {/* Blog Delete Modal */}
        <Modal
          open={delOpen}
          onClose={() => setDelOpen(false)}
          className="flex items-center justify-center"
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaTrash className="h-5 w-5 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-modal-title">
                    Delete Blog
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter the ID of the blog you want to delete. This action cannot be undone.
                    </p>
                    <input
                      type="text"
                      value={delId}
                      onChange={(e) => setDelId(e.target.value)}
                      placeholder="Enter blog ID"
                      className="mt-3 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleBlogDelete}
                disabled={isDeleteBlogPending}
              >
                {isDeleteBlogPending ? "Deleting..." : "Delete"}
              </button>
              <button 
                type="button" 
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setDelOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      
        {/* Listing Delete Modal */}
        <Modal
          open={listingDelOpen}
          onClose={() => setListingDelOpen(false)}
          className="flex items-center justify-center"
          aria-labelledby="listing-del-modal-title"
          aria-describedby="listing-del-modal-description"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaTrash className="h-5 w-5 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="listing-del-modal-title">
                    Delete Listing
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter the ID of the listing you want to delete. This action cannot be undone.
                    </p>
                    <input
                      type="text"
                      value={listingDelId}
                      onChange={(e) => setListingDelId(e.target.value)}
                      placeholder="Enter listing ID"
                      className="mt-3 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleListingDelete}
                disabled={isDeleteListingPending}
              >
                {isDeleteListingPending ? "Deleting..." : "Delete"}
              </button>
              <button 
                type="button" 
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setListingDelOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        
        {/* Coming Soon Modal */}
        <Modal
          open={comingSoonOpen}
          onClose={() => setComingSoonOpen(false)}
          className="flex items-center justify-center"
          aria-labelledby="coming-soon-modal-title"
          aria-describedby="coming-soon-modal-description"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaClock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="coming-soon-modal-title">
                    Feature Coming Soon
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      We're working hard to bring you more management features. This functionality will be available in a future update.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setComingSoonOpen(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </Modal>
      </Sidebar>
    </>
  )
}

export default AdminPage