export type UserRole = "student" | "professor" | "admin" | "technician";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: string; // student
  dept?: string; // professor
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  floor: string;
  type: "cours" | "tp" | "amphi" | "reunion";
  available: boolean;
}

export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  requestedBy: string;
  role: UserRole;
  date: string;
  timeStart: string;
  timeEnd: string;
  purpose: string;
  status: "pending" | "approved" | "rejected";
}

export interface ExamSlot {
  studentId: string;
  studentName: string;
  room: string;
  tableNumber: number;
  subject: string;
  date: string;
  time: string;
}

export interface Incident {
  id: string;
  room: string;
  type: string;
  description: string;
  reportedBy: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
}

export interface DocRequest {
  id: string;
  studentId: string;
  studentName: string;
  docType: string;
  status: "pending" | "ready" | "delivered";
  requestedAt: string;
}
