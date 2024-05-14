"use client";

import classes from "./page.module.css";
import { Container } from "react-bootstrap";
import { generateColorScale } from "@/utils/themeUtils";
import { useEffect, useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";

export default function Dev() {
  const [lightColors, setLightColors] = useState<CssColor[]>([]);
  const [darkColors, setDarkColors] = useState<CssColor[]>([]);
  const [contrastColors, setContrastColors] = useState<CssColor[]>([]);
  useEffect(() => {
    const lightScale = generateColorScale("#0062BA", "light", "flat");
    const darkScale = generateColorScale("#0062BA", "dark", "flat");
    const contrastScale = generateColorScale("#0062BA", "contrast", "flat");
    setLightColors(lightScale as CssColor[]);
    setDarkColors(darkScale as CssColor[]);
    setContrastColors(contrastScale as CssColor[]);
  }, []);
  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div
            className={classes.column}
            style={{ backgroundColor: lightColors[0] }}
          >
            <h2>Background default</h2>
            <div
              className={classes.box}
              style={{ backgroundColor: lightColors[5] }}
            >
              Border default
            </div>
            <div
              className={classes.box}
              style={{ backgroundColor: lightColors[6] }}
            >
              Border hover
            </div>
            <div
              className={classes.box}
              style={{ backgroundColor: lightColors[7] }}
            >
              Border hover
            </div>
            <div
              className={classes.box}
              style={{ backgroundColor: lightColors[11] }}
            >
              Border hover
            </div>
            <div
              className={classes.box}
              style={{ backgroundColor: lightColors[12] }}
            >
              Border hover
            </div>
          </div>
          <div
            className={classes.column}
            style={{ backgroundColor: lightColors[1] }}
          >
            <h2>Background subtle</h2>
          </div>
          <div
            className={classes.column}
            style={{ backgroundColor: lightColors[2] }}
          >
            d
          </div>
          <div
            className={classes.column}
            style={{ backgroundColor: lightColors[3] }}
          >
            d
          </div>
          <div
            className={classes.column}
            style={{ backgroundColor: lightColors[4] }}
          >
            d
          </div>
        </div>
      </div>
    </div>
  );
}
