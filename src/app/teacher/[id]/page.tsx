import ContactDetails from "@/components/ContactDetails";
import QualificationTable from "@/components/QualificationTable";
import TeacherDetails from "@/components/TeacherDetails";
import WeeklySchedule from "@/components/WeeklySchedule";
import { dummyTeacher } from "@/utils/dummyData";
import React from "react";
import { MdAdd } from "react-icons/md";

const page = () => {
  const teacher = dummyTeacher;
  return (
    <div className="flex flex-col gap-5 h-screen p-5">
      <h1 className="text-3xl ">Hello, {teacher.name}</h1>

      <div className="flex flex-col gap-5 md:flex-row lg:flex-row">
        <TeacherDetails
          role={teacher.role}
          dateOfBirth={teacher.birthDate}
          address={teacher.address}
        />
        <ContactDetails email={teacher.email} phone={teacher.phone} />
      </div>

      <div className="flex flex-col gap-5 md:flex-row lg:flex-row ">
        <div className=" min-h-fit p-2 border-[1px] rounded-lg relative overflow-hidden">
          <span className=" absolute top-[-8px] right-[-8px] flex justify-center items-center text-black bg-white w-10 h-10 rounded-full text-2xl">
            <MdAdd />
          </span>
          <QualificationTable qualifications={teacher.privateQualification} />
        </div>

        <div className="min-h-fit p-2 border-[1px] rounded-lg relative overflow-hidden">
          <span className=" absolute top-[-8px] right-[-8px] flex justify-center items-center text-black bg-white w-10 h-10 rounded-full text-2xl">
            <MdAdd />
          </span>
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

export default page;
