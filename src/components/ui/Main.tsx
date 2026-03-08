import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export function Main({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen font-sans antialiased text-[#4c4f69] bg-[#eff1f5] dark:text-[#cdd6f4] dark:bg-[#1e1e2e] transition-colors duration-200 ease-out">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default Main;
