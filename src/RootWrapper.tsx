import type { ReactNode } from "react";

interface RootWrapperProps {
  children: ReactNode;
}

export default function RootWrapper({ children }: RootWrapperProps) {
  return (
    <div
      className="
        min-h-screen
        bg-[#f3f3f7] dark:bg-[#1b1b26]
        text-[#4c4f69] dark:text-[#cdd6f4]
        transition-colors duration-200 ease-out
      "
    >
      {children}
    </div>
  );
}
