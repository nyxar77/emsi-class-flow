/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import RootWrapper from "./RootWrapper.tsx";

const elem: Container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <RootWrapper>
      <App />
    </RootWrapper>
  </StrictMode>
);

if (import.meta.hot) {
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  createRoot(elem).render(app);
}
