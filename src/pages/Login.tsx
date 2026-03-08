import { useState } from "react";
import type { UserRole } from "@/types/type";

interface LoginPageProps {
  onLogin: (role: UserRole, name: string) => void;
}

const roles: { id: UserRole; label: string; desc: string; color: string; dot: string }[] = [
  {
    id: "student",
    label: "Étudiant",
    desc: "Examens, salles, documents",
    color: "border-[#1e66f5] bg-[#1e66f50d] dark:border-[#89b4fa] dark:bg-[#89b4fa0d]",
    dot: "bg-[#1e66f5] dark:bg-[#89b4fa]",
  },
  {
    id: "professor",
    label: "Professeur",
    desc: "Réservations, rattrapage",
    color: "border-[#8839ef] bg-[#8839ef0d] dark:border-[#cba6f7] dark:bg-[#cba6f70d]",
    dot: "bg-[#8839ef] dark:bg-[#cba6f7]",
  },
  {
    id: "admin",
    label: "Administrateur",
    desc: "Gestion complète du campus",
    color: "border-[#df8e1d] bg-[#df8e1d0d] dark:border-[#f9e2af] dark:bg-[#f9e2af0d]",
    dot: "bg-[#df8e1d] dark:bg-[#f9e2af]",
  },
  {
    id: "technician",
    label: "Technicien",
    desc: "Incidents techniques",
    color: "border-[#179299] bg-[#1792990d] dark:border-[#94e2d5] dark:bg-[#94e2d50d]",
    dot: "bg-[#179299] dark:bg-[#94e2d5]",
  },
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const demoNames: Record<UserRole, string> = {
    student: "Yassine Bencherki",
    professor: "Dr. Fatima Zahra Alami",
    admin: "Karim Idrissi",
    technician: "Hassan Tazi",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(selectedRole, demoNames[selectedRole]);
    }, 900);
  }

  return (
    <div className="min-h-screen flex bg-[#eff1f5] dark:bg-[#1e1e2e]">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#181825] overflow-hidden items-center justify-center">
        {/* Grid bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(203,166,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(203,166,247,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#cba6f7] opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#89b4fa] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-[#f38ba8] opacity-8 blur-2xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 text-center px-12">
          <div className="w-16 h-16 rounded-2xl bg-[#cba6f7] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(203,166,247,0.4)]">
            <span className="text-[#11111b] text-2xl font-black">E</span>
          </div>
          <h1 className="text-4xl font-black text-[#cdd6f4] leading-tight mb-3">
            EMSI
            <br />
            <span className="text-[#cba6f7]">Campus</span>
          </h1>
          <p className="text-[#6c7086] text-sm leading-relaxed max-w-xs mx-auto">
            Plateforme intelligente de gestion du campus — réservations, examens, incidents et
            documents en un seul endroit.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-col gap-3 text-left">
            {[
              { c: "text-[#89b4fa]", t: "Réservation de salles en temps réel" },
              { c: "text-[#a6e3a1]", t: "Consultation des affectations d'examen" },
              { c: "text-[#f9e2af]", t: "Signalement d'incidents techniques" },
              { c: "text-[#f38ba8]", t: "Demandes de documents administratifs" },
            ].map(({ c, t }) => (
              <div key={t} className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.replace("text-", "bg-")}`} />
                <span className={`text-sm font-medium ${c}`}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#8839ef] dark:bg-[#cba6f7] flex items-center justify-center mb-5 lg:hidden">
              <span className="text-white dark:text-[#11111b] font-black">E</span>
            </div>
            <h2 className="text-2xl font-black text-[#4c4f69] dark:text-[#cdd6f4]">Connexion</h2>
            <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] mt-1">
              Accédez à votre espace personnel EMSI
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-3">
              Votre rôle
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`
                    flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left
                    transition-all duration-150
                    ${
                      selectedRole === r.id
                        ? r.color
                        : "border-[#ccd0da] dark:border-[#313244] hover:border-[#9ca0b0] dark:hover:border-[#6c7086]"
                    }
                  `}
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${selectedRole === r.id ? r.dot : "bg-[#9ca0b0] dark:bg-[#6c7086]"}`}
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#4c4f69] dark:text-[#cdd6f4] leading-none">
                      {r.label}
                    </p>
                    <p className="text-[10px] text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">
                      {r.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@emsi.ma"
                className="
                  w-full px-3.5 py-2.5 rounded-xl text-sm
                  bg-[#e6e9ef] dark:bg-[#181825]
                  border border-[#ccd0da] dark:border-[#313244]
                  text-[#4c4f69] dark:text-[#cdd6f4]
                  placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086]
                  focus:outline-none focus:border-[#8839ef] dark:focus:border-[#cba6f7]
                  focus:ring-2 focus:ring-[#8839ef33] dark:focus:ring-[#cba6f733]
                  transition-all
                "
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full px-3.5 py-2.5 rounded-xl text-sm
                  bg-[#e6e9ef] dark:bg-[#181825]
                  border border-[#ccd0da] dark:border-[#313244]
                  text-[#4c4f69] dark:text-[#cdd6f4]
                  placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086]
                  focus:outline-none focus:border-[#8839ef] dark:focus:border-[#cba6f7]
                  focus:ring-2 focus:ring-[#8839ef33] dark:focus:ring-[#cba6f733]
                  transition-all
                "
              />
            </div>

            {error && (
              <p className="text-xs text-[#d20f39] dark:text-[#f38ba8] bg-[#d20f3910] dark:bg-[#f38ba810] px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-2.5 px-4 rounded-xl text-sm font-semibold
                bg-[#8839ef] hover:bg-[#7527d7] dark:bg-[#cba6f7] dark:hover:bg-[#b48ef0]
                text-white dark:text-[#11111b]
                shadow-[0_2px_12px_rgba(136,57,239,0.3)] hover:shadow-[0_4px_20px_rgba(136,57,239,0.45)]
                dark:shadow-[0_2px_12px_rgba(203,166,247,0.2)] dark:hover:shadow-[0_4px_20px_rgba(203,166,247,0.32)]
                transition-all duration-200 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion…
                </>
              ) : (
                "Se connecter"
              )}
            </button>

            <p className="text-xs text-center text-[#9ca0b0] dark:text-[#6c7086]">
              Mot de passe oublié ?{" "}
              <span className="text-[#8839ef] dark:text-[#cba6f7] cursor-pointer hover:underline font-medium">
                Réinitialiser
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
