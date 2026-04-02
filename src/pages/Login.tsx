import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, User, BookOpen, Shield } from "lucide-react";

const roles: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "student", label: "Student", icon: <BookOpen className="h-5 w-5" />, desc: "Access exams & documents" },
  { value: "professor", label: "Professor", icon: <User className="h-5 w-5" />, desc: "Book rooms & support" },
  { value: "admin", label: "Admin", icon: <Shield className="h-5 w-5" />, desc: "Manage everything" },
];

const Login = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(userId);
    if (isNaN(id) || id <= 0) return;
    login(id, role);
    const paths: Record<UserRole, string> = { admin: "/admin", professor: "/professor", student: "/student" };
    navigate(paths[role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">EMSI ClassFlow</h1>
          <p className="text-muted-foreground mt-1">Sign in to your portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>Enter your ID and select your role</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="number"
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  min={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Access Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-sm ${
                        role === r.value
                          ? "border-primary bg-secondary text-secondary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {r.icon}
                      <span className="font-medium">{r.label}</span>
                      <span className="text-[10px] leading-tight text-center">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
