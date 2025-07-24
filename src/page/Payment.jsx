import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  useEffect(() => {
    const dataFromParams = {
      name: searchParams.get('name') || 'John Doe',
      email: searchParams.get('email') || 'johndoe@example.com',
      amount: searchParams.get('amount') || '499',
      method: searchParams.get('method') || 'Test UPI',
      paymentId: searchParams.get('paymentId') || 'PAY' + Math.floor(Math.random() * 1000000000),
      date: new Date().toLocaleString(),
    };
    setPaymentData(dataFromParams);
  }, [searchParams]);

  const handleDummyPayment = () => {
    setPaymentStatus('processing');

    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failed');
      }
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentStatus('idle');

  };

  if (!paymentData && paymentStatus === 'idle') {
    return <p className="min-h-screen flex items-center justify-center text-gray-700">Loading payment details...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Complete Your Payment
        </h2>

        {paymentStatus === 'idle' && (
          <>
            <p className="text-gray-700 mb-6">
              Details for your payment:
              <br />
              <strong>Amount:</strong> ₹{paymentData?.amount || 'N/A'}
              <br />
              <strong>Method:</strong> {paymentData?.method || 'N/A'}
            </p>
            <button
              onClick={handleDummyPayment}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Proceed to Pay (Dummy)
            </button>
          </>
        )}

        {paymentStatus === 'processing' && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700">Processing Payment...</p>
            <p className="text-gray-500 text-sm mt-2">Please do not close this window.</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="flex flex-col items-center justify-center py-10">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">🎉 Payment Successful!</h3>
            <p className="text-gray-700 mb-6">
              Thank you for your payment. Here are your details:
            </p>

            <div className="mt-6 space-y-2 text-sm text-gray-800 text-left w-full">
              <p><strong>Name:</strong> {paymentData.name}</p>
              <p><strong>Email:</strong> {paymentData.email}</p>
              <p><strong>Amount Paid:</strong> ₹{paymentData.amount}</p>
              <p><strong>Payment Method:</strong> {paymentData.method}</p>
              <p><strong>Payment ID:</strong> {paymentData.paymentId}</p>
              <p><strong>Date:</strong> {paymentData.date}</p>
            </div>

            <button
              onClick={resetPayment}
              className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Payment Options
            </button>
            <a href="/register" className="mt-4 text-blue-600 hover:underline">Go to Home</a>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="flex flex-col items-center justify-center py-10">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold text-red-700 mb-2">Payment Failed!</h3>
            <p className="text-gray-700 mb-6">
              There was an issue processing your payment. Please try again.
            </p>
            <button
              onClick={resetPayment}
              className="mt-4 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
