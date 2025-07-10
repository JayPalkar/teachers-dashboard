import React from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import {
  MdModeEdit,
  MdOutlineBadge,
  MdOutlineLocationOn,
} from "react-icons/md";

interface PageProps {
  role: string;
  dateOfBirth: string;
  address: string;
}

const TeacherDetails = ({ role, dateOfBirth, address }: PageProps) => {
  return (
    <div className="p-2 border-[1px] rounded-lg overflow-hidden md:flex-1 lg:flex-1">
      <h3 className="text-xl flex justify-between mb-4 relative ">
        Personal Details:{" "}
        <span className=" absolute top-[-15px] right-[-15px] flex justify-center items-center text-black bg-white w-10 h-10 rounded-full">
          <MdModeEdit />
        </span>
      </h3>
      <p className="flex items-center gap-2 text-md mb-2">
        <span className="text-gray-500 text-2xl">
          <MdOutlineBadge />
        </span>
        {role}
      </p>
      <p className="flex items-center gap-2 text-md mb-2">
        <span className="text-gray-500 text-2xl">
          <LiaBirthdayCakeSolid />
        </span>
        {dateOfBirth}
      </p>
      <p className="flex items-center gap-2 text-md mb-2">
        <span className="text-gray-500 text-2xl">
          <MdOutlineLocationOn />
        </span>
        {address}
      </p>
    </div>
  );
};

export default TeacherDetails;
