import type React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  shadow?: boolean;
  rounded?: boolean;
};

export const Card: React.FC<CardProps> = ({
  shadow = true,
  rounded = true,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`${shadow ? "shadow-lg" : ""} ${rounded ? "rounded-lg" : ""} bg-white p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
