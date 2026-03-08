import { useState } from "react";
import { Badge, Card, EmptyState, SectionHeader } from "@/components/layout/Shared";
import { InfoRow } from "@/components/layout/Table";
import { IcBook, IcClock, IcDoor, IcFloor, IcTable } from "../Icons";

export function Exams() {
  const [search, setSearch] = useState("");

  const exams = [
    {
      sub: "Algorithmique Avancée",
      room: "Salle B-204",
      table: 12,
      date: "15 Jan 2025",
      time: "09:00 – 11:00",
      floor: "2ème étage",
      status: "Confirmé",
    },
    {
      sub: "Base de Données",
      room: "Amphi 1",
      table: 34,
      date: "17 Jan 2025",
      time: "14:00 – 16:00",
      floor: "RDC",
      status: "Confirmé",
    },
    {
      sub: "Réseaux & Protocoles",
      room: "Salle A-101",
      table: 7,
      date: "20 Jan 2025",
      time: "09:00 – 11:00",
      floor: "1er étage",
      status: "Confirmé",
    },
  ].filter(
    (e) =>
      !search ||
      e.sub.toLowerCase().includes(search.toLowerCase()) ||
      e.room.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Salles d'examen"
        subtitle="Consultez votre salle et numéro de table pour chaque examen."
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par matière ou salle…"
        className="w-full max-w-sm px-3.5 py-2.5 rounded-xl text-sm bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244] text-[#4c4f69] dark:text-[#cdd6f4] placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086] focus:outline-none focus:border-[#8839ef] dark:focus:border-[#cba6f7] focus:ring-2 focus:ring-[#8839ef33] dark:focus:ring-[#cba6f733] transition-all"
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {exams.map((ex, i) => (
          <Card key={i} hover>
            <div className="flex items-start justify-between mb-3">
              <Badge variant="green">Confirmé</Badge>
              <span className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">{ex.date}</span>
            </div>
            <h3 className="text-base font-bold text-[#4c4f69] dark:text-[#cdd6f4] mb-4 leading-snug">
              {ex.sub}
            </h3>

            <div className="space-y-2.5">
              <InfoRow icon={<IcDoor />} label="Salle" value={ex.room} accent="blue" />
              <InfoRow icon={<IcFloor />} label="Localisation" value={ex.floor} accent="teal" />
              <InfoRow
                icon={<IcTable />}
                label="Numéro de table"
                value={`#${ex.table}`}
                accent="mauve"
              />
              <InfoRow icon={<IcClock />} label="Horaire" value={ex.time} accent="yellow" />
            </div>
          </Card>
        ))}
        {exams.length === 0 && (
          <div className="col-span-3">
            <EmptyState
              icon={<IcBook size={40} />}
              title="Aucun examen trouvé"
              description="Aucun examen ne correspond à votre recherche."
            />
          </div>
        )}
      </div>
    </div>
  );
}
