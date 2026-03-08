export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-1.5">
      {children}
    </label>
  );
}
