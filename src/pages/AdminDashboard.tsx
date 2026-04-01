import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getPendingReservations, approveReservation, rejectReservation,
  createExam, getRooms, approveDocument, rejectDocument,
} from "@/lib/api";
import { toast } from "sonner";
import { ShieldCheck, CalendarCheck, PlusCircle, FileCheck, Loader2, Check, XCircle } from "lucide-react";

const AdminDashboard = () => {
  const [pendingRes, setPendingRes] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Exam form
  const [examForm, setExamForm] = useState({
    subject: "", room_id: "", date: "", time: "", student_id: "", table_number: "",
  });
  const [examSubmitting, setExamSubmitting] = useState(false);

  // Document management
  const [docId, setDocId] = useState("");
  const [docActionLoading, setDocActionLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPendingReservations(), getRooms()])
      .then(([res, r]) => { setPendingRes(res); setRooms(r); })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const handleResAction = async (id: number, action: "approve" | "reject") => {
    setActionLoading(id);
    try {
      action === "approve" ? await approveReservation(id) : await rejectReservation(id);
      toast.success(`Reservation ${action}d`);
      setPendingRes((prev) => prev.filter((r) => r.id !== id));
    } catch {
      toast.error(`Failed to ${action} reservation`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setExamSubmitting(true);
    try {
      await createExam({
        subject: examForm.subject,
        room_id: parseInt(examForm.room_id),
        date: examForm.date,
        time: examForm.time + ":00",
        student_id: parseInt(examForm.student_id),
        table_number: parseInt(examForm.table_number),
      });
      toast.success("Exam seating created!");
      setExamForm({ subject: "", room_id: "", date: "", time: "", student_id: "", table_number: "" });
    } catch {
      toast.error("Failed to create exam");
    } finally {
      setExamSubmitting(false);
    }
  };

  const handleDocAction = async (action: "approve" | "reject") => {
    const id = parseInt(docId);
    if (isNaN(id)) { toast.error("Enter a valid document ID"); return; }
    setDocActionLoading(true);
    try {
      action === "approve" ? await approveDocument(id) : await rejectDocument(id);
      toast.success(`Document ${action}d`);
      setDocId("");
    } catch {
      toast.error(`Failed to ${action} document`);
    } finally {
      setDocActionLoading(false);
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Reservations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" /> Pending Reservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : pendingRes.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No pending reservations.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">ID</th>
                      <th className="text-left p-2 font-medium">Room</th>
                      <th className="text-left p-2 font-medium">User</th>
                      <th className="text-left p-2 font-medium">Date</th>
                      <th className="text-left p-2 font-medium">Time</th>
                      <th className="text-left p-2 font-medium">Purpose</th>
                      <th className="text-left p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRes.map((r: any) => (
                      <tr key={r.id} className="border-b">
                        <td className="p-2">{r.id}</td>
                        <td className="p-2">{r.room_id}</td>
                        <td className="p-2">{r.user_id}</td>
                        <td className="p-2">{r.date}</td>
                        <td className="p-2">{r.start_time} - {r.end_time}</td>
                        <td className="p-2">{r.purpose}</td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() => handleResAction(r.id, "approve")}
                              disabled={actionLoading === r.id}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleResAction(r.id, "reject")}
                              disabled={actionLoading === r.id}
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Exam Seating */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" /> Create Exam Seating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExam} className="space-y-3">
              <div className="space-y-1">
                <Label>Subject</Label>
                <Input value={examForm.subject} onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })} required placeholder="e.g. Mathematics" />
              </div>
              <div className="space-y-1">
                <Label>Room</Label>
                <select
                  value={examForm.room_id}
                  onChange={(e) => setExamForm({ ...examForm, room_id: e.target.value })}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select room</option>
                  {rooms.map((room: any) => (
                    <option key={room.id} value={room.id}>{room.name || `Room ${room.id}`}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Date</Label>
                  <Input type="date" value={examForm.date} onChange={(e) => setExamForm({ ...examForm, date: e.target.value })} required />
                </div>
                <div className="space-y-1">
                  <Label>Time</Label>
                  <Input type="time" value={examForm.time} onChange={(e) => setExamForm({ ...examForm, time: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Student ID</Label>
                  <Input type="number" value={examForm.student_id} onChange={(e) => setExamForm({ ...examForm, student_id: e.target.value })} required />
                </div>
                <div className="space-y-1">
                  <Label>Table Number</Label>
                  <Input type="number" value={examForm.table_number} onChange={(e) => setExamForm({ ...examForm, table_number: e.target.value })} required />
                </div>
              </div>
              <Button type="submit" disabled={examSubmitting} className="w-full">
                {examSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                Create Exam Seating
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" /> Document Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Document ID</Label>
                <Input
                  type="number"
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  placeholder="Enter document request ID"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleDocAction("approve")} disabled={docActionLoading || !docId}>
                  <Check className="h-4 w-4 mr-1" /> Approve
                </Button>
                <Button variant="destructive" onClick={() => handleDocAction("reject")} disabled={docActionLoading || !docId}>
                  <XCircle className="h-4 w-4 mr-1" /> Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
