import { Outlet, useLocation, useNavigate } from "react-router";
import { SidebarLayout } from "./components/ui/Sidebar";

function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.split("/")[2] || "dashboard";

  return (
    <SidebarLayout
      role="student"
      userName="Abderrahmane"
      userClass="GI2"
      activeSection={section}
      onNavigate={(id) => navigate(`/student/${id}`)}
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

  const section = location.pathname.split("/")[2] || "dashboard";

  return (
    <SidebarLayout
      role="professor"
      userName="Abderrahmane"
      userClass="GI2"
      activeSection={section}
      onNavigate={(id) => navigate(`/prof/${id}`)}
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

  const section = location.pathname.split("/")[2] || "dashboard";

  return (
    <SidebarLayout
      role="admin"
      userName="Abderrahmane"
      userClass="GI2"
      activeSection={section}
      onNavigate={(id) => navigate(`/admin/${id}`)}
      darkMode={true}
      onToggleDark={() => {}}
    >
      <Outlet />
    </SidebarLayout>
  );
}

export { ProfessorLayout, StudentLayout, AdminLayout };
