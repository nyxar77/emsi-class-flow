import { Button } from "@/layout/Button";
import Navbar from "./components/ui/Navbar";

interface ErrorElementProps {
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
  onGoHome?: () => void;
}

const AlertIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

export function ErrorElement({
  title = "Oops! Something went wrong.",
  message = "We encountered an unexpected error while trying to process your request.",
  error,
  onRetry,
  onGoHome,
}: ErrorElementProps) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#d20f39]/10 text-[#d20f39] dark:bg-[#f38ba8]/10 dark:text-[#f38ba8]">
          {AlertIcon}
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#4c4f69] dark:text-[#cdd6f4]">
          {title}
        </h2>
        <p className="max-w-md mb-6 text-sm text-[#5c5f77] dark:text-[#a6adc8]">{message}</p>

        {error && (
          <div className="w-full max-w-lg p-4 mb-8 overflow-auto text-left rounded-xl bg-[#e6e9ef] border border-[#ccd0da] dark:bg-[#11111b] dark:border-[#313244]">
            <p className="mb-2 text-xs font-semibold text-[#5c5f77] dark:text-[#a6adc8] uppercase tracking-wider">
              Error Details
            </p>
            <code className="text-sm font-mono text-[#d20f39] dark:text-[#f38ba8] break-words">
              {error.message || error.toString()}
            </code>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              Try Again
            </Button>
          )}
          {onGoHome && (
            <Button variant="primary" onClick={onGoHome}>
              Go to Homepage
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ErrorElement;
