import { createBrowserRouter, Outlet } from "react-router";
import Home from "@/pages/Home";
import Navbar from "@/ui/Navbar";
import ErrorElement from "./ErrorElement";
import {
  DashboardRouter,
  DocumentsRouter,
  ExamsRouter,
  IncidentsRouter,
  RoleLayout,
} from "./Layouts";
import { AdminReservations } from "./pages/Admin";
import { ProfessorSchedule } from "./pages/Professor";
import { StudentRooms } from "./pages/Student";

const Layout = () => (
  <div className="app">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement onGoHome={() => router.navigate("/dashboard")} />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    element: <RoleLayout />,
    children: [
      { path: "dashboard", element: <DashboardRouter /> },
      { path: "exams", element: <ExamsRouter /> },
      { path: "documents", element: <DocumentsRouter /> },
      { path: "incidents", element: <IncidentsRouter /> },
      { path: "rooms", element: <StudentRooms /> },
      { path: "schedule", element: <ProfessorSchedule /> },
      { path: "reservations", element: <AdminReservations /> },
    ],
    // errorElement: <ErrorElement onGoHome={() => router.navigate("/dashboard")} />,
  },
]);

/* export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <ErrorElement
        onGoHome={() => {
          router.navigate("/student");
        }}
      />
    ),
    children: [
      {
        index: true,
        element: <div>Hello World</div>,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          { path: "dashboard", element: <StudentDashboard /> },
          { path: "exams", element: <StudentExams /> },
          { path: "rooms", element: <StudentRooms /> },
          { path: "incidents", element: <StudentIncidents /> },
          { path: "documents", element: <StudentDocuments /> },
        ],
      },
      {
        path: "prof",
        element: <ProfessorLayout />,
        children: [
          { path: "dashboard", element: <ProfessorDashboard /> },
          { path: "schedule", element: <ProfessorSchedule /> },
        ],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "exams", element: <AdminExams /> },
          { path: "documents", element: <AdminDocuments /> },
          { path: "incidents", element: <AdminIncidents /> },
          { path: "reservations", element: <AdminReservations /> },
        ],
      },
    ],
  },
]); */
