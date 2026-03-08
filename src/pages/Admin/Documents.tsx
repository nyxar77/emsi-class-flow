import { useState } from "react";
import { Badge, Card, SectionHeader } from "@/components/layout/Shared";

export function Documents() {
  const [items, setItems] = useState([
    {
      id: "#DOC-022",
      student: "Yassine B.",
      type: "Attestation de scolarité",
      date: "13 Jan",
      status: "pending" as const,
    },
    {
      id: "#DOC-021",
      student: "Sara L.",
      type: "Relevé de notes S5",
      date: "13 Jan",
      status: "pending" as const,
    },
    {
      id: "#DOC-020",
      student: "Omar T.",
      type: "Certificat d'inscription",
      date: "10 Jan",
      status: "ready" as const,
    },
    {
      id: "#DOC-019",
      student: "Amine K.",
      type: "Attestation de réussite",
      date: "9 Jan",
      status: "delivered" as const,
    },
  ]);

  function updateDoc(id: string, s: "ready" | "delivered") {
    setItems((prev) => prev.map((d) => (d.id === id ? { ...d, status: s } : d)));
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Demandes de documents" subtitle="Traitez les demandes en attente." />

      <div className="space-y-3">
        {items.map((d) => (
          <Card key={d.id}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#9ca0b0] dark:text-[#6c7086]">
                    {d.id}
                  </span>
                  <Badge
                    variant={
                      d.status === "pending" ? "yellow" : d.status === "ready" ? "green" : "teal"
                    }
                  >
                    {d.status === "pending"
                      ? "En attente"
                      : d.status === "ready"
                        ? "Prêt"
                        : "Remis"}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-[#4c4f69] dark:text-[#cdd6f4]">{d.student}</p>
                <p className="text-sm text-[#5c5f77] dark:text-[#a6adc8]">{d.type}</p>
                <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">{d.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {d.status === "pending" && (
                  <button
                    onClick={() => updateDoc(d.id, "ready")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#40a02b] dark:bg-[#a6e3a1] text-white dark:text-[#11111b] hover:brightness-90 transition-all"
                  >
                    Marquer prêt
                  </button>
                )}
                {d.status === "ready" && (
                  <button
                    onClick={() => updateDoc(d.id, "delivered")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1e66f5] dark:bg-[#89b4fa] text-white dark:text-[#11111b] hover:brightness-90 transition-all"
                  >
                    Remis
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
