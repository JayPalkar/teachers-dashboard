"use client";

import { ScheduleSlot } from "@/types";
import React, { useState } from "react";
import { format, addDays, subDays, isSameWeek, startOfWeek } from "date-fns";

const timeSlots = Array.from({ length: 18 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minutes}`;
});

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getDayIndex(date: string): number {
  const day = new Date(date).getDay();
  return day === 0 ? 6 : day - 1;
}

function getTimeOffsetIndex(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h - 9) * 2 + (m === 30 ? 1 : 0);
}

export default function WeeklySchedule({
  schedule,
}: {
  schedule: ScheduleSlot[];
}) {
  const [referenceDate, setReferenceDate] = useState(new Date());

  const filteredSchedule = schedule.filter((slot) =>
    isSameWeek(new Date(slot.date), referenceDate, { weekStartsOn: 1 })
  );

  const goToPrevWeek = () => setReferenceDate((prev) => subDays(prev, 7));
  const goToNextWeek = () => setReferenceDate((prev) => addDays(prev, 7));

  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });

  return (
    <div className="border rounded-lg">
      {/* Fixed Header */}
      <div className="sticky top-0 z-40 bg-black text-white py-2 px-4">
        <div className="max-w-[1000px] mx-auto flex justify-between items-center">
          <button
            onClick={goToPrevWeek}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            ← Prev
          </button>
          <h2 className="text-lg font-semibold">
            Week of {format(weekStart, "MMM d, yyyy")}
          </h2>
          <button
            onClick={goToNextWeek}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="h-[600px] overflow-auto ">
        <div className="min-w-[900px]  grid grid-cols-[80px_repeat(7,minmax(120px,1fr))]">
          <div className="sticky top-0 left-0 z-30 bg-black border border-gray-300" />

          {days.map((day, i) => (
            <div
              key={day}
              className="sticky top-0 z-30 text-center text-sm font-semibold py-2 bg-black border border-gray-300"
            >
              {day}
              <br />
              <span className="text-xs">
                {format(addDays(weekStart, i), "MMM d")}
              </span>
            </div>
          ))}

          {timeSlots.map((time, rowIndex) => (
            <React.Fragment key={time}>
              <div className="sticky left-0 z-20 text-xs text-gray-200 bg-black border border-gray-300 text-right pr-2 py-1 h-[40px]">
                {time}
              </div>

              {days.map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="relative border border-gray-800 h-[40px]"
                >
                  {filteredSchedule
                    .filter((slot) => {
                      const dayMatch = getDayIndex(slot.date) === colIndex;
                      const rowStart = getTimeOffsetIndex(slot.fromTime);
                      return dayMatch && rowStart === rowIndex;
                    })
                    .map((slot, i) => {
                      const startIndex = getTimeOffsetIndex(slot.fromTime);
                      const endIndex = getTimeOffsetIndex(slot.toTime);
                      const rowSpan = endIndex - startIndex;

                      return (
                        <div
                          key={i}
                          className="absolute  inset-x-1 bg-blue-500 text-white text-xs p-1  z-10"
                          style={{
                            top: 0,
                            height: `${rowSpan * 40}px`,
                          }}
                        >
                          {slot.fromTime} - {slot.toTime}
                        </div>
                      );
                    })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
