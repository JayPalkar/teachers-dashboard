import { Teacher } from "@/types";
import defaultAvatar from "../../public/userAvatar/userAvatar.webp";

export const dummyTeachers: Teacher[] = [
  {
    id: "1",
    name: "Jonathan Blake",
    role: "Senior Music Instructor",
    profileImage: defaultAvatar,
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
      { date: "2025-07-08", fromTime: "11:00", toTime: "12:00" },
      { date: "2025-07-09", fromTime: "14:00", toTime: "14:30" },
      { date: "2025-07-11", fromTime: "16:00", toTime: "17:00" },
      { date: "2025-07-13", fromTime: "10:30", toTime: "11:15" },
      { date: "2025-07-14", fromTime: "10:30", toTime: "12:30" },
    ],
  },
  {
    id: "2",
    name: "Amelia Carter",
    role: "Vocal Coach",
    profileImage: defaultAvatar,
    birthDate: "1990-03-15",
    email: "amelia.carter@harmonymusic.com",
    phone: "647-555-1234",
    address: "210 Lakeshore Rd, Toronto, Ontario, Canada",
    privateQualification: [
      { name: "Classical Voice", rate: 38 },
      { name: "Opera Training", rate: 40 },
    ],
    groupQualification: [{ name: "Choir Practice", rate: 28 }],
    schedule: [
      { date: "2025-07-08", fromTime: "15:00", toTime: "16:00" },
      { date: "2025-07-10", fromTime: "12:00", toTime: "13:00" },
      { date: "2025-07-12", fromTime: "10:00", toTime: "11:00" },
    ],
  },
  {
    id: "3",
    name: "Liam Chen",
    role: "Drums Instructor",
    profileImage: defaultAvatar,
    birthDate: "1988-07-19",
    email: "liam.chen@harmonymusic.com",
    phone: "416-777-2222",
    address: "98 Maple Lane, Brampton, Ontario, Canada",
    privateQualification: [
      { name: "Rock Drumming", rate: 34 },
      { name: "Jazz Drumming", rate: 36 },
    ],
    groupQualification: [{ name: "Percussion Ensemble", rate: 29 }],
    schedule: [
      { date: "2025-07-09", fromTime: "11:00", toTime: "12:00" },
      { date: "2025-07-11", fromTime: "13:00", toTime: "14:00" },
      { date: "2025-07-14", fromTime: "10:00", toTime: "11:30" },
    ],
  },
  {
    id: "4",
    name: "Sophia Kim",
    role: "Violin Instructor",
    profileImage: defaultAvatar,
    birthDate: "1992-11-03",
    email: "sophia.kim@harmonymusic.com",
    phone: "289-999-1111",
    address: "55 Forest Drive, Markham, Ontario, Canada",
    privateQualification: [
      { name: "Baroque Violin", rate: 37 },
      { name: "Contemporary Violin", rate: 35 },
    ],
    groupQualification: [{ name: "String Quartet", rate: 30 }],
    schedule: [
      { date: "2025-07-08", fromTime: "09:00", toTime: "10:00" },
      { date: "2025-07-10", fromTime: "15:30", toTime: "16:30" },
    ],
  },
  {
    id: "5",
    name: "Noah Singh",
    role: "Guitar Coach",
    profileImage: defaultAvatar,
    birthDate: "1983-05-27",
    email: "noah.singh@harmonymusic.com",
    phone: "905-456-7890",
    address: "78 Music Street, Oakville, Ontario, Canada",
    privateQualification: [
      { name: "Electric Guitar", rate: 33 },
      { name: "Fingerstyle Acoustic", rate: 36 },
    ],
    groupQualification: [{ name: "Guitar Ensemble", rate: 30 }],
    schedule: [
      { date: "2025-07-09", fromTime: "10:00", toTime: "11:00" },
      { date: "2025-07-13", fromTime: "13:00", toTime: "14:00" },
      { date: "2025-07-14", fromTime: "16:00", toTime: "17:00" },
    ],
  },
];
