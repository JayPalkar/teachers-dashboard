export interface Qualification {
  name: string;
  rate: number;
}

export interface ScheduleSlot {
  date: string;
  fromTime: string;
  toTime: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  privateQualification: Qualification[];
  groupQualification: Qualification[];
  schedule: ScheduleSlot[];
}
