const BASE_URL = "https://emsiclassflowbackend.onrender.com";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  return res.json();
}

// Rooms
export const getRooms = () => request<any[]>("/rooms");

// Reservations
export const createReservation = (data: {
  room_id: number; user_id: number; date: string; start_time: string; end_time: string; purpose: string;
}) => request<any>("/reservations", { method: "POST", body: JSON.stringify(data) });

export const getReservations = (userId: number, status?: string) =>
  request<any[]>(`/reservations?user_id=${userId}${status ? `&status=${status}` : ""}`);

// Admin reservations
export const getPendingReservations = () => request<any[]>("/admin/reservations/pending");
export const approveReservation = (id: number) =>
  request<any>(`/admin/reservations/${id}/approve`, { method: "PUT" });
export const rejectReservation = (id: number) =>
  request<any>(`/admin/reservations/${id}/reject`, { method: "PUT" });

// Exams
export const getStudentExams = (studentId: number) => request<any[]>(`/exams/student/${studentId}`);
export const createExam = (data: {
  subject: string; room_id: number; date: string; time: string; student_id: number; table_number: number;
}) => request<any>("/exams", { method: "POST", body: JSON.stringify(data) });

// Documents
export const createDocument = (data: { student_id: number; document_type: string }) =>
  request<any>("/documents", { method: "POST", body: JSON.stringify(data) });
export const getStudentDocuments = (studentId: number) =>
  request<any[]>(`/documents?student_id=${studentId}`);
export const getPendingDocuments = () => request<any[]>("/documents/pending");
export const approveDocument = (id: number) =>
  request<any>(`/documents/${id}/approve`, { method: "PUT" });
export const rejectDocument = (id: number) =>
  request<any>(`/documents/${id}/reject`, { method: "PUT" });

// Chatbot
export const sendChatMessage = async (sessionId: string, message: string) => {
  const res = await fetch("https://othy123.app.n8n.cloud/webhook-test/it-support-chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, message }),
  });
  return res.text();
};
