import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStudentExams, createDocument } from "@/lib/api";
import { toast } from "sonner";
import { BookOpen, FileText, Loader2 } from "lucide-react";

const DOCUMENT_TYPES = ["Attestation de scolarité", "Relevé de notes", "Convention de stage", "Attestation de réussite"];

const StudentDashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [docType, setDocType] = useState(DOCUMENT_TYPES[0]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getStudentExams(user.userId)
      .then(setExams)
      .catch(() => toast.error("Failed to load exams"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDocRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await createDocument({ student_id: user.userId, document_type: docType });
      toast.success("Document request submitted!");
    } catch {
      toast.error("Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6 md:grid-cols-2">
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
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
