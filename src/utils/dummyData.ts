import { Teacher } from "@/types";

export const dummyTeacher: Teacher = {
  id: "1",
  name: "Jonathan Blake",
  role: "Senior Music Instructor",
  birthDate: "1985-09-22",
  email: "jonathan.blake@harmonymusic.com",
  phone: "647-321-7789",
  address: "102 Willow Creek Blvd, Mississauga, Ontario, Canada",

  privateQualification: [
    { name: "Advanced Piano", rate: 35 },
    { name: "Jazz Improvisation", rate: 32 },
    { name: "Vocal Coaching", rate: 30 },
  ],

  groupQualification: [
    { name: "Band Ensemble", rate: 27 },
    { name: "Choir Direction", rate: 26 },
  ],

  schedule: [
    {
      date: "2025-07-08",
      fromTime: "11:00",
      toTime: "12:00",
    },
    {
      date: "2025-07-09",
      fromTime: "14:00",
      toTime: "14:30",
    },
    {
      date: "2025-07-11",
      fromTime: "16:00",
      toTime: "17:00",
    },
    {
      date: "2025-07-13",
      fromTime: "10:30",
      toTime: "11:15",
    },
  ],
};
