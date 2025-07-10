"use client";

import { ScheduleSlot } from "@/types";
import React from "react";

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
  return (
    <div className="h-[600px] overflow-auto border rounded-lg  custom-scroll">
      <div className="min-w-[800px] grid grid-cols-[80px_repeat(7,minmax(100px,1fr))]">
        <div className=" bg-black border-b border-gray-300 sticky top-0 z-20" />
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold py-2 bg-black border border-gray-300 sticky top-0 z-20"
          >
            {day}
          </div>
        ))}

        {timeSlots.map((time, rowIndex) => (
          <React.Fragment key={time}>
            <div className="text-xs text-gray-500 border-r bg-black border-gray-300 text-right pr-2 py-1 h-[40px]  sticky left-0 z-10">
              {time}
            </div>

            {days.map((_, colIndex) => (
              <div
                key={colIndex}
                className="relative border border-gray-900 h-[40px]"
              >
                {schedule
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
                        className="absolute inset-x-1 bg-blue-500 text-white text-xs rounded p-1 shadow-md"
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
  );
}
