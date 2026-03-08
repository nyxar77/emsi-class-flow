import { useState } from "react";
import { Label } from "@/components/layout/Label";
import { Badge, SectionHeader } from "@/components/layout/Shared";
import { IcCheck } from "../Icons";

export function Documents() {
  const [form, setForm] = useState({ type: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  const docTypes = [
    "Attestation de scolarité",
    "Relevé de notes",
    "Attestation de réussite",
    "Certificat d'inscription",
    "Attestation de stage",
    "Autre document",
  ];

  const existing = [
    {
      id: "#DOC-017",
      type: "Attestation de scolarité",
      date: "5 Jan 2025",
      status: "ready" as const,
    },
    {
      id: "#DOC-014",
      type: "Relevé de notes S5",
      date: "28 Dec 2024",
      status: "delivered" as const,
    },
    {
      id: "#DOC-011",
      type: "Certificat d'inscription",
      date: "10 Dec 2024",
      status: "delivered" as const,
    },
  ];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#40a02b1a] dark:bg-[#a6e3a11a] flex items-center justify-center">
          <IcCheck size={32} className="text-[#40a02b] dark:text-[#a6e3a1]" />
        </div>
        <h2 className="text-xl font-bold text-[#4c4f69] dark:text-[#cdd6f4]">Demande envoyée !</h2>
        <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] max-w-sm">
          Votre demande est transmise à l'administration. Vous recevrez un email quand votre
          document sera prêt.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold bg-[#40a02b] dark:bg-[#a6e3a1] text-white dark:text-[#11111b] hover:opacity-90 transition-opacity"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <SectionHeader
        title="Demande de documents administratifs"
        subtitle="Soumettez votre demande et téléchargez vos documents une fois prêts."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-5"
      >
        <div>
          <Label>Type de document</Label>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {docTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className={`
                  px-3.5 py-2.5 rounded-xl text-sm text-left border-2 font-medium transition-all
                  ${
                    form.type === t
                      ? "border-[#40a02b] bg-[#40a02b0d] text-[#40a02b] dark:border-[#a6e3a1] dark:bg-[#a6e3a10d] dark:text-[#a6e3a1]"
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
          <Label>Note (optionnel)</Label>
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Ex: pour ambassade, pour stage, préciser le semestre…"
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244] text-[#4c4f69] dark:text-[#cdd6f4] placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086] focus:outline-none focus:border-[#40a02b] dark:focus:border-[#a6e3a1] focus:ring-2 focus:ring-[#40a02b33] dark:focus:ring-[#a6e3a133] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!form.type}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#40a02b] dark:bg-[#a6e3a1] text-white dark:text-[#11111b] hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_2px_12px_rgba(64,160,43,0.3)] active:scale-[0.98]"
        >
          Soumettre la demande
        </button>
      </form>

      <div>
        <SectionHeader title="Mes demandes" />
        <div className="space-y-2">
          {existing.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#9ca0b0] dark:text-[#6c7086]">{d.id}</span>
                <div>
                  <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">
                    {d.type}
                  </p>
                  <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">{d.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    d.status === "ready" ? "green" : d.status === "delivered" ? "teal" : "yellow"
                  }
                >
                  {d.status === "ready"
                    ? "Prêt"
                    : d.status === "delivered"
                      ? "Récupéré"
                      : "En traitement"}
                </Badge>
                {d.status === "ready" && (
                  <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#40a02b1a] text-[#40a02b] dark:bg-[#a6e3a11a] dark:text-[#a6e3a1] hover:bg-[#40a02b22] dark:hover:bg-[#a6e3a122] transition-colors border border-[#40a02b33] dark:border-[#a6e3a133]">
                    Télécharger
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
