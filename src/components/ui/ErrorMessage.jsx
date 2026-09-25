import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4 text-center w-100">
      <AlertCircle style={{ width: '48px', height: '48px' }} className="text-danger mb-3" />
      <h3 className="fs-5 fw-semibold text-dark mb-2">Something went wrong</h3>
      <p className="text-muted mb-3">{message || 'An unexpected error occurred.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 btn btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;