"use client";

import { useState } from "react";
import BookSessionModal from "@/components/BookSessionModal";
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
          className=" flex gap-10 md:gap-20 items-center border rounded-lg shadow hover:shadow-lg p-4 transition"
        >
          <div className="w-40 h-40 rounded-full bg-gray-600 overflow-hidden">
            <Image
              src={teacher.profileImage}
              alt={teacher.name}
              className="w-full h-full object-cover rounded mb-3"
            />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p className="text-gray-600">{teacher.role}</p>
            <button
              className="md:self-end mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => handleBookClick(teacher)}
            >
              Book Session
            </button>
          </div>
        </div>
      ))}

      {selectedTeacher && (
        <BookSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teacher={selectedTeacher}
        />
      )}
    </main>
  );
}
