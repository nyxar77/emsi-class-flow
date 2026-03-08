import { useState } from "react";
import { Badge, Card, SectionHeader } from "@/components/layout/Shared";

export function Reservations() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const all = [
    {
      id: "#RES-021",
      who: "Yassine B.",
      role: "Étudiant",
      room: "C-302",
      purpose: "Révision groupe BD",
      date: "16 Jan",
      time: "16:00–18:00",
      status: "pending" as const,
    },
    {
      id: "#RES-020",
      who: "Club IA EMSI",
      role: "Club",
      room: "Amphi 1",
      purpose: "Workshop Intelligence Artificielle",
      date: "20 Jan",
      time: "09:00–17:00",
      status: "pending" as const,
    },
    {
      id: "#RES-019",
      who: "Sara L.",
      role: "Étudiant",
      room: "A-105",
      purpose: "Projet Angular",
      date: "15 Jan",
      time: "10:00–12:00",
      status: "pending" as const,
    },
    {
      id: "#RES-018",
      who: "Dr. Alami",
      role: "Professeur",
      room: "B-204",
      purpose: "Rattrapage Algo Avancée",
      date: "18 Jan",
      time: "09:00–11:00",
      status: "approved" as const,
    },
    {
      id: "#RES-017",
      who: "Dr. Bennani",
      role: "Professeur",
      room: "TP-3",
      purpose: "Cours supplémentaire BD",
      date: "17 Jan",
      time: "14:00–16:00",
      status: "approved" as const,
    },
    {
      id: "#RES-016",
      who: "Club Robotics",
      role: "Club",
      room: "Amphi 2",
      purpose: "Conférence Robotique",
      date: "12 Jan",
      time: "14:00–18:00",
      status: "rejected" as const,
    },
  ];

  const [statuses, setStatuses] = useState<Record<string, "pending" | "approved" | "rejected">>({});

  const filtered = all.filter((r) => filter === "all" || (statuses[r.id] ?? r.status) === filter);

  function updateStatus(id: string, s: "approved" | "rejected") {
    setStatuses((prev) => ({ ...prev, [id]: s }));
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestion des réservations"
        subtitle="Validez ou refusez les demandes de réservation."
      />

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              filter === f
                ? "bg-[#8839ef] dark:bg-[#cba6f7] text-white dark:text-[#11111b] border-transparent shadow-[0_2px_10px_rgba(136,57,239,0.25)]"
                : "border-[#ccd0da] dark:border-[#313244] text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244]"
            }`}
          >
            {f === "all"
              ? "Toutes"
              : f === "pending"
                ? "En attente"
                : f === "approved"
                  ? "Validées"
                  : "Refusées"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => {
          const s = statuses[r.id] ?? r.status;
          return (
            <Card key={r.id}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#9ca0b0] dark:text-[#6c7086]">
                      {r.id}
                    </span>
                    <Badge
                      variant={
                        r.role === "Professeur" ? "mauve" : r.role === "Club" ? "peach" : "blue"
                      }
                    >
                      {r.role}
                    </Badge>
                    <Badge
                      variant={s === "approved" ? "green" : s === "pending" ? "yellow" : "red"}
                    >
                      {s === "approved" ? "Validée" : s === "pending" ? "En attente" : "Refusée"}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-[#4c4f69] dark:text-[#cdd6f4]">{r.who}</p>
                  <p className="text-sm text-[#5c5f77] dark:text-[#a6adc8]">{r.purpose}</p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086] mt-1">
                    <span className="font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                      {r.room}
                    </span>
                    {" · "}
                    {r.date} · {r.time}
                  </p>
                </div>
                {s === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => updateStatus(r.id, "rejected")}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#d20f391a] text-[#d20f39] dark:bg-[#f38ba81a] dark:text-[#f38ba8] border border-[#d20f3933] dark:border-[#f38ba833] hover:bg-[#d20f3922] dark:hover:bg-[#f38ba822] transition-colors"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "approved")}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#40a02b] dark:bg-[#a6e3a1] text-white dark:text-[#11111b] hover:brightness-90 transition-all"
                    >
                      Valider
                    </button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
