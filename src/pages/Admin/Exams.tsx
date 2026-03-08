import { Badge, Card, SectionHeader } from "@/components/layout/Shared";
import { IcCalSm, IcClockSm, IcPlus, IcUsersSm } from "../Icons";

export function Exams() {
  const exams = [
    {
      subject: "Algorithmique Avancée",
      date: "15 Jan 2025",
      time: "09:00–11:00",
      rooms: ["B-204", "B-205"],
      students: 58,
    },
    {
      subject: "Base de Données",
      date: "17 Jan 2025",
      time: "14:00–16:00",
      rooms: ["Amphi 1"],
      students: 120,
    },
    {
      subject: "Réseaux & Protocoles",
      date: "20 Jan 2025",
      time: "09:00–11:00",
      rooms: ["A-101", "A-102"],
      students: 72,
    },
    {
      subject: "Mathématiques Disc.",
      date: "22 Jan 2025",
      time: "14:00–16:00",
      rooms: ["Amphi 2"],
      students: 95,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Affectations examens"
        subtitle="Gérez et publiez les affectations des salles d'examen."
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#40a02b] dark:bg-[#a6e3a1] text-white dark:text-[#11111b] hover:brightness-90 transition-all shadow-[0_2px_12px_rgba(64,160,43,0.25)] active:scale-[0.98]">
            <IcPlus />
            Nouveau examen
          </button>
        }
      />

      <div className="space-y-4">
        {exams.map((ex, i) => (
          <Card key={i}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#4c4f69] dark:text-[#cdd6f4] mb-2">
                  {ex.subject}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    <IcCalSm /> {ex.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    <IcClockSm /> {ex.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    <IcUsersSm /> {ex.students} étudiants
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {ex.rooms.map((r) => (
                    <Badge key={r} variant="blue">
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#ccd0da] dark:border-[#313244] text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244] transition-colors">
                  Modifier
                </button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1e66f5] dark:bg-[#89b4fa] text-white dark:text-[#11111b] hover:brightness-90 transition-all">
                  Publier
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
