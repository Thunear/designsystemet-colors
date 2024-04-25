"use client";

import classes from "./page.module.css";

import { Header } from "./components/Header/Header";
import { Scale } from "./components/Scale/Scale";
import { ColorPicker } from "./components/ColorPicker/ColorPicker";
import { useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";
import { PreviewBox } from "./components/PreviewBox/PreviewBox";
import { Container } from "react-bootstrap";

import cn from "classnames";

type modeType = "light" | "dark" | "contrast";

export default function Home() {
  const [accentColor, setAccentColor] = useState<CssColor>("#0062BA");
  const [themeMode, setThemeMode] = useState<modeType>("light");
  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Container>
          <div>
            <h1 className={classes.title}>Sett opp fargetema</h1>

            <div className={classes.toggles}>
              <button
                className={cn(classes.toggle, {
                  [classes.active]: themeMode === "light",
                })}
                onClick={() => setThemeMode("light")}
              >
                <img src="img/light-dot.svg" alt="" /> Lys
              </button>
              <button
                className={cn(classes.toggle, {
                  [classes.active]: themeMode === "dark",
                })}
                onClick={() => setThemeMode("dark")}
              >
                <img src="img/dark-dot.svg" alt="" /> Mørk
              </button>
              <button
                className={cn(classes.toggle, {
                  [classes.active]: themeMode === "contrast",
                })}
                onClick={() => setThemeMode("contrast")}
              >
                <img src="img/contrast-dot.svg" alt="" /> Kontrast
              </button>
            </div>

            <div className={classes.box}>
              <ColorPicker
                label="Accent farge"
                defaultColor="#0062BA"
                onColorChanged={(e) => {
                  setAccentColor(e);
                }}
              />
              <ColorPicker disabled label="Gråfarge" defaultColor="#1E2B3C" />
              <ColorPicker
                disabled
                label="Bakgrunnsfarge"
                defaultColor="#ffffff"
              />
            </div>
          </div>
          <Scale
            color={accentColor}
            showHeader
            showColorMeta={false}
            themeMode={themeMode}
          />
          <Scale color="#1E2B3C" showColorMeta={false} themeMode={themeMode} />
          <PreviewBox />
        </Container>
      </main>
    </div>
  );
}
