"use client";

import { X } from "lucide-react";
import React, { useState } from "react";

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

  const handlePayment = () => {
    alert("Payment successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg  bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">UPI Payment</h2>

        <div className="space-y-2 text-sm mb-4">
          <p>
            <strong>Teacher:</strong> {bookingDetails.teacherName}
          </p>
          <p>
            <strong>Session:</strong> {bookingDetails.date} from{" "}
            {bookingDetails.fromTime} to {bookingDetails.toTime}
          </p>
          <p>
            <strong>Qualification:</strong> {bookingDetails.qualification}
          </p>
          <p>
            <strong>Amount:</strong> ₹{bookingDetails.amount}
          </p>
        </div>

        <label className="block text-sm font-medium mb-1">Enter UPI ID</label>
        <input
          type="text"
          placeholder="example@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <button
          onClick={handlePayment}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all"
          disabled={!upiId}
        >
          Pay ₹{bookingDetails.amount}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
