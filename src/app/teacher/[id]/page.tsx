"use client";

import Details from "@/components/details";
import QualificationTable from "@/components/QualificationTable";
import WeeklySchedule from "@/components/WeeklySchedule";
import { dummyTeachers } from "@/utils/dummyData";
import { notFound, useParams } from "next/navigation";
import React from "react";
import { MdAdd } from "react-icons/md";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  const teacher = dummyTeachers.find((t) => t.id === id);

  if (!teacher) return notFound();

  return (
    <div className="flex flex-col gap-5 h-screen p-5">
      <div>
        <Details teacher={teacher} />
      </div>

      <div className="flex flex-col gap-5 md:flex-row lg:flex-row ">
        <div className=" min-h-fit p-2 border-[1px] rounded-lg relative overflow-hidden">
          <button className=" absolute top-[-8px] right-[-8px] flex justify-center items-center text-black bg-white w-10 h-10 rounded-full text-2xl cursor-pointer hover:scale-x-150 hover:scale-y-150 transition-all ease-in">
            <MdAdd />
          </button>
          <QualificationTable qualifications={teacher.privateQualification} />
        </div>

        <div className="min-h-fit p-2 border-[1px] rounded-lg relative overflow-hidden">
          <button className=" absolute top-[-8px] right-[-8px] flex justify-center items-center text-black bg-white w-10 h-10 rounded-full text-2xl cursor-pointer hover:scale-x-150 hover:scale-y-150 transition-all ease-in">
            <MdAdd />
          </button>
          <QualificationTable qualifications={teacher.groupQualification} />
        </div>
      </div>

      <div className="p-y-2">
        <h1 className="text-xl font-bold mb-4">Weekly Schedule</h1>
        <WeeklySchedule schedule={teacher.schedule} />
      </div>
    </div>
  );
};

export default Page;
