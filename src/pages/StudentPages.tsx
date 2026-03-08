import { useState } from "react";
import { Badge, Card, EmptyState, SectionHeader, StatCard } from "@/layout/Shared";

// ── STUDENT DASHBOARD ────────────────────────────────────────────────────────
export function StudentDashboard() {
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

      {/* Stats */}
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

      {/* Upcoming exams */}
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

      {/* Recent reservations */}
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

// ── STUDENT EXAM LOOKUP ──────────────────────────────────────────────────────
export function StudentExams() {
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

// ── ROOM BOOKING FORM ────────────────────────────────────────────────────────
export function RoomBooking({ role = "student" }: { role?: string }) {
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

// ── INCIDENT REPORT ───────────────────────────────────────────────────────────
export function IncidentReport() {
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

      {/* History */}
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

// ── DOCUMENT REQUESTS ─────────────────────────────────────────────────────────
export function DocumentRequests() {
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

      {/* Existing requests */}
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

// ── Shared helpers ────────────────────────────────────────────────────────────
function ReservationRow({
  room,
  purpose,
  date,
  time,
  status,
}: {
  room: string;
  purpose: string;
  date: string;
  time: string;
  status: "approved" | "pending" | "rejected";
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]">
      <div>
        <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">{room}</p>
        <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
          {purpose} · {date} {time}
        </p>
      </div>
      <Badge variant={status === "approved" ? "green" : status === "pending" ? "yellow" : "red"}>
        {status === "approved" ? "Validée" : status === "pending" ? "En attente" : "Refusée"}
      </Badge>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-1.5">
      {children}
    </label>
  );
}

function TextInput({
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244] text-[#4c4f69] dark:text-[#cdd6f4] placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086] focus:outline-none focus:border-[#8839ef] dark:focus:border-[#cba6f7] focus:ring-2 focus:ring-[#8839ef33] dark:focus:ring-[#cba6f733] transition-all"
    />
  );
}

function InfoRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  const colors: Record<string, string> = {
    blue: "text-[#1e66f5] dark:text-[#89b4fa] bg-[#1e66f51a] dark:bg-[#89b4fa1a]",
    mauve: "text-[#8839ef] dark:text-[#cba6f7] bg-[#8839ef1a] dark:bg-[#cba6f71a]",
    teal: "text-[#179299] dark:text-[#94e2d5] bg-[#1792991a] dark:bg-[#94e2d51a]",
    yellow: "text-[#df8e1d] dark:text-[#f9e2af] bg-[#df8e1d1a] dark:bg-[#f9e2af1a]",
  };
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${colors[accent] ?? colors.blue}`}
      >
        <span className="w-3.5 h-3.5">{icon}</span>
      </span>
      <span className="text-xs text-[#9ca0b0] dark:text-[#6c7086] w-24 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">{value}</span>
    </div>
  );
}

// ── Mini icons ────────────────────────────────────────────────────────────────
function IcBook({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IcDoor() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M3 20V6a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function IcDoc() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  );
}
function IcAlert() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IcFloor() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <polyline points="3,9 12,2 21,9" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}
function IcTable() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </svg>
  );
}
function IcClock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-full h-full"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
function IcCheck({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}
