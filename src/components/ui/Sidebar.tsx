import { type ReactNode, useState } from "react";
import type { UserRole } from "@/types/type.ts";
import Button from "../layout/Button";

interface NavItem {
  icon: ReactNode;
  label: string;
  id: string;
  badge?: number;
}

interface SidebarLayoutProps {
  role: UserRole;
  userName: string;
  userClass?: string;
  activeSection: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
  darkMode: boolean;
  onToggleDark: () => void;
}

const roleColors: Record<UserRole, string> = {
  student: "bg-[#1e66f51a] text-[#1e66f5] dark:bg-[#89b4fa1a] dark:text-[#89b4fa]",
  professor: "bg-[#8839ef1a] text-[#8839ef] dark:bg-[#cba6f71a] dark:text-[#cba6f7]",
  admin: "bg-[#df8e1d1a] text-[#df8e1d] dark:bg-[#f9e2af1a] dark:text-[#f9e2af]",
  technician: "bg-[#1792991a] text-[#179299] dark:bg-[#94e2d51a] dark:text-[#94e2d5]",
};

const roleLabels: Record<UserRole, string> = {
  student: "Étudiant",
  professor: "Professeur",
  admin: "Administrateur",
  technician: "Technicien",
};

const studentNav: NavItem[] = [
  { id: "dashboard", label: "Tableau de bord", icon: <IconGrid /> },
  { id: "exams", label: "Salle d'examen", icon: <IconBook /> },
  { id: "rooms", label: "Réserver une salle", icon: <IconDoor /> },
  { id: "incidents", label: "Signaler incident", icon: <IconAlert /> },
  { id: "documents", label: "Documents admin", icon: <IconDoc />, badge: 1 },
];

const professorNav: NavItem[] = [
  { id: "dashboard", label: "Tableau de bord", icon: <IconGrid /> },
  { id: "rooms", label: "Réserver / annuler", icon: <IconDoor /> },
  { id: "schedule", label: "Mon emploi du temps", icon: <IconCal /> },
  { id: "incidents", label: "Signaler incident", icon: <IconAlert /> },
];

const adminNav: NavItem[] = [
  { id: "dashboard", label: "Tableau de bord", icon: <IconGrid /> },
  { id: "reservations", label: "Réservations", icon: <IconDoor />, badge: 3 },
  { id: "exams", label: "Affectations examen", icon: <IconBook /> },
  { id: "documents", label: "Demandes documents", icon: <IconDoc />, badge: 2 },
  { id: "incidents", label: "Incidents techniques", icon: <IconAlert />, badge: 5 },
  { id: "users", label: "Utilisateurs", icon: <IconUsers /> },
];

const navByRole: Record<UserRole, NavItem[]> = {
  student: studentNav,
  professor: professorNav,
  admin: adminNav,
  technician: [],
};

export function SidebarLayout({
  role,
  userName,
  userClass,
  activeSection,
  onNavigate,
  children,
  darkMode,
  onToggleDark,
}: SidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(
    Boolean(localStorage.getItem("sideBar-collaped")) || false,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = navByRole[role] ?? [];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-[#ccd0da] dark:border-[#313244] ${collapsed ? "justify-center" : ""}`}
      >
        <div className="w-8 h-8 rounded-xl bg-[#8839ef] dark:bg-[#cba6f7] flex items-center justify-center shrink-0">
          <span className="text-white dark:text-[#11111b] text-sm font-black">E</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-black text-[#4c4f69] dark:text-[#cdd6f4] leading-none">
              Emsi
            </p>
            <p className="text-[10px] text-[#9ca0b0] dark:text-[#6c7086] font-medium tracking-wider uppercase">
              Campus
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 group relative
                ${
                  active
                    ? "bg-[#8839ef] dark:bg-[#cba6f7] text-white dark:text-[#11111b] shadow-[0_2px_12px_0_rgba(136,57,239,0.3)] dark:shadow-[0_2px_12px_0_rgba(203,166,247,0.2)]"
                    : "text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244] hover:text-[#4c4f69] dark:hover:text-[#cdd6f4]"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className="shrink-0 w-4 h-4">{item.icon}</span>
              {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              {!collapsed && item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                  ${active ? "bg-white/25 text-white dark:bg-[#11111b]/25 dark:text-[#11111b]" : "bg-[#d20f39] text-white dark:bg-[#f38ba8] dark:text-[#11111b]"}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-[#ccd0da] dark:border-[#313244] space-y-2">
        <button
          type="button"
          onClick={onToggleDark}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244] transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <span className="shrink-0 w-4 h-4">{darkMode ? <IconSun /> : <IconMoon />}</span>
          {!collapsed && <span>{darkMode ? "Mode clair" : "Mode sombre"}</span>}
        </button>

        <button
          type="button"
          onClick={() => {
            setCollapsed(!collapsed);
            localStorage.setItem("sideBar-collaped", "true");
          }}
          className={`hidden md:flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244] transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <span className="shrink-0 w-4 h-4">
            {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
          </span>
          {!collapsed && <span>Réduire</span>}
        </button>

        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-[#ccd0da] dark:bg-[#313244] ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-7 h-7 rounded-lg bg-[#8839ef] dark:bg-[#cba6f7] flex items-center justify-center shrink-0">
            <span className="text-white dark:text-[#11111b] text-xs font-bold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#4c4f69] dark:text-[#cdd6f4] truncate">
                {userName}
              </p>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${roleColors[role]}`}
              >
                {roleLabels[role]}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#eff1f5] dark:bg-[#1e1e2e] overflow-hidden">
      <aside
        className={`hidden md:flex flex-col shrink-0 bg-[#e6e9ef] dark:bg-[#181825] 
        border-r border-[#ccd0da] dark:border-[#313244] transition-all duration-300 
        overflow-hidden  // ← add this
        ${collapsed ? "w-16" : "w-60"}`}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 w-60 flex flex-col bg-[#e6e9ef] dark:bg-[#181825] border-r border-[#ccd0da] dark:border-[#313244]">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#e6e9ef] dark:bg-[#181825] border-b border-[#ccd0da] dark:border-[#313244]">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244]"
          >
            <IconMenu />
          </button>
          <span className="text-sm font-bold text-[#4c4f69] dark:text-[#cdd6f4]">EMSI Campus</span>
          <div className="w-7" />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

function IconGrid() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconDoor() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M3 20V6a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function IconAlert() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );
}
function IconCal() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconSun() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function IconMoon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="20"
      height="20"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
