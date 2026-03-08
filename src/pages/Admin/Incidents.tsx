import { useState } from "react";
import { Badge, Card, SectionHeader } from "@/components/layout/Shared";

export function Incidents() {
  const [items, setItems] = useState([
    {
      id: "#INC-048",
      room: "B-204",
      type: "Projecteur HS",
      by: "Dr. Alami",
      desc: "Le projecteur ne s'allume plus depuis ce matin.",
      status: "open" as const,
      date: "14 Jan",
    },
    {
      id: "#INC-047",
      room: "Amphi 2",
      type: "Climatisation",
      by: "Étudiant",
      desc: "La climatisation ne fonctionne pas, il fait très chaud.",
      status: "in_progress" as const,
      date: "13 Jan",
    },
    {
      id: "#INC-046",
      room: "TP-3",
      type: "Réseau WiFi",
      by: "Dr. Bennani",
      desc: "Pas de connexion WiFi dans toute la salle TP-3.",
      status: "in_progress" as const,
      date: "13 Jan",
    },
    {
      id: "#INC-045",
      room: "A-101",
      type: "Tableau interactif",
      by: "Dr. Alami",
      desc: "Le tableau interactif ne répond plus aux commandes.",
      status: "open" as const,
      date: "12 Jan",
    },
    {
      id: "#INC-044",
      room: "B-201",
      type: "Éclairage",
      by: "Étudiant",
      desc: "La moitié des lumières sont grillées.",
      status: "resolved" as const,
      date: "10 Jan",
    },
  ]);

  function updateInc(id: string, s: "in_progress" | "resolved") {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: s } : i)));
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Incidents techniques"
        subtitle="Suivez et gérez tous les incidents signalés."
      />

      <div className="flex gap-3 flex-wrap text-xs font-semibold text-[#9ca0b0] dark:text-[#6c7086]">
        {[
          {
            label: "Ouverts",
            count: items.filter((i) => i.status === "open").length,
            color: "text-[#d20f39] dark:text-[#f38ba8]",
          },
          {
            label: "En cours",
            count: items.filter((i) => i.status === "in_progress").length,
            color: "text-[#df8e1d] dark:text-[#f9e2af]",
          },
          {
            label: "Résolus",
            count: items.filter((i) => i.status === "resolved").length,
            color: "text-[#40a02b] dark:text-[#a6e3a1]",
          },
        ].map((s) => (
          <span
            key={s.label}
            className="px-3 py-1.5 rounded-xl bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244]"
          >
            <span className={s.color}>{s.count}</span> {s.label}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((inc) => (
          <Card key={inc.id}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#9ca0b0] dark:text-[#6c7086]">
                    {inc.id}
                  </span>
                  <Badge
                    variant={
                      inc.status === "open"
                        ? "red"
                        : inc.status === "in_progress"
                          ? "yellow"
                          : "green"
                    }
                  >
                    {inc.status === "open"
                      ? "Ouvert"
                      : inc.status === "in_progress"
                        ? "En cours"
                        : "Résolu"}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-[#4c4f69] dark:text-[#cdd6f4]">{inc.type}</p>
                <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086] mb-1">
                  {inc.room} · Signalé par {inc.by} · {inc.date}
                </p>
                <p className="text-sm text-[#5c5f77] dark:text-[#a6adc8]">{inc.desc}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {inc.status === "open" && (
                  <button
                    onClick={() => updateInc(inc.id, "in_progress")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#df8e1d1a] text-[#df8e1d] dark:bg-[#f9e2af1a] dark:text-[#f9e2af] border border-[#df8e1d33] dark:border-[#f9e2af33] hover:bg-[#df8e1d22] dark:hover:bg-[#f9e2af22] transition-colors"
                  >
                    Assigner
                  </button>
                )}
                {inc.status === "in_progress" && (
                  <button
                    onClick={() => updateInc(inc.id, "resolved")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#40a02b] dark:bg-[#a6e3a1] text-white dark:text-[#11111b] hover:brightness-90 transition-all"
                  >
                    Résolu
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
