"use client"

import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MarketplaceGuidelinesProps {
  summaryOnly?: boolean
}

export function MarketplaceGuidelines({ summaryOnly = false }: MarketplaceGuidelinesProps) {
  const [openGuidelinesModal, setOpenGuidelinesModal] = useState(false);

  const handleGuidelinesModalOpen = () => {
    setOpenGuidelinesModal(true);
  };

  const handleGuidelinesModalClose = () => {
    setOpenGuidelinesModal(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Marketplace Guidelines</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>All transactions are between students; the club and the school is not responsible for any issues.</li>
        <li>Meet in public places on campus for exchanges.</li>
        <li>Verify the condition of items before completing a purchase.</li>
        <li>Be honest about the condition of items you&apos;re selling.</li>
        <li>No prohibited items (see full guidelines for details).</li>
      </ul>
      <Button variant="outline" className="mt-4" onClick={handleGuidelinesModalOpen}>
        View Full Guidelines
      </Button>

      <Modal open={openGuidelinesModal} onClose={handleGuidelinesModalClose}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          maxWidth: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Marketplace Guidelines</h2>
            <button 
              onClick={handleGuidelinesModalClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">General Rules</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>All transactions are between students; neither the club nor the school is responsible for any disputes or issues.</li>
                <li>Be respectful and professional when communicating with other students.</li>
                <li>Provide accurate and honest descriptions of your items, including any flaws or damage.</li>
                <li>Respond to inquiries in a timely manner (within 24-48 hours).</li>
                <li>Once a sale is agreed upon, honor your commitment unless both parties agree to cancel.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Safety Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Always meet in public places on campus</strong> such as the library, cafeteria, or student lounges.</li>
                <li>Consider bringing a friend if you're meeting someone you don't know.</li>
                <li>For larger items or expensive transactions, consider meeting during daylight hours.</li>
                <li>Trust your instincts - if something feels wrong about a transaction, don't proceed.</li>
                <li>Report any suspicious activity or behavior to school administration.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Transaction Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Inspect items thoroughly</strong> before completing the purchase.</li>
                <li>For electronics, test the item to ensure it works properly before exchanging money.</li>
                <li>For textbooks, check for excessive highlighting, missing pages, or damage.</li>
                <li>Consider using mobile payment apps for convenience and security.</li>
                <li>Keep a record of your transactions, including screenshots of communications if possible.</li>
                <li>If selling a high-value item, consider accepting only cash or secure digital payment methods.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-red-700 mb-2">Prohibited Items</h3>
              <p className="mb-2">The following items are not allowed to be sold on this marketplace:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Any illegal items or substances</li>
                <li>Weapons or weapon accessories of any kind</li>
                <li>Alcohol, tobacco products, or e-cigarettes/vaping products</li>
                <li>Prescription medications or supplements</li>
                <li>Counterfeit or replica items</li>
                <li>Stolen property</li>
                <li>Items that violate copyright or trademark laws</li>
                <li>Exam materials, answer keys, or other academic integrity violations</li>
                <li>Any items prohibited by school policy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Dispute Resolution</h3>
              <p className="mb-2">If you encounter issues with a transaction:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>First, try to resolve the issue directly with the other student through respectful communication.</li>
                <li>If that fails, you may contact the Student Marketplace Club coordinator for mediation.</li>
                <li>For serious issues involving safety or illegal activity, contact school administration or appropriate authorities.</li>
              </ol>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                These guidelines are in place to ensure a safe and fair marketplace experience for all students. 
                Violation of these guidelines may result in loss of marketplace privileges. The Student Marketplace 
                is intended to be a helpful resource for our school community - thank you for using it responsibly!
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}