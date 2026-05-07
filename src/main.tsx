import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import "lenis/dist/lenis.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Index />
  </StrictMode>,
);
