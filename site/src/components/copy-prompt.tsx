"use client";

import { useState } from "react";

/** A prompt to paste into a coding agent, with a button that copies it. */
export function CopyPrompt({ prompt, copy, copied }: { prompt: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="prompt">
      <pre className="prompt-text">{prompt}</pre>
      <button
        type="button"
        className="prompt-copy"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(prompt);
            setDone(true);
            setTimeout(() => setDone(false), 2000);
          } catch {
            // Clipboard refused: the text stays selectable in the block.
          }
        }}
      >
        {done ? copied : copy}
      </button>
      <span className="sr-only" aria-live="polite">
        {done ? copied : ""}
      </span>
    </div>
  );
}
