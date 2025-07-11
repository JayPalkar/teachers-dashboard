/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Teacher } from "@/types";
import PaymentModal from "./PaymentModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
}

interface FormValues {
  date: string;
  startTime: string;
  duration: string;
  qualification: string;
}

const DURATION_OPTIONS = [
  { label: "30 mins", value: 0.5 },
  { label: "1 hour", value: 1 },
  { label: "1.5 hours", value: 1.5 },
  { label: "2 hours", value: 2 },
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 6; hour < 22; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

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
  const [bookingData, setBookingData] = useState<any>(null);

  const date = watch("date");
  const startTime = watch("startTime");
  const duration = parseFloat(watch("duration"));
  const qualificationLabel = watch("qualification");

  const qualifications = [
    ...teacher.privateQualification.map((q) => ({
      ...q,
      label: `Private: ${q.name} - $${q.rate}/hr`,
    })),
    ...teacher.groupQualification.map((q) => ({
      ...q,
      label: `Group: ${q.name} - $${q.rate}/hr`,
    })),
  ];

  const selectedQualification = qualifications.find(
    (q) => q.label === qualificationLabel
  );

  const rate = selectedQualification?.rate || 0;
  const amount = rate * duration;

  const calcToTime = () => {
    if (!startTime || !duration) return "";
    const [h, m] = startTime.split(":").map(Number);
    const totalMinutes = h * 60 + m + duration * 60;
    const endH = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const endM = (totalMinutes % 60).toString().padStart(2, "0");
    return `${endH}:${endM}`;
  };

  const isOverlapping = () => {
    if (!startTime || !date || !duration) return false;
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const start = toMinutes(startTime);
    const end = toMinutes(calcToTime());

    return teacher.schedule
      .filter((slot) => slot.date === date)
      .some((slot) => {
        const bookedStart = toMinutes(slot.fromTime);
        const bookedEnd = toMinutes(slot.toTime);
        return Math.max(bookedStart, start) < Math.min(bookedEnd, end);
      });
  };

  const onSubmit = (data: FormValues) => {
    if (isOverlapping()) {
      setError("startTime", {
        type: "manual",
        message: "Selected time overlaps with a booked slot.",
      });
      return;
    }

    setBookingData({
      ...data,
      toTime: calcToTime(),
      amount,
    });
    setShowPayment(true);
  };

  const handleClose = () => {
    reset();
    setShowPayment(false);
    setBookingData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 z-50 flex justify-center items-center px-4">
      {showPayment && bookingData ? (
        <PaymentModal
          bookingDetails={{
            teacherName: teacher.name,
            date: bookingData.date,
            fromTime: bookingData.startTime,
            toTime: bookingData.toTime,
            qualification: bookingData.qualification,
            amount: bookingData.amount,
          }}
          onClose={handleClose}
        />
      ) : (
        <div className="bg-[#14213d] text-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
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
              <label className="block text-sm mb-1">Start Time</label>
              <select
                {...register("startTime", {
                  required: "Please select a start time",
                })}
                className="w-full border rounded px-3 py-2 "
              >
                <option className="text-black" value="">
                  Select start time
                </option>
                {generateTimeSlots().map((slot) => (
                  <option className="text-black" key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.startTime && (
                <p className="text-red-400 text-sm">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Duration</label>
              <select
                {...register("duration", {
                  required: "Please select session duration",
                })}
                className="w-full border rounded px-3 py-2 "
              >
                <option className="text-black" value="">
                  Select duration
                </option>
                {DURATION_OPTIONS.map((d) => (
                  <option className="text-black" key={d.label} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {errors.duration && (
                <p className="text-red-400 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Qualification</label>
              <select
                {...register("qualification", {
                  required: "Select a qualification",
                })}
                className="w-full border rounded px-3 py-2 "
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

            {rate > 0 && duration > 0 && (
              <p className="text-sm text-green-400">
                Total: ${amount.toFixed(2)}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookSessionModal;
