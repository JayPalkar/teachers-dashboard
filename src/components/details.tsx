import { Teacher } from "@/types";
import Image from "next/image";

import React from "react";
import { MdModeEdit } from "react-icons/md";

const Details = ({ teacher }: { teacher: Teacher }) => {
  return (
    <div className="flex flex-col gap-5 items-center md:flex-row md:gap-20">
      <div className="flex justify-center items-center bg-[#e5e5e5] p-2 w-40 h-40 rounded-full  relative">
        <Image
          className="w-[90%] h-[90%]"
          src={teacher.profileImage}
          alt="avatar"
        />
        <button className=" flex justify-center items-center absolute bottom-0 right-5 w-10 h-10 p-2  text-white bg-gray-600 rounded-full border-4 border-[#14213d] cursor-pointer hover:scale-x-150 hover:scale-y-150 transition-all ease-in">
          <MdModeEdit />
        </button>
      </div>
      <div className="flex flex-col gap-5 md:flex-row  md:gap-20 md:text-lg">
        <div>
          <p>
            <span className="font-bold">Name:</span> {teacher.name}
          </p>
          <p>
            <span className="font-bold">Role:</span> {teacher.role}
          </p>
          <p>
            <span className="font-bold">DOB:</span> {teacher.birthDate}
          </p>
          <p>
            <span className="font-bold">Address:</span> {teacher.address}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Email:</span> {teacher.email}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {teacher.phone}
          </p>
          <button className="flex  justify-center items-center gap-2 bg-white text-black text-lg px-5 py-2 rounded-lg cursor-pointer mt-2">
            Edit <MdModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
