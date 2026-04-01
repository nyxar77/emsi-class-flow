import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRooms, createReservation, getReservations, sendChatMessage } from "@/lib/api";
import { toast } from "sonner";
import { DoorOpen, CalendarPlus, Clock, Loader2, MessageCircle, Send, X } from "lucide-react";

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

const ProfessorDashboard = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resLoading, setResLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  // Reservation form
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Chatbot
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const loadReservations = async (filter?: string) => {
    if (!user) return;
    setResLoading(true);
    try {
      const status = filter !== undefined ? filter : statusFilter;
      const res = await getReservations(user.userId, status || undefined);
      setReservations(res);
    } catch {
      toast.error("Failed to load reservations");
    } finally {
      setResLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([getRooms(), getReservations(user.userId)])
      .then(([r, res]) => { setRooms(r); setReservations(res); })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    loadReservations(value);
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
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
      loadReservations();
    } catch {
      toast.error("Failed to create reservation");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !user) return;
    const msg = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const reply = await sendChatMessage(String(user.userId), msg);
      setChatMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <DashboardLayout title="Professor Dashboard">
      <div className="grid gap-6 lg:grid-cols-2">
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
            ) : rooms.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No rooms available.</p>
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

        {/* Create Reservation */}
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
                <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} required placeholder="e.g. Lecture, Lab session" />
              </div>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                Submit Reservation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Reservations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> My Reservations
              </CardTitle>
              <div className="flex gap-1">
                {STATUS_FILTERS.map((f) => (
                  <Button
                    key={f.value}
                    variant={statusFilter === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange(f.value)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading || resLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : reservations.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No reservations found.</p>
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

      {/* Chatbot FAB */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-50"
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[60vh] flex flex-col rounded-xl border bg-card shadow-2xl z-50 animate-fade-in">
          <div className="bg-primary rounded-t-xl px-4 py-3">
            <p className="text-primary-foreground font-heading font-semibold text-sm">IT Support Chat</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px]">
            {chatMessages.length === 0 && (
              <p className="text-muted-foreground text-xs text-center py-4">Ask anything about IT support...</p>
            )}
            {chatMessages.map((m, i) => (
              <div key={i} className={`text-sm p-2 rounded-lg max-w-[85%] ${
                m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>
                {m.text}
              </div>
            ))}
            {chatLoading && <div className="text-xs text-muted-foreground">Typing...</div>}
          </div>
          <form onSubmit={handleChat} className="flex gap-2 p-3 border-t">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="text-sm"
            />
            <Button type="submit" size="icon" disabled={chatLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfessorDashboard;
