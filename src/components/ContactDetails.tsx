import React from "react";
import { MdModeEdit, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

interface PageProps {
  email: string;
  phone: string;
}

const ContactDetails = ({ email, phone }: PageProps) => {
  return (
    <div className="p-2 border-[1px] rounded-lg overflow-hidden md:flex-1 lg:flex-1">
      <h3 className="text-xl flex justify-between mb-4 relative">
        Contact Details:{" "}
        <span className="absolute top-[-15px] right-[-15px] flex justify-center items-center text-black bg-white w-10 h-10 rounded-full">
          <MdModeEdit />
        </span>
      </h3>
      <p className="flex items-center gap-2 text-md">
        <span className="text-gray-500 text-2xl mb-2">
          <MdOutlineEmail />
        </span>
        {email}
      </p>
      <p className="flex items-center gap-2 text-md">
        <span className="text-gray-500 text-2xl mb-2">
          <MdOutlinePhone />
        </span>
        {phone}
      </p>
    </div>
  );
};

export default ContactDetails;
