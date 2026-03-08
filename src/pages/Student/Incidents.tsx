import { useState } from "react";
import { Input as TextInput } from "@/components/layout/Input";
import { Label } from "@/components/layout/Label";
import { Badge, SectionHeader } from "@/components/layout/Shared";
import { IcCheck } from "../Icons";

export function Incidents() {
  const [form, setForm] = useState({ room: "", type: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const incidentTypes = [
    "Projecteur / vidéoprojecteur",
    "Tableau interactif",
    "Climatisation / chauffage",
    "Éclairage",
    "Réseau / WiFi",
    "Mobilier endommagé",
    "Autre",
  ];

  const history = [
    {
      id: "#INC-042",
      room: "B-204",
      type: "Projecteur",
      date: "10 Jan",
      status: "resolved" as const,
    },
    { id: "#INC-039", room: "A-101", type: "WiFi", date: "8 Jan", status: "in_progress" as const },
  ];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#df8e1d1a] dark:bg-[#f9e2af1a] flex items-center justify-center">
          <IcCheck size={32} className="text-[#df8e1d] dark:text-[#f9e2af]" />
        </div>
        <h2 className="text-xl font-bold text-[#4c4f69] dark:text-[#cdd6f4]">Incident signalé !</h2>
        <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] max-w-sm">
          Le technicien a été notifié automatiquement et interviendra rapidement.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold bg-[#df8e1d] dark:bg-[#f9e2af] text-white dark:text-[#11111b] hover:opacity-90 transition-opacity"
        >
          Signaler un autre incident
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <SectionHeader
        title="Signaler un incident technique"
        subtitle="Le technicien recevra une notification immédiate."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-5"
      >
        <div>
          <Label>Salle concernée</Label>
          <TextInput
            placeholder="Ex: B-204, Amphi 1, A-101…"
            value={form.room}
            onChange={(v) => setForm({ ...form, room: v })}
          />
        </div>

        <div>
          <Label>Type de problème</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {incidentTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className={`
                  px-3 py-2 rounded-xl text-sm text-left border-2 font-medium transition-all
                  ${
                    form.type === t
                      ? "border-[#df8e1d] bg-[#df8e1d0d] text-[#df8e1d] dark:border-[#f9e2af] dark:bg-[#f9e2af0d] dark:text-[#f9e2af]"
                      : "border-[#ccd0da] dark:border-[#313244] text-[#5c5f77] dark:text-[#a6adc8] hover:border-[#9ca0b0] dark:hover:border-[#6c7086]"
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Description du problème</Label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Décrivez le problème en détail pour faciliter l'intervention du technicien…"
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244] text-[#4c4f69] dark:text-[#cdd6f4] placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086] focus:outline-none focus:border-[#df8e1d] dark:focus:border-[#f9e2af] focus:ring-2 focus:ring-[#df8e1d33] dark:focus:ring-[#f9e2af33] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#df8e1d] dark:bg-[#f9e2af] text-white dark:text-[#11111b] hover:brightness-90 transition-all shadow-[0_2px_12px_rgba(223,142,29,0.3)] active:scale-[0.98]"
        >
          Soumettre le signalement
        </button>
      </form>

      <div>
        <SectionHeader title="Historique de vos signalements" />
        <div className="space-y-2">
          {history.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#9ca0b0] dark:text-[#6c7086]">{h.id}</span>
                <div>
                  <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                    {h.type}
                  </p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
                    {h.room} · {h.date}
                  </p>
                </div>
              </div>
              <Badge variant={h.status === "resolved" ? "green" : "yellow"}>
                {h.status === "resolved" ? "Résolu" : "En cours"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
