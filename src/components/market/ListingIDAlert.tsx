"use client"

import React, { useState } from 'react';
import { Alert, AlertTitle, Snackbar, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ListingIDAlertProps {
  id: string;
  onClose: () => void;
  open: boolean;
}

export function ListingIDAlert({ id, onClose, open }: ListingIDAlertProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Snackbar 
      open={open} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ maxWidth: '500px', width: '100%' }}
    >
      <Alert 
        severity="success"
        variant="filled"
        sx={{ 
          width: '100%', 
          alignItems: 'center',
          '& .MuiAlert-message': { 
            width: '100%' 
          }
        }}
        action={
          <IconButton 
            size="small" 
            aria-label="close" 
            color="inherit" 
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <AlertTitle>Listing Created Successfully!</AlertTitle>
        <div className="flex flex-col mt-1">
          <p className="mb-2">Your listing has been created. Please save your listing ID for future reference:</p>
          <div className="flex items-center justify-between bg-white/20 px-3 py-2 rounded">
            <code className="text-white font-mono">{id}</code>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <IconButton color="inherit" size="small" onClick={handleCopy}>
                {copied ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </div>
          <p className="text-sm mt-3">
            You'll need this ID to edit or update your listing status later.
          </p>
        </div>
      </Alert>
    </Snackbar>
  );
}