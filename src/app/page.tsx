/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
// import BookSessionModal from "@/components/BookSessionModal";
import { Teacher } from "@/types";
import { dummyTeachers } from "@/utils/dummyData";
import Image from "next/image";

export default function Home() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyTeachers.map((teacher) => (
        <div
          key={teacher.id}
          className="border rounded-lg shadow hover:shadow-lg p-4 transition"
        >
          <Image
            src={teacher.profileImage}
            alt={teacher.name}
            width={400}
            height={200}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h2 className="text-xl font-semibold">{teacher.name}</h2>
          <p className="text-gray-600">{teacher.role}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleBookClick(teacher)}
          >
            Book Session
          </button>
        </div>
      ))}

      {/* {selectedTeacher && (
        // <BookSessionModal
        //   isOpen={isModalOpen}
        //   onClose={() => setIsModalOpen(false)}
        //   teacher={selectedTeacher}
        // />
      )} */}
    </main>
  );
}
