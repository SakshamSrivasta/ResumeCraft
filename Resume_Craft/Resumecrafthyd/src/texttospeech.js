import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function TextToSpeech({ text }) {
  const { Text, speechStatus, isInQueue, start, pause, stop } = useSpeech({
    text: text || "No text provided",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
      <Text style={{ position: "absolute", left: "-9999px" }} />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? (
          <button 
            onClick={start}
            aria-label="Read text aloud"
            style={{ 
              padding: "5px 10px", 
              background: "#4285f4", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer" 
            }}
          >
            🔊 Read Aloud
          </button>
        ) : (
          <button 
            onClick={pause}
            aria-label="Pause reading"
            style={{ 
              padding: "5px 10px", 
              background: "#fbbc05", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer" 
            }}
          >
            ⏸️ Pause
          </button>
        )}
        {(speechStatus === "paused" || speechStatus === "started") && (
          <button 
            onClick={stop}
            aria-label="Stop reading"
            style={{ 
              padding: "5px 10px", 
              background: "#ea4335", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer" 
            }}
          >
            ⏹️ Stop
          </button>
        )}
      </div>
    </div>
  );
}
