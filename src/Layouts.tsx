import { Outlet, useLocation, useNavigate } from "react-router";
import {
  AdminDashboard,
  AdminDocuments,
  AdminExams,
  AdminIncidents,
  AdminReservations,
} from "@/pages/Admin";
import { ProfessorDashboard, ProfessorSchedule } from "@/pages/Professor";
import {
  StudentDashboard,
  StudentDocuments,
  StudentExams,
  StudentIncidents,
  StudentRooms,
} from "@/pages/Student";
import type { UserRole } from "@/types/type";
import { SidebarLayout } from "./components/ui/Sidebar";
import ErrorElement from "./ErrorElement";

const role: UserRole = "admin";
function RoleLayout() {
  if (role === "admin") return <AdminLayout />;
  if (role === "student") return <StudentLayout />;
  if (role === "professor") return <ProfessorLayout />;
  if (role === "technician") return;
}

function DashboardRouter() {
  if (role === "student") return <StudentDashboard />;
  if (role === "professor") return <ProfessorDashboard />;
  if (role === "admin") return <AdminDashboard />;

  return null;
}

function IncidentsRouter() {
  if (role === "student") return <StudentIncidents />;
  if (role === "admin") return <AdminIncidents />;

  return <ErrorElement />;
}

function ExamsRouter() {
  if (role === "student") return <StudentExams />;
  if (role === "admin") return <AdminExams />;

  return <ErrorElement />;
}

function DocumentsRouter() {
  if (role === "student") return <StudentDocuments />;
  if (role === "admin") return <AdminDocuments />;

  return <ErrorElement />;
}

function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.split("/")[1] || "dashboard";

  return (
    <SidebarLayout
      role="student"
      userName="Abderrahmane"
      userClass="GI2"
      activeSection={section}
      onNavigate={(id) => navigate(`/${id}`)}
      darkMode={true}
      onToggleDark={() => {}}
    >
      <Outlet />
    </SidebarLayout>
  );
}

function ProfessorLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.split("/")[1] || "dashboard";

  return (
    <SidebarLayout
      role="professor"
      userName="Abderrahmane"
      userClass="GI2"
      activeSection={section}
      onNavigate={(id) => navigate(`/${id}`)}
      darkMode={true}
      onToggleDark={() => {}}
    >
      <Outlet />
    </SidebarLayout>
  );
}

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.split("/")[1] || "dashboard";

  return (
    <SidebarLayout
      role="admin"
      userName="Abderrahmane"
      userClass="GI2"
      activeSection={section}
      onNavigate={(id) => navigate(`/${id}`)}
      darkMode={true}
      onToggleDark={() => {}}
    >
      <Outlet />
    </SidebarLayout>
  );
}

export {
  RoleLayout,
  DocumentsRouter,
  ExamsRouter,
  DashboardRouter,
  IncidentsRouter,
  /* ProfessorLayout,
  StudentLayout,
  AdminLayout, */
};
