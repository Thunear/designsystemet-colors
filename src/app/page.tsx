/* eslint-disable @next/next/no-img-element */
"use client";

import classes from "./page.module.css";

import { Header } from "./components/Header/Header";
import { Scale } from "./components/Scale/Scale";
import { ColorPicker } from "./components/ColorPicker/ColorPicker";
import { useEffect, useState } from "react";
import { CssColor } from "@adobe/leonardo-contrast-colors";
import { PreviewBox } from "./components/PreviewBox/PreviewBox";
import { Container, Row, Col } from "react-bootstrap";
import { tokenMapping } from "@/utils/tokenMapping";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Dashboard } from "./components/Previews/Dashboard/Dashboard";

import cn from "classnames";
import { Button, DropdownMenu } from "@digdir/designsystemet-react";
import { Landing } from "./components/Previews/Landing/Landing";

type modeType = "light" | "dark" | "contrast";
type previewModeType = "dashboard" | "landing" | "forms" | "auth";

const setToken = (token: string, color: string) => {
  const previewElement = document.getElementById("preview");
  if (previewElement) {
    previewElement.style.setProperty(token, color);
  }
};

const setTokenForClass = (token: string, color: string, className: string) => {
  const previewElements = document.getElementsByClassName(className);
  if (previewElements) {
    for (let i = 0; i < previewElements.length; i++) {
      const previewElement = previewElements[i] as HTMLElement;
      previewElement.style.setProperty(token, color);
    }
  }
};

const mapTokens = () => {
  // Background subtle
  setToken("--fds-semantic-background-subtle", "var(--grey1)");

  // Background default
  setToken("--fds-semantic-background-default", "var(--grey2)");

  // Component normal
  setToken("--fds-semantic-surface-action-first-subtle", "var(--accent3)");
  setToken("--fds-semantic-surface-action-first-no_fill", "var(--accent3)");

  // Component hover
  setToken("--fds-semantic-surface-info-subtle-hover", "var(--accent4)");
  setToken(
    "--fds-semantic-surface-action-first-subtle-hover",
    "var(--accent4)"
  );
  setToken(
    "--fds-semantic-surface-action-first-no_fill-hover",
    "var(--accent4)"
  );

  // Component active
  setToken(
    "--fds-semantic-surface-action-first-subtle-active",
    "var(--accent5)"
  );

  // Border subtle
  setToken("--fds-semantic-border-neutral-subtle", "var(--accent6)");
  setToken("--fds-semantic-border-action-first-subtle", "var(--accent6)");

  // Border default
  setToken("--fds-semantic-border-action-first-subtle-hover", "var(--accent7)");

  // Border strong
  setToken("--fds-semantic-border-neutral-default", "var(--accent8)");
  setToken("--input-placeholder", "--grey8");
  setToken("--fds-semantic-surface-neutral-dark", "var(--grey8)");
  setToken("--fds-semantic-border-input-default", "var(--grey8)");

  // Solid normal
  setToken("--fds-semantic-border-input-hover", "var(--accent9)");
  setToken("--fds-semantic-border-action-default", "var(--accent9)");
  setToken("--fds-semantic-surface-success-default", "var(--accent9)");
  setToken("--fds-semantic-surface-action-first-default", "var(--accent9)");
  setToken("--fds-semantic-border-action-first-default", "var(--accent9)");

  // Solid hover
  setToken("--fds-semantic-surface-success-hover", "var(--accent10)");
  setToken("--fds-semantic-surface-action-first-hover", "var(--accent10)");

  // Solid active
  setToken("--fds-semantic-surface-action-first-active", "var(--accent11)");

  // Text subtle
  setToken("--fds-semantic-text-neutral-subtle", "var(--grey12)");
  setToken("--fds-semantic-text-action-hover", "var(--accent12)");
  setToken("--fds-semantic-text-action-first-hover", "var(--accent12)");
  setToken("--fds-semantic-text-action-first-default", "var(--accent12)");

  // Text default
  setToken("-fds-semantic-text-action-default", "var(--accent13)");
  setToken("--fds-semantic-text-neutral-default", "var(--grey13)");

  // Custom
  setToken("--background", "var(--grey1)");
};

export default function Home() {
  const [accentColor, setAccentColor] = useState<CssColor>("#0062BA");
  const [greyColor, setGreyColor] = useState<CssColor>("#1E2B3C");
  const [brandOneColor, setBrandOneColor] = useState<CssColor>("#F45F63");
  const [brandTwoColor, setBrandTwoColor] = useState<CssColor>("#E5AA20");
  const [brandThreeColor, setBrandThreeColor] = useState<CssColor>("#1E98F5");
  const [themeMode, setThemeMode] = useState<modeType>("light");
  const [previewMode, setPreviewMode] = useState<previewModeType>("dashboard");

  useEffect(() => {
    mapTokens();
  }, []);

  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Container>
          <div>
            <h1 className={classes.title}>Sett opp fargetema</h1>
          </div>
          <div className={classes.rows}>
            <div className={classes.row}>
              <ColorPicker
                label="Accent farge"
                defaultColor="#0062BA"
                onColorChanged={(e: any) => {
                  setAccentColor(e);
                }}
              />
              <Scale
                color={accentColor}
                showHeader
                showColorMeta={false}
                themeMode={themeMode}
                type="accent"
              />
            </div>
            <div className={classes.row}>
              <ColorPicker
                label="Gråfarge"
                defaultColor="#1E2B3C"
                onColorChanged={(e: any) => {
                  setGreyColor(e);
                }}
              />
              <Scale
                color={greyColor}
                showColorMeta={false}
                themeMode={themeMode}
                type="grey"
              />
            </div>

            <div className={classes.row}>
              <ColorPicker
                label="Brandfarge 1"
                defaultColor="#F45F63"
                onColorChanged={(e: any) => {
                  setBrandOneColor(e);
                }}
              />
              <Scale
                color={brandOneColor}
                showColorMeta={false}
                themeMode={themeMode}
                type="brandOne"
              />
            </div>
            <div className={classes.row}>
              <ColorPicker
                label="Brandfarge 2"
                defaultColor="#E5AA20"
                onColorChanged={(e: any) => {
                  setBrandTwoColor(e);
                }}
              />
              <Scale
                color={brandTwoColor}
                showColorMeta={false}
                themeMode={themeMode}
                type="brandTwo"
              />
            </div>

            <div className={classes.row}>
              <ColorPicker
                label="Brandfarge 3"
                defaultColor="#1E98F5"
                onColorChanged={(e: any) => {
                  setBrandThreeColor(e);
                }}
              />
              <Scale
                color={brandThreeColor}
                showColorMeta={false}
                themeMode={themeMode}
                type="brandThree"
              />
            </div>
          </div>

          <div className={classes.toolbar}>
            <div className={classes.menu}>
              <div
                className={cn(classes.menuItem, {
                  [classes.menuItemActive]: previewMode === "dashboard",
                })}
                onClick={() => setPreviewMode("dashboard")}
              >
                Dashboard
              </div>
              <div
                className={cn(classes.menuItem, {
                  [classes.menuItemActive]: previewMode === "landing",
                })}
                onClick={() => setPreviewMode("landing")}
              >
                Landingsside
              </div>
              <div
                className={cn(
                  classes.menuItem,
                  {
                    [classes.menuItemActive]: previewMode === "forms",
                  },
                  classes.menuItemDisabled
                )}
              >
                Skjemaer
              </div>
              <div
                className={cn(
                  classes.menuItem,
                  {
                    [classes.menuItemActive]: previewMode === "auth",
                  },
                  classes.menuItemDisabled
                )}
              >
                Autentisering
              </div>
            </div>
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
          </div>

          <div className={cn(classes.preview, classes[themeMode])} id="preview">
            {previewMode === "dashboard" && <Dashboard />}
            {previewMode === "landing" && <Landing />}
          </div>
          {/* <PreviewBox /> */}
        </Container>
      </main>
    </div>
  );
}
