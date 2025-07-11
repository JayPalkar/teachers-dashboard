"use client";

import { X, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import gpay from "../../public/payPortals/gpay.png";
import phonepay from "../../public/payPortals/phonepe.png";
import paytm from "../../public/payPortals/paytm.png";

interface PaymentProps {
  onClose: () => void;
  bookingDetails: {
    teacherName: string;
    date: string;
    fromTime: string;
    toTime: string;
    qualification: string;
    amount: number;
  };
}

const PaymentModal: React.FC<PaymentProps> = ({ onClose, bookingDetails }) => {
  const [upiId, setUpiId] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = () => {
    const upiRegex = /^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/;

    if (!upiRegex.test(upiId.trim())) {
      setError("Please enter a valid UPI ID (e.g. john.doe@upi).");
      return;
    }

    setError("");
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setShowSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-fade-in border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8 animate-slide-in">
            <CheckCircle2 className="text-green-600 w-16 h-16 animate-ping-once" />
            <h3 className="text-xl font-semibold text-center text-green-700">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Your session has been booked with {bookingDetails.teacherName}.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Complete Your Payment
            </h2>

            <div className="flex justify-center gap-4 mb-4">
              <Image src={gpay} alt="Google Pay" width={40} height={40} />
              <Image src={phonepay} alt="PhonePe" width={40} height={40} />
              <Image src={paytm} alt="Paytm" width={45} height={40} />
            </div>

            <div className="space-y-1 text-sm mb-6 text-gray-700 border p-4 rounded-lg bg-gray-50">
              <p>
                <strong>Teacher:</strong> {bookingDetails.teacherName}
              </p>
              <p>
                <strong>Session:</strong> {bookingDetails.date} |{" "}
                {bookingDetails.fromTime} – {bookingDetails.toTime}
              </p>
              <p>
                <strong>Qualification:</strong> {bookingDetails.qualification}
              </p>
              <p>
                <strong>Amount:</strong> ₹{bookingDetails.amount}
              </p>
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder=" "
                className={`w-full border px-3 pt-5 pb-2 rounded-lg focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              <label className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all">
                UPI ID (e.g. john.doe@upi)
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button
              onClick={handlePayment}
              disabled={isPaying || !upiId}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all ${
                isPaying ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isPaying ? "Processing..." : `Pay ₹${bookingDetails.amount}`}
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .animate-ping-once {
          animation: ping 0.6s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.4s ease-out;
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
