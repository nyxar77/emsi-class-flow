import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStudentExams, createDocument, getRooms, createReservation, getReservations, getStudentDocuments } from "@/lib/api";
import { toast } from "sonner";
import { BookOpen, FileText, Loader2, CalendarPlus, Clock, DoorOpen } from "lucide-react";

const DOCUMENT_TYPES = ["Attestation de scolarité", "Relevé de notes", "Convention de stage", "Attestation de réussite"];

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [docType, setDocType] = useState(DOCUMENT_TYPES[0]);
  const [submitting, setSubmitting] = useState(false);

  // Reservation form
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [resSubmitting, setResSubmitting] = useState(false);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [ex, docs, res, rm] = await Promise.all([
        getStudentExams(user.userId),
        getStudentDocuments(user.userId).catch(() => []),
        getReservations(user.userId).catch(() => []),
        getRooms(),
      ]);
      setExams(ex);
      setDocuments(docs);
      setReservations(res);
      setRooms(rm);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user]);

  const handleDocRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await createDocument({ student_id: user.userId, document_type: docType });
      toast.success("Document request submitted!");
      const docs = await getStudentDocuments(user.userId).catch(() => []);
      setDocuments(docs);
    } catch {
      toast.error("Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setResSubmitting(true);
    try {
      await createReservation({
        room_id: parseInt(roomId),
        user_id: user.userId,
        date,
        start_time: startTime + ":00",
        end_time: endTime + ":00",
        purpose,
      });
      toast.success("Reservation submitted!");
      setRoomId(""); setDate(""); setStartTime(""); setEndTime(""); setPurpose("");
      const res = await getReservations(user.userId).catch(() => []);
      setReservations(res);
    } catch {
      toast.error("Failed to create reservation");
    } finally {
      setResSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> My Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : exams.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">No exams scheduled yet.</p>
            ) : (
              <div className="space-y-3">
                {exams.map((exam: any, i: number) => (
                  <div key={i} className="rounded-lg border bg-muted/50 p-3">
                    <p className="font-semibold text-sm">{exam.subject}</p>
                    <div className="text-xs text-muted-foreground mt-1 grid grid-cols-2 gap-1">
                      <span>📅 {exam.date}</span>
                      <span>🕐 {exam.time}</span>
                      <span>🏫 Room {exam.room_id}</span>
                      <span>💺 Table {exam.table_number}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Request Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDocRequest} className="space-y-4">
              <div className="space-y-2">
                <Label>Document Type</Label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {DOCUMENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Documents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> My Document Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : documents.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No document requests yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">ID</th>
                      <th className="text-left p-2 font-medium">Type</th>
                      <th className="text-left p-2 font-medium">Status</th>
                      <th className="text-left p-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((d: any) => (
                      <tr key={d.id} className="border-b">
                        <td className="p-2">{d.id}</td>
                        <td className="p-2">{d.document_type}</td>
                        <td className="p-2">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(d.status)}`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="p-2">{d.created_at?.split("T")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Rooms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DoorOpen className="h-5 w-5 text-primary" /> Available Rooms
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {rooms.map((room: any) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setRoomId(String(room.id))}
                    className={`rounded-lg border p-3 text-center text-sm transition-all ${
                      roomId === String(room.id)
                        ? "border-primary bg-secondary text-secondary-foreground"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">{room.name || `Room ${room.id}`}</p>
                    {room.capacity && <p className="text-xs text-muted-foreground">{room.capacity} seats</p>}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Book a Room */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5 text-primary" /> Book a Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReserve} className="space-y-3">
              <div className="space-y-1">
                <Label>Room</Label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select room</option>
                  {rooms.map((room: any) => (
                    <option key={room.id} value={room.id}>{room.name || `Room ${room.id}`}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label>Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Start Time</Label>
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>End Time</Label>
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Purpose</Label>
                <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} required placeholder="e.g. Study session" />
              </div>
              <Button type="submit" disabled={resSubmitting} className="w-full">
                {resSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                Submit Reservation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Reservations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> My Reservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : reservations.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No reservations yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">Room</th>
                      <th className="text-left p-2 font-medium">Date</th>
                      <th className="text-left p-2 font-medium">Time</th>
                      <th className="text-left p-2 font-medium">Purpose</th>
                      <th className="text-left p-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{r.room_id}</td>
                        <td className="p-2">{r.date}</td>
                        <td className="p-2">{r.start_time} - {r.end_time}</td>
                        <td className="p-2">{r.purpose}</td>
                        <td className="p-2">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(r.status)}`}>
                            {r.status || "pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
