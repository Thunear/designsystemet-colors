"use client";

import classes from "./page.module.css";
import { Preview } from "./components/Preview/Preview";

import { ScaleRow } from "./components/ScaleRow/ScaleRow";

export default function Home() {
  return (
    <main className={classes.main}>
      <ScaleRow name="Accent" color="#0062BA" showHeader />
      <ScaleRow name="Success" color="#2BA63C" />
      <ScaleRow name="Warning" color="#ECC238" />
      <ScaleRow name="Danger" color="#B32728" />
      <ScaleRow name="Grey" color="#1E2B3C" />
      <ScaleRow name="Brand 1" color="#F45F63" />
      <ScaleRow name="Brand 2" color="#E5AA20" />
      <ScaleRow name="Brand 3" color="#1E98F5" />
      <ScaleRow name="Mattilsynet" color="#054449" />
      <ScaleRow name="Brreg" color="#133349" />
      <ScaleRow name="Arbeidstilsynet" color="#086057" />

      {/* <Preview colors={colors} /> */}
    </main>
  );
}
