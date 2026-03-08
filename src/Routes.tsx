import { createBrowserRouter, Outlet } from "react-router";
import {
  AdminDashboard,
  AdminDocuments,
  AdminExams,
  AdminIncidents,
  AdminReservations,
} from "@/pages/Admin";
import Home from "@/pages/Home";
import { ProfessorDashboard, ProfessorSchedule } from "@/pages/Professor";
import {
  StudentDashboard,
  StudentDocuments,
  StudentExams,
  StudentIncidents,
  StudentRooms,
} from "@/pages/Student";
import Navbar from "@/ui/Navbar";
import ErrorElement from "./ErrorElement";
import { AdminLayout, ProfessorLayout, StudentLayout } from "./Layouts";

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
]);
