import { Card, SectionHeader, StatCard } from "@/components/layout/Shared";
import { ReservationRow } from "@/components/layout/Table";
import { IcAlert, IcBook, IcDoc, IcDoor } from "../Icons";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#4c4f69] dark:text-[#cdd6f4]">
          Bonjour, Yassine 👋
        </h1>
        <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">
          Voici un aperçu de votre activité aujourd'hui.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Examens à venir" value="3" icon={<IcBook />} variant="blue" />
        <StatCard
          label="Réservations"
          value="1"
          icon={<IcDoor />}
          variant="mauve"
          trend="En attente de validation"
        />
        <StatCard
          label="Documents"
          value="2"
          icon={<IcDoc />}
          variant="green"
          trend="1 prêt à télécharger"
        />
        <StatCard label="Incidents signalés" value="1" icon={<IcAlert />} variant="yellow" />
      </div>

      <Card>
        <SectionHeader title="Prochains examens" subtitle="Vos 3 prochains examens planifiés" />
        <div className="space-y-2">
          {[
            {
              sub: "Algorithmique Avancée",
              room: "Salle B-204",
              table: 12,
              date: "15 Jan 2025",
              time: "09:00 – 11:00",
              color: "blue" as const,
            },
            {
              sub: "Base de Données",
              room: "Amphi 1",
              table: 34,
              date: "17 Jan 2025",
              time: "14:00 – 16:00",
              color: "mauve" as const,
            },
            {
              sub: "Réseaux & Protocoles",
              room: "Salle A-101",
              table: 7,
              date: "20 Jan 2025",
              time: "09:00 – 11:00",
              color: "teal" as const,
            },
          ].map((ex) => (
            <div
              key={ex.sub}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-1.5 h-8 rounded-full bg-[#${ex.color === "blue" ? "1e66f5" : ex.color === "mauve" ? "8839ef" : "179299"}] dark:bg-[#${ex.color === "blue" ? "89b4fa" : ex.color === "mauve" ? "cba6f7" : "94e2d5"}]`}
                />
                <div>
                  <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                    {ex.sub}
                  </p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    {ex.date} · {ex.time}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                  {ex.room}
                </p>
                <p className="text-[11px] text-[#9ca0b0] dark:text-[#6c7086]">Table #{ex.table}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Mes réservations récentes" />
        <div className="space-y-2">
          {[
            {
              room: "Salle C-302",
              purpose: "Révision groupe — BD",
              date: "14 Jan 2025",
              time: "16:00–18:00",
              status: "approved" as const,
            },
            {
              room: "Salle A-105",
              purpose: "Projet IA",
              date: "16 Jan 2025",
              time: "10:00–12:00",
              status: "pending" as const,
            },
          ].map((r) => (
            <ReservationRow key={r.purpose} {...r} />
          ))}
        </div>
      </Card>
    </div>
  );
}
