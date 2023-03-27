import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./components/Home";

function App() {
  return < Home />;
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
