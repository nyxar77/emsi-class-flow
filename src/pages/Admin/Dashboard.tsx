import { Badge, Card, SectionHeader, StatCard } from "@/components/layout/Shared";
import { IcAlert, IcDoc, IcDoor, IcGrid } from "../Icons";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#4c4f69] dark:text-[#cdd6f4]">Tableau de bord</h1>
        <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">
          Vue d'ensemble — EMSI Campus ·{" "}
          {new Date().toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Réservations en attente" value="3" icon={<IcDoor />} variant="yellow" />
        <StatCard label="Documents à traiter" value="2" icon={<IcDoc />} variant="green" />
        <StatCard label="Incidents ouverts" value="5" icon={<IcAlert />} variant="red" />
        <StatCard
          label="Salles occupées"
          value="12"
          icon={<IcGrid />}
          variant="mauve"
          trend="sur 18 disponibles"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Dernières demandes" subtitle="Réservations & documents récents" />
          <div className="space-y-2">
            {[
              {
                who: "Yassine B.",
                action: "Réservation Salle C-302",
                time: "il y a 5 min",
                type: "pending" as const,
              },
              {
                who: "Club IA",
                action: "Réservation Amphi 1",
                time: "il y a 18 min",
                type: "pending" as const,
              },
              {
                who: "Sara L.",
                action: "Attestation de scolarité",
                time: "il y a 1h",
                type: "doc" as const,
              },
              {
                who: "Dr. Alami",
                action: "Réservation Salle B-204",
                time: "il y a 2h",
                type: "approved" as const,
              },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#8839ef] dark:bg-[#cba6f7] flex items-center justify-center shrink-0">
                    <span className="text-white dark:text-[#11111b] text-xs font-bold">
                      {a.who.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                      {a.who}
                    </p>
                    <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">{a.action}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge
                    variant={a.type === "pending" ? "yellow" : a.type === "doc" ? "blue" : "green"}
                  >
                    {a.type === "pending" ? "En attente" : a.type === "doc" ? "Document" : "Validé"}
                  </Badge>
                  <p className="text-[10px] text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Incidents ouverts" />
          <div className="space-y-2">
            {[
              {
                id: "#INC-048",
                room: "B-204",
                type: "Projecteur HS",
                by: "Dr. Alami",
                status: "open" as const,
              },
              {
                id: "#INC-047",
                room: "Amphi 2",
                type: "Climatisation",
                by: "Étudiant",
                status: "in_progress" as const,
              },
              {
                id: "#INC-046",
                room: "TP-3",
                type: "Réseau WiFi",
                by: "Dr. Bennani",
                status: "in_progress" as const,
              },
              {
                id: "#INC-045",
                room: "A-101",
                type: "Tableau interactif",
                by: "Dr. Alami",
                status: "open" as const,
              },
            ].map((inc) => (
              <div
                key={inc.id}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]"
              >
                <div>
                  <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                    {inc.type}
                  </p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    {inc.room} · {inc.by}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant={inc.status === "open" ? "red" : "yellow"}>
                    {inc.status === "open" ? "Ouvert" : "En cours"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
