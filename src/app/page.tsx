"use client";

import classes from "./page.module.css";
import { Preview } from "./components/Preview/Preview";
import { Header } from "./components/Header/Header";
import { Scale } from "./components/Scale/Scale";
import { ColorPicker } from "./components/ColorPicker/ColorPicker";
import { useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";
import { PreviewBox } from "./components/PreviewBox/PreviewBox";
import { Container } from "react-bootstrap";

export default function Home() {
  const [accentColor, setAccentColor] = useState<CssColor>("#F45F63");
  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Container>
          <div>
            <h1 className={classes.title}>Velg farger</h1>
            <div className={classes.box}>
              <ColorPicker
                label="Accent farge"
                defaultColor="#F45F63"
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
          <Scale color={accentColor} showHeader showColorMeta={false} />
          <PreviewBox />
        </Container>
      </main>
    </div>
  );
}
