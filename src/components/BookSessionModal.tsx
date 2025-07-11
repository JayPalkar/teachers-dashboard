"use client";

import React, { useState } from "react";
import { Teacher } from "@/types";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import PaymentModal from "./PaymentModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
}

interface FormValues {
  date: string;
  fromTime: string;
  toTime: string;
  qualification: string;
}

const BookSessionModal: React.FC<Props> = ({ isOpen, onClose, teacher }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState<FormValues | null>(null);

  const date = watch("date");

  const qualifications = [
    ...teacher.privateQualification.map((q) => ({
      ...q,
      label: `Private: ${q.name} - $${q.rate}`,
    })),
    ...teacher.groupQualification.map((q) => ({
      ...q,
      label: `Group: ${q.name} - $${q.rate}`,
    })),
  ];

  const checkOverlap = (from: string, to: string) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const userFrom = toMinutes(from);
    const userTo = toMinutes(to);

    return teacher.schedule
      .filter((slot) => slot.date === date)
      .some((slot) => {
        const bookedFrom = toMinutes(slot.fromTime);
        const bookedTo = toMinutes(slot.toTime);
        return Math.max(bookedFrom, userFrom) < Math.min(bookedTo, userTo);
      });
  };

  const onSubmit = (data: FormValues) => {
    if (checkOverlap(data.fromTime, data.toTime)) {
      setError("fromTime", {
        type: "manual",
        message: "Selected time overlaps with an existing booking.",
      });
      setError("toTime", {
        type: "manual",
        message: "Selected time overlaps with an existing booking.",
      });
      return;
    }

    setBookingData(data);
    setShowPayment(true);
  };

  const handleClose = () => {
    reset();
    setBookingData(null);
    setShowPayment(false);
    onClose();
  };

  if (!isOpen) return null;

  if (showPayment && bookingData) {
    return (
      <div className="fixed inset-0 backdrop-blur-lg bg-opacity-40 z-50 flex justify-center items-center px-4">
        <PaymentModal
          bookingDetails={{
            teacherName: teacher.name,
            date: bookingData.date,
            fromTime: bookingData.fromTime,
            toTime: bookingData.toTime,
            qualification: bookingData.qualification,
            amount: parseInt(
              bookingData.qualification.match(/\$(\d+)/)?.[1] || "500"
            ),
          }}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-40 z-50 flex justify-center items-center px-4">
      <div className="bg-[#14213d] rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in text-white">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Book Session with {teacher.name}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              {...register("date", { required: "Please select a date" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.date && (
              <p className="text-red-400 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">From Time</label>
            <input
              type="time"
              {...register("fromTime", { required: "Start time is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.fromTime && (
              <p className="text-red-400 text-sm">{errors.fromTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">To Time</label>
            <input
              type="time"
              {...register("toTime", { required: "End time is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.toTime && (
              <p className="text-red-400 text-sm">{errors.toTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Qualification</label>
            <select
              {...register("qualification", {
                required: "Select a qualification",
              })}
              className="w-full border rounded px-3 py-2"
            >
              <option className="text-black" value="">
                Choose a qualification
              </option>
              {qualifications.map((q) => (
                <option className="text-black" key={q.label} value={q.label}>
                  {q.label}
                </option>
              ))}
            </select>
            {errors.qualification && (
              <p className="text-red-400 text-sm">
                {errors.qualification.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookSessionModal;
