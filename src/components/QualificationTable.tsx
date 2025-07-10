import { Qualification } from "@/types";
import React from "react";

interface QualificationTableProps {
  qualifications: Qualification[];
}

const QualificationTable: React.FC<QualificationTableProps> = ({
  qualifications,
}) => {
  return (
    <table className="table-fixed w-full text-left ">
      <thead>
        <tr>
          <th className="p-2 border-b">Name</th>
          <th className="p-2 border-b">Rate ( {`$/hr`} )</th>
        </tr>
      </thead>
      <tbody>
        {qualifications.map((qualification: Qualification, index: number) => (
          <tr key={index} className="border-t">
            <td className="p-2">{qualification.name}</td>
            <td className="p-2">{qualification.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QualificationTable;
