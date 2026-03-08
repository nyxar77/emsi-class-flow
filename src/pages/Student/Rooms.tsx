import { useState } from "react";
import { Input as TextInput } from "@/components/layout/Input";
import { Label } from "@/components/layout/Label";
import { Badge, SectionHeader } from "@/components/layout/Shared";
import { IcCheck } from "../Icons";

export function Rooms({ role = "student" }: { role?: string }) {
  const [form, setForm] = useState({
    room: "",
    date: "",
    start: "",
    end: "",
    purpose: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const rooms = [
    { id: "b204", label: "Salle B-204", cap: 30, type: "Cours", floor: "2ème" },
    { id: "a105", label: "Salle A-105", cap: 25, type: "TP", floor: "1er" },
    { id: "c302", label: "Salle C-302", cap: 20, type: "Cours", floor: "3ème" },
    { id: "amphi1", label: "Amphi 1", cap: 120, type: "Amphi", floor: "RDC" },
    { id: "reunion1", label: "Salle Réunion R1", cap: 15, type: "Réunion", floor: "1er" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#40a02b1a] dark:bg-[#a6e3a11a] flex items-center justify-center">
          <IcCheck size={32} className="text-[#40a02b] dark:text-[#a6e3a1]" />
        </div>
        <h2 className="text-xl font-bold text-[#4c4f69] dark:text-[#cdd6f4]">Demande envoyée !</h2>
        <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] max-w-sm">
          Votre demande de réservation a été transmise à l'administration. Vous serez notifié par
          email une fois validée.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold bg-[#8839ef] dark:bg-[#cba6f7] text-white dark:text-[#11111b] hover:opacity-90 transition-opacity"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <SectionHeader
        title="Réserver une salle"
        subtitle="Choisissez une salle disponible et soumettez votre demande."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Room picker */}
        <div>
          <Label>Salle</Label>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {rooms.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setForm({ ...form, room: r.id })}
                className={`
                  flex items-center justify-between px-3.5 py-3 rounded-xl border-2 text-left transition-all
                  ${
                    form.room === r.id
                      ? "border-[#8839ef] bg-[#8839ef0d] dark:border-[#cba6f7] dark:bg-[#cba6f70d]"
                      : "border-[#ccd0da] dark:border-[#313244] hover:border-[#9ca0b0] dark:hover:border-[#6c7086]"
                  }
                `}
              >
                <div>
                  <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                    {r.label}
                  </p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    {r.floor} · Cap. {r.cap}
                  </p>
                </div>
                <Badge
                  variant={
                    r.type === "Amphi"
                      ? "mauve"
                      : r.type === "TP"
                        ? "teal"
                        : r.type === "Réunion"
                          ? "yellow"
                          : "blue"
                  }
                >
                  {r.type}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            <Label>Date</Label>
            <TextInput
              type="date"
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
            />
          </div>
          <div>
            <Label>Heure début</Label>
            <TextInput
              type="time"
              value={form.start}
              onChange={(v) => setForm({ ...form, start: v })}
            />
          </div>
          <div>
            <Label>Heure fin</Label>
            <TextInput
              type="time"
              value={form.end}
              onChange={(v) => setForm({ ...form, end: v })}
            />
          </div>
        </div>

        <div>
          <Label>Objet de la réservation</Label>
          <TextInput
            placeholder="Ex: Révision groupe, Projet IA, Workshop…"
            value={form.purpose}
            onChange={(v) => setForm({ ...form, purpose: v })}
          />
        </div>

        <div>
          <Label>Note (optionnel)</Label>
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Informations supplémentaires pour l'administrateur…"
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244] text-[#4c4f69] dark:text-[#cdd6f4] placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086] focus:outline-none focus:border-[#8839ef] dark:focus:border-[#cba6f7] focus:ring-2 focus:ring-[#8839ef33] dark:focus:ring-[#cba6f733] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#8839ef] dark:bg-[#cba6f7] text-white dark:text-[#11111b] hover:brightness-90 transition-all shadow-[0_2px_12px_rgba(136,57,239,0.3)] active:scale-[0.98]"
        >
          Soumettre la demande
        </button>
      </form>
    </div>
  );
}
