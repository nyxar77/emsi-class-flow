import { useState } from "react";
import { Badge, Modal, SectionHeader, SmInput, SmLabel } from "@/components/layout/Shared";
import { IcAlertCircle, IcPlus } from "../Icons";

export function Schedule() {
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    type: "rattrapage",
    date: "",
    start: "",
    end: "",
    room: "",
    class: "",
  });

  const sessions = [
    {
      id: "s1",
      time: "08:00–10:00",
      subject: "Algorithmique Avancée",
      room: "B-204",
      class: "5IIR-A",
      date: "Lun 13 Jan",
      type: "Cours",
    },
    {
      id: "s2",
      time: "10:30–12:30",
      subject: "Base de Données",
      room: "TP-3",
      class: "5IIR-B",
      date: "Mar 14 Jan",
      type: "TP",
    },
    {
      id: "s3",
      time: "14:00–16:00",
      subject: "Algorithmique Avancée",
      room: "B-204",
      class: "5IIR-B",
      date: "Mar 14 Jan",
      type: "Cours",
    },
    {
      id: "s4",
      time: "09:00–11:00",
      subject: "Algorithmique Avancée",
      room: "B-204",
      class: "5IIR-A",
      date: "Mer 15 Jan",
      type: "Rattrapage",
    },
  ];

  const [cancelled, setCancelled] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Emploi du temps & Séances"
        subtitle="Gérez vos cours, rattrapages et annulations."
        action={
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#8839ef] dark:bg-[#cba6f7] text-white dark:text-[#11111b] hover:brightness-90 transition-all shadow-[0_2px_12px_rgba(136,57,239,0.25)] active:scale-[0.98]"
          >
            <span className="w-4 h-4">
              <IcPlus />
            </span>
            Ajouter séance
          </button>
        }
      />

      <div className="space-y-2">
        {sessions
          .filter((s) => !cancelled.includes(s.id))
          .map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244]"
            >
              <div className="flex items-center gap-4">
                <div className="text-right w-28 shrink-0">
                  <p className="text-xs font-bold text-[#4c4f69] dark:text-[#cdd6f4]">{s.date}</p>
                  <p className="text-[11px] text-[#9ca0b0] dark:text-[#6c7086]">{s.time}</p>
                </div>
                <div className="w-px h-10 bg-[#ccd0da] dark:bg-[#313244]" />
                <div>
                  <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                    {s.subject}
                  </p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    {s.class} · {s.room}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant={s.type === "Rattrapage" ? "peach" : s.type === "TP" ? "teal" : "mauve"}
                >
                  {s.type}
                </Badge>
                <button
                  onClick={() => setShowCancelModal(s.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#d20f39] dark:text-[#f38ba8] bg-[#d20f391a] dark:bg-[#f38ba81a] hover:bg-[#d20f3922] dark:hover:bg-[#f38ba822] border border-[#d20f3933] dark:border-[#f38ba833] transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Cancel confirm modal */}
      {showCancelModal && (
        <Modal onClose={() => setShowCancelModal(null)}>
          <div className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#d20f391a] dark:bg-[#f38ba81a] flex items-center justify-center mx-auto">
              <IcAlertCircle className="text-[#d20f39] dark:text-[#f38ba8]" />
            </div>
            <h3 className="text-base font-bold text-[#4c4f69] dark:text-[#cdd6f4]">
              Confirmer l'annulation
            </h3>
            <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086]">
              La séance sera annulée et la salle libérée automatiquement. Les étudiants seront
              notifiés.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowCancelModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#ccd0da] dark:border-[#313244] text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setCancelled([...cancelled, showCancelModal!]);
                  setShowCancelModal(null);
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#d20f39] dark:bg-[#f38ba8] text-white dark:text-[#11111b] hover:brightness-90 transition-all"
              >
                Confirmer
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add session modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-[#4c4f69] dark:text-[#cdd6f4]">
              Ajouter une séance
            </h3>
            <div>
              <SmLabel>Type</SmLabel>
              <div className="flex gap-2 mt-1">
                {["rattrapage", "cours_sup"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAddForm({ ...addForm, type: t })}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${addForm.type === t ? "border-[#8839ef] bg-[#8839ef0d] text-[#8839ef] dark:border-[#cba6f7] dark:bg-[#cba6f70d] dark:text-[#cba6f7]" : "border-[#ccd0da] dark:border-[#313244] text-[#5c5f77] dark:text-[#a6adc8]"}`}
                  >
                    {t === "rattrapage" ? "Rattrapage" : "Cours supplémentaire"}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <SmLabel>Date</SmLabel>
                <SmInput
                  type="date"
                  value={addForm.date}
                  onChange={(v) => setAddForm({ ...addForm, date: v })}
                />
              </div>
              <div>
                <SmLabel>Salle</SmLabel>
                <SmInput
                  placeholder="Ex: B-204"
                  value={addForm.room}
                  onChange={(v) => setAddForm({ ...addForm, room: v })}
                />
              </div>
              <div>
                <SmLabel>Début</SmLabel>
                <SmInput
                  type="time"
                  value={addForm.start}
                  onChange={(v) => setAddForm({ ...addForm, start: v })}
                />
              </div>
              <div>
                <SmLabel>Fin</SmLabel>
                <SmInput
                  type="time"
                  value={addForm.end}
                  onChange={(v) => setAddForm({ ...addForm, end: v })}
                />
              </div>
            </div>
            <div>
              <SmLabel>Classe</SmLabel>
              <SmInput
                placeholder="Ex: 5IIR-A"
                value={addForm.class}
                onChange={(v) => setAddForm({ ...addForm, class: v })}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold border border-[#ccd0da] dark:border-[#313244] text-[#5c5f77] dark:text-[#a6adc8] hover:bg-[#ccd0da] dark:hover:bg-[#313244] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold bg-[#8839ef] dark:bg-[#cba6f7] text-white dark:text-[#11111b] hover:brightness-90 transition-all"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
