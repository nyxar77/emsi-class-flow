import { Badge, Card, SectionHeader, StatCard } from "@/layout/Shared";
import { IcAlert, IcCal, IcDoor, IcPlus } from "../Icons";
export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#4c4f69] dark:text-[#cdd6f4]">
          Bonjour, Dr. Alami 👋
        </h1>
        <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">
          Département Informatique — Semestre 5
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Cours aujourd'hui" value="3" icon={<IcCal />} variant="mauve" />
        <StatCard
          label="Réservations"
          value="2"
          icon={<IcDoor />}
          variant="blue"
          trend="1 en attente"
        />
        <StatCard label="Rattrapages prévus" value="1" icon={<IcPlus />} variant="peach" />
        <StatCard label="Incidents signalés" value="2" icon={<IcAlert />} variant="yellow" />
      </div>

      <Card>
        <SectionHeader title="Emploi du temps — Aujourd'hui" subtitle="Mardi 14 Janvier 2025" />
        <div className="space-y-2">
          {[
            {
              time: "08:00 – 10:00",
              subject: "Algorithmique Avancée",
              room: "B-204",
              class: "5IIR-A",
              type: "Cours",
            },
            {
              time: "10:30 – 12:30",
              subject: "Base de Données",
              room: "Salle TP-3",
              class: "5IIR-B",
              type: "TP",
            },
            {
              time: "14:00 – 16:00",
              subject: "Algorithmique Avancée",
              room: "B-204",
              class: "5IIR-B",
              type: "Cours",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]"
            >
              <div className="text-right shrink-0 w-28">
                <p className="text-xs font-semibold text-[#9ca0b0] dark:text-[#6c7086]">{s.time}</p>
              </div>
              <div className="w-px h-8 bg-[#ccd0da] dark:bg-[#313244]" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                  {s.subject}
                </p>
                <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                  {s.class} · {s.room}
                </p>
              </div>
              <Badge variant={s.type === "TP" ? "teal" : "mauve"}>{s.type}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Mes réservations" />
        <div className="space-y-2">
          {[
            {
              room: "Salle B-204",
              purpose: "Rattrapage — Algo Avancée",
              date: "18 Jan",
              time: "09:00–11:00",
              status: "approved" as const,
            },
            {
              room: "Salle A-105",
              purpose: "Cours supplémentaire",
              date: "22 Jan",
              time: "14:00–16:00",
              status: "pending" as const,
            },
          ].map((r) => (
            <div
              key={r.purpose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]"
            >
              <div>
                <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">{r.room}</p>
                <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                  {r.purpose} · {r.date} {r.time}
                </p>
              </div>
              <Badge variant={r.status === "approved" ? "green" : "yellow"}>
                {r.status === "approved" ? "Validée" : "En attente"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
