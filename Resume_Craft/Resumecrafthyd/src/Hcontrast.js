import React from "react";
import { useHighContrast } from "./contexts/HighContrastContext";

export default function Hcontrast() {
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  return (
    <div className="contrast-toggle">
      <button 
        onClick={toggleHighContrast}
        aria-pressed={isHighContrast}
        style={{
          padding: "8px 12px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ccc",
          background: isHighContrast ? "#000" : "#fff",
          color: isHighContrast ? "#fff" : "#000",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        {isHighContrast ? "Switch to Normal Mode" : "Switch to High Contrast Mode"}
      </button>
    </div>
  );
}
